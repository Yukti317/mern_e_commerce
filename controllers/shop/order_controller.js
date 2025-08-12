// const { client, paypal } = require("../../helpers/paypal");
const Razorpay = require("razorpay");
const Order = require("../../models/order");
const Product = require("../../models/product");
const Cart = require("../../models/cart");

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_4mfoL6s5ULbkq2",
  key_secret: "TcalYZEXV7nCQ2Mqor3ynGCy",
});


const CreateOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Razorpay amount must be in paise
    const amountInPaise = Math.round(totalAmount * 100);

    const receiptId = `receipt_order_${Date.now()}`;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1,
    };

    // Create Razorpay Order
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Save Order to Database
    const newlyCreatedOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      razorpayOrderId: razorpayOrder.id,
      cartId,
      paymentId: "", // Will be updated after payment success
      payerId: "", // Will be updated after payment success
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      orderId: newlyCreatedOrder.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      newlyCreatedOrderId: newlyCreatedOrder._id,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

const CaptureOrder = async (req, res) => {
  try {
    const { orderId, paymentId, payerId } = req.body;

    console.log("order", orderId)
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;


    for (let item of order.cartItems) {
 
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });

      }
      product.totalStock -= item.quantity;

      await product.save();

    }
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (error) {
    console.log("errorr", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllorderbyUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const order = await Order.find({userId})
    if(!order.length){
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
    }

    res.status(200).json({
        success:true,
        data:order
      })
  } catch (error) {
    console.log("error", error)
  }
}


const getOrderDetails = async (req, res) => {
  try {
     const { Id } = req.params;
    const order = await Order.findById(Id)
    if(!order){
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
    }
    res.status(200).json({
        success:true,
        data:order
      })

  } catch (error) {
    console.log("error", error)
  }
}

module.exports = { CreateOrder, CaptureOrder, getOrderDetails, getAllorderbyUser };
