const recycleRepository = require('./../Repositories/recycleRepository');
const dailyMissionRepository = require('./../Repositories/dailyMissionRepository');
const adminRepository = require('./../Repositories/adminRepository');
const studentRepository = require('./../Repositories/studentRepository');
const categoryRepository = require('./../Repositories/categoryRepository');

const getSpecificRecycleHistory = async (studentID) => {
    try {
        const student = await studentRepository.getStudentByID(studentID);
        if (!student) throw { status: 404, message: 'Student Not Found' };

        const recycleHistory =  await recycleRepository.getSpecificRecycleHistory(studentID);
        return recycleHistory;
    }catch(err){
        throw err;
    }
};

const getSpecificRecycleHistoryByAdmin = async (adminID) => {
    try {
        const admin = await adminRepository.getAdminByID(adminID);
        if (!admin) throw { status: 404, message: 'Admin Not Found' };

        const recycleHistory =  await recycleRepository.getSpecificRecycleHistoryByAdmin(adminID);
        return recycleHistory;
    }catch(err){
        throw err;
    }
};

const getSpecificCategoryRecycleHistory = async (data) => {
    try {
        const student = await studentRepository.getStudentByID(data.studentID);
        if (!student) throw { status: 404, message: 'Student Not Found' };

        const category = await categoryRepository.getCategoryByID(data.categoryID);
        if (!category) throw { status: 404, message: 'Category Not Found' };

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
                    await dailyMissionRepository.insertDailyMissionCompletion(data); //Insert data into TrDailyMissionCompletion
                }
                
                await recycleRepository.insertStudentRecycleHistory(data); //Insert data into TrStudentRecycleHistory (Include MissionID)
            } else { //Student already completed the daily mission
                await recycleRepository.insertStudentRecycleHistory(data); //Insert data into TrStudentRecycleHistory (MissionID NULL)
            }
        } else { //Recycled category does not match today's daily mission
            await recycleRepository.insertStudentRecycleHistory(data);
        }

    }catch(err){
        throw err;
    }
}

module.exports = {getSpecificRecycleHistory, getSpecificCategoryRecycleHistory, studentRecycle, getSpecificRecycleHistoryByAdmin};