const purchaseRepository = require('./../Repositories/purchaseRepository');

const getSpecificPurchaseHistory = async (studentID) => {
    try {
        const purchaseHistory =  await purchaseRepository.getSpecificPurchaseHistory(studentID);
        return purchaseHistory;
    }catch(err){
        throw err;
    }
};

module.exports = {getSpecificPurchaseHistory};