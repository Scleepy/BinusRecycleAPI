const recycleRepository = require('./../Repositories/recycleRepository');
const dailyMissionRepository = require('./../Repositories/dailyMissionRepository');

const getAllRecycleHistory = async (studentID) => {
    try {
        const recycleHistory =  await recycleRepository.getAllRecycleHistory(studentID);
        return recycleHistory;
    }catch(err){
        throw err;
    }
};

const getSpecificRecycleHistory = async (data) => {
    try {
        const specificRecycleHistory =  await recycleRepository.getSpecificRecycleHistory(data);
        return specificRecycleHistory;
    }catch(err){
        throw err;
    }
};

const studentRecycle = async (data) => {
    try {

        data.ecoCoins = data.itemWeight * 20;

        const specificDailyMission = await dailyMissionRepository.getSpecificDailyMission(data.categoryID);

        if(specificDailyMission.length !== 0){
            const dailyMissionCompletionFilterByCategoryID =  await dailyMissionRepository.getDailyMissionCompletionFilterByCategoryID(data.studentID, data.categoryID);
            
            if(!dailyMissionCompletionFilterByCategoryID.length !== 0){

                data.missionID = specificDailyMission[0].MissionID;

                const dailyMissionProgress =  await dailyMissionRepository.getDailyMissionProgress(data.studentID);
                const filteredMission  = dailyMissionProgress.filter(mission => mission.MissionID === specificDailyMission[0].MissionID);
                const totalItemWeight = filteredMission.reduce((sum, mission) => sum + mission.ItemWeight, 0);
                
                if(totalItemWeight + data.itemWeight >= specificDailyMission[0].ItemWeight) {
                    const insertCompletedDailyMission = await dailyMissionRepository.insertDailyMissionCompletion(data);
                }
                
                return insertStudentRecycleHistory = await recycleRepository.insertStudentRecycleHistory(data);
            } 
        } else {
            return insertStudentRecycleHistory = await recycleRepository.insertStudentRecycleHistory(data);
        }

    }catch(err){
        throw err;
    }
}

module.exports = {getAllRecycleHistory, getSpecificRecycleHistory, studentRecycle};