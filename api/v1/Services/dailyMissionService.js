const dailyMissionRepository = require('./../Repositories/dailyMissionRepository');

const getAllDailyMission = async () => {
    try {
        const allDailyMission =  await dailyMissionRepository.getAllDailyMission();
        return allDailyMission;
    }catch(err){
        throw err;
    }
};

const getDailyMissionProgress = async (studentID) => {
    try {
        const dailyMissionProgress =  await dailyMissionRepository.getDailyMissionProgress(studentID);
        return dailyMissionProgress;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllDailyMission, getDailyMissionProgress};