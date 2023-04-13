const categoryService = require('./../Services/categoryService');

const getAllCategories = async (req, res) => {

    try {
        const allCategories = await categoryService.getAllCategories();
        res.send({ status: "OK", data: allCategories });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getAllCategories};