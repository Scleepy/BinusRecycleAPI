const Category = require('./../Database/Category');

const getAllCategories = async () => {
    try {
        const allCategories =  await Category.getAllCategories();
        return allCategories;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllCategories};