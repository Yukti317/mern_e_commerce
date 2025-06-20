const express = require('express')
const {register, login, logout, authMiddleware} = require('../../controllers/auth/auth_controller')

const router = express.Router();

router.post('/registeruser', register);
router.post('/loginuser', login);
router.post('/logout', logout);
router.get('/checkAuth', authMiddleware, (req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"Authenticated User!!",
        user
    })
})

//Register Router

module.exports = router;