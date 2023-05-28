const rewardRepository = require('./../Repositories/rewardRepository');

const getAllRewards = async () => {
    try {
        const allRewards =  await rewardRepository.getAllRewards();
        return allRewards;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllRewards};