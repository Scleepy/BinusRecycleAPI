const Category = require('./../Repositories/categoryRepository');

const getAllCategories = async () => {
    try {
        const allCategories =  await Category.getAllCategories();
        return allCategories;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllCategories};