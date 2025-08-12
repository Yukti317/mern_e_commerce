const Order = require("../../models/order");
const Product = require("../../models/product");
const ProductReview = require("../../models/reviews");

const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } = req.body
        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            // orderStatus: "confirmed"
        })
        console.log("order", order)
        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase product to review it.",
            });
        }

        const checkExistreview = await ProductReview.findOne({
            productId, userId,
        });
        if (checkExistreview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product!",
            });
        }

        const newreview = new ProductReview({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue
        })
        await newreview.save();
        const review = await ProductReview.find({ productId });
        const totalreviewlength = review.length;
        const averegereview = review.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalreviewlength;

        await Product.findByIdAndUpdate(productId, { averegereview })
        res.status(201).json({
            success: true,
            data: newreview,
        });

    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const getProductReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const review = await ProductReview.find({ productId })
        res.status(200).json({
            success: true,
            data:review,
        });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

module.exports = { addProductReview, getProductReview }