const categoryRepository = require('./../Repositories/categoryRepository');

const getAllCategories = async () => {
    try {
        const allCategories =  await categoryRepository.getAllCategories();
        return allCategories;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllCategories};