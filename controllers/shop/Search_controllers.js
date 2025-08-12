const Product = require("../../models/product");

const SearchProduct = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== 'string') {
            res.status(400).json({
                success: false,
                message: "keyword is requried and must be in string format",
            });
        }

        const regEx = new RegExp(keyword, 'i')
        const createSearchquery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ]
        }

        const serachResult = await Product.find(createSearchquery)
        res.status(200).json({
            success: true,
            data: serachResult,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

module.exports = { SearchProduct }