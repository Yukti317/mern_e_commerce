const Address = require("../../models/address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      res.status(400).json({
        success: false,
        message: "Invalid Data!!",
      });
    }

    const newCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newCreatedAddress.save();
    res.status(201).json({
      success: true,
      message: "Address Added successfully",
      data: newCreatedAddress,
    });
  } catch (error) {
    console.log("Errorr", error);
    console.log("res", res.status);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "userId is requried!!",
      });
    }

    const addressList = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log("Errorr", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "userId and addressId is requried!!",
      });
    }

    const updatedaddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId: userId,
      },
      formData,
      { new: true }
    );
    if (!updatedaddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address is updated!!",
      data: updatedaddress,
    });
  } catch (error) {
    console.log("Errorr", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "userId and addressId is requried!!",
      });
    }
    const addressDelete = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId,
    });
    if (!addressDelete) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address is updated!!",
      data: addressDelete,
    });
  } catch (error) {
    console.log("Errorr", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = { addAddress, fetchAddress, updateAddress, deleteAddress };
