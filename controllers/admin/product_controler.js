const { ImageUploadUtils } = require("../../helpers/cloudinery");
const Product = require("../../models/product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtils(url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// add a new product

const addProduct = async (req, res) => {
  try {

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalStock,
      imagename
    } = req.body;

    const newCreatedproducts = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalStock,
      imagename
    });
    
    await newCreatedproducts.save();
    res.status(201).json({
      success: true,
      message: "Product is created successfully",
      newCreatedproducts,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// fetch a product

const fetchAllProduct = async (req, res) => {
  try {
    const listofProduct = await Product.find({});
    res.status(200).json({
      success: true,
      data: listofProduct,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
const fetchProductbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const listofProduct = await Product.findById(id);
    res.status(200).json({
      success: true,
      data: listofProduct,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      saleprice,
      totalStock,
      imagename
    } = req.body;
    let checkProduct = await Product.findById(id);
    if (!checkProduct)
      return res.status(404).json({
        success: false,
        message: "product is not exist",
      });
      if((saleprice >= price) || checkProduct.saleprice >= checkProduct.price){
         return res.status(404).json({
        success: false,
        message: "The sales price must be lower than the listed price.",
      });
      }
    checkProduct.title = title || checkProduct.title;
    checkProduct.description = description || checkProduct.description;
    checkProduct.category = category || checkProduct.category;
    checkProduct.brand = brand || checkProduct.brand;
    checkProduct.price = price || checkProduct.price;
    checkProduct.saleprice = saleprice === ""  ? 0 : saleprice || checkProduct.saleprice;
    checkProduct.totalStock = totalStock || checkProduct.totalStock;
    checkProduct.image = image || checkProduct.image;
    checkProduct.imagename = imagename || checkProduct.imagename;

    await checkProduct.save();

    res.status(200).json({
      success: true,
      message: "Product is updated successfully",
      data: checkProduct,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// delete a product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "product is not exist",
      });
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
  fetchProductbyid,
};
