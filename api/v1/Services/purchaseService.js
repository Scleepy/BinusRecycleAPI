const rewardRepository = require('./../Repositories/rewardRepository');
const purchaseRepository = require('./../Repositories/purchaseRepository');
const studentRepository = require('./../Repositories/studentRepository');

const getSpecificPurchaseHistory = async (studentID) => {
    try {

        const student = await studentRepository.getStudentByID(studentID);
        if (!student) throw { status: 404, message: 'Student Not Found' };
        
        const purchaseHistory =  await purchaseRepository.getSpecificPurchaseHistory(studentID);
        return purchaseHistory;
    }catch(err){
        throw err;
    }
};

const rewardPurchase = async (purchaseData) => {
    try {
        const reward = await rewardRepository.getRewardByRewardID(purchaseData.rewardID);
        const student = await studentRepository.getStudentByID(purchaseData.studentID);

        if (!reward) throw { status: 404, message: 'Reward Not Found' };

        purchaseData.ecoCoins = reward.RewardPoints * purchaseData.purchaseAmount;
        if (purchaseData.ecoCoins > student.StudentPoints) throw { status: 422, message: 'Insufficient Points' };  
                
        await purchaseRepository.rewardPurchase(purchaseData);
    }catch(err){
        throw err;
    }
}

module.exports = {getSpecificPurchaseHistory, rewardPurchase};