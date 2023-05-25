const recycleRepository = require('./../Repositories/recycleRepository');
const dailyMissionRepository = require('./../Repositories/dailyMissionRepository');

const getSpecificRecycleHistory = async (studentID) => {
    try {
        const recycleHistory =  await recycleRepository.getSpecificRecycleHistory(studentID);
        return recycleHistory;
    }catch(err){
        throw err;
    }
};

const getSpecificCategoryRecycleHistory = async (data) => {
    try {
        const specificRecycleHistory =  await recycleRepository.getSpecificCategoryRecycleHistory(data);
        return specificRecycleHistory;
    }catch(err){
        throw err;
    }
};

const studentRecycle = async (data) => {
    try {

        data.ecoCoins = data.itemWeight * 20; //1KG = 20 EcoCoins

        const specificDailyMission = await dailyMissionRepository.getSpecificDailyMission(data.categoryID);

        if(specificDailyMission.length !== 0){ //Checks if the recycled category matches current daily mission
            const dailyMissionCompletionFilterByCategoryID =  await dailyMissionRepository.getDailyMissionCompletionFilterByCategoryID(data.studentID, data.categoryID);

            if(dailyMissionCompletionFilterByCategoryID.length === 0){ //Checks if student already completed the mission
                //Student has not completed the daily mission
                data.missionID = specificDailyMission[0].MissionID;

                const dailyMissionProgress =  await dailyMissionRepository.getSpecificDailyMissionProgress(data.studentID);
                const filteredMission  = dailyMissionProgress.filter(mission => mission.MissionID === specificDailyMission[0].MissionID);
                const totalItemWeight = filteredMission.reduce((sum, mission) => sum + mission.ItemWeight, 0);
                
                if(totalItemWeight + data.itemWeight >= specificDailyMission[0].ItemWeight) {
                    const insertCompletedDailyMission = await dailyMissionRepository.insertDailyMissionCompletion(data); //Insert data into TrDailyMissionCompletion
                }
                
                return insertStudentRecycleHistory = await recycleRepository.insertStudentRecycleHistory(data); //Insert data into TrStudentRecycleHistory (Include MissionID)
            } else { //Student already completed the daily mission
                return insertStudentRecycleHistory = await recycleRepository.insertStudentRecycleHistory(data); //Insert data into TrStudentRecycleHistory (MissionID NULL)
            }
        } else { //Recycled category does not match today's daily mission
            return insertStudentRecycleHistory = await recycleRepository.insertStudentRecycleHistory(data);
        }

    }catch(err){
        throw err;
    }
}

module.exports = {getSpecificRecycleHistory, getSpecificCategoryRecycleHistory, studentRecycle};