const purchaseRepository = require('./../Repositories/purchaseRepository');

const getPurchaseHistory = async (studentID) => {
    try {
        const purchaseHistory =  await purchaseRepository.getPurchaseHistory(studentID);
        return purchaseHistory;
    }catch(err){
        throw err;
    }
};

module.exports = {getPurchaseHistory};