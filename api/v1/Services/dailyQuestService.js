const dailyQuestRepository = require('./../Repositories/dailyQuestRepository');

const getAllDailyQuest = async () => {
    try {
        const allDailyQuest =  await dailyQuestRepository.getAllDailyQuest();
        return allDailyQuest;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllDailyQuest};