const Order = require("../../models/order");

const getAllorder = async (req, res) => {
  try {
    const { userId } = req.params;

    const order = await Order.find({})
    if (!order.length) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }

    res.status(200).json({
      success: true,
      data: order
    })
  } catch (error) {
    console.log("error", error)
  }
}

const getAllOrderDetails = async (req, res) => {
  try {
    const { Id } = req.params;

    const order = await Order.findById(Id)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }
    res.status(200).json({
      success: true,
      data: order
    })

  } catch (error) {
    console.log("error", error)
  }
}


const updateOrderStatus = async (req, res) => {
  try {
    const { Id } = req.params
    const { orderStatus } = req.body
    const order = await Order.findById(Id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }
console.log("orderStatus",orderStatus)
    await Order.findByIdAndUpdate(Id, { orderStatus })
    res.status(200).json({
      success: true,
      message:"Order Status is updated successfully"
    })
  } catch (error) {
    console.log("errorrr", error)
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
}
module.exports = { getAllorder, getAllOrderDetails, updateOrderStatus }