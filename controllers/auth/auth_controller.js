const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// Register

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkuser = await User.findOne({ email });
    if (checkuser)
      return res.status(400).json({
        success: false,
        message: "User is already exist",
      });
    const haspassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: haspassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Errorr", error);
    res.status(500).json({
      success: false,
      message: "Inter nal server error",
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser)
      return res.status(500).json({
        success: false,
        message:
          "User is not exist!, please check your email or register first",
      });

    const checkpassword = await bcrypt.compare(password, checkuser.password);
    if (!checkpassword)
      return res.status(500).json({
        success: false,
        message: "Incorrect password!, please check your password",
      });

    const token = jwt.sign(
      {
        id: checkuser._id,
        role: checkuser.role,
        email: checkuser.email,
        userName:checkuser.userName
      },
      "CLIENT_KEY_1234",
      { expiresIn: "30m" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // change to true in production with HTTPS
        sameSite: "Lax", // use "None" if frontend & backend have different origins with HTTPS
        path: "/",
      })
      .json({
        success: true,
        message: "Loged in successfully",
        user: {
          email: checkuser.email,
          role: checkuser.role,
          id: checkuser._id,
          userName: checkuser.userName,
        },
      });
  } catch (error) {
    console.log("Errorr", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Logout

const logout = (req, res) => {
  console.log("resss",res)
   res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};
// Auth Middelware

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      messageL: "Unathorised user!!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_KEY_1234"); //Decode token and pass secret key
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      messageL: "Unathorised user!!",
    });
  }
};

module.exports = { register, login, logout, authMiddleware };
