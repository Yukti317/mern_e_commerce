const Cart = require("../../models/cart");
const Product = require("../../models/product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Data is not Valid",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const findCurrentindex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentindex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentindex].quantity += quantity;
    }
    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "UserId is requried",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price saleprice totalStock",
    });

    if (!cart) {
      res.status(400).json({
        success: false,
        message: "CartItem is not found",
      });
    }
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );
    if (validItems.length < cart.items.length) {
      cart.items = validItems;

      await cart.save();
    }
  
    const populateCartItems = validItems.map((item) => ({
    
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      saleprice: item.productId.saleprice,
      totalStock: item.productId.totalStock, 
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const upDateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Data is not Valid",
      });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const findCurrentindex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentindex === -1) {
      res.status(404).json({
        success: false,
        message: "CartItem not found",
      });
    }
    cart.items[findCurrentindex].quantity = quantity;

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price saleprice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      saleprice: item.productId ? item.productId.saleprice : null,
      quantity: item.quantity ,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Data is not Valid",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price saleprice",
    });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price saleprice",
    });
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      saleprice: item.productId ? item.productId.saleprice : null,
      quantity:  item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
      message:"Item is deleted"
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = { addToCart, fetchCartItems, upDateCart, deleteCart };
