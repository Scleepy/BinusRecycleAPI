const dailyMissionRepository = require('./../Repositories/dailyMissionRepository');
const studentRepository = require('./../Repositories/studentRepository');

const getAllDailyMission = async () => {
    try {
        const allDailyMission =  await dailyMissionRepository.getAllDailyMission();
        return allDailyMission;
    }catch(err){
        throw err;
    }
};

const generateMissionProgress = async (missionID, completedDailyMissions, dailyMissionProgress) => {

    let filteredMission  = completedDailyMissions.filter(mission => mission.MissionID === missionID);
    let missionProgress;

    if(filteredMission.length !== 0){
        missionProgress = {
            MissionID: missionID,
            IsCompleted: true
        };
    } else {
        filteredMission  = dailyMissionProgress.filter(mission => mission.MissionID === missionID);
        const totalItemWeight = filteredMission.reduce((sum, mission) => sum + mission.ItemWeight, 0);
        missionProgress = {
            MissionID: missionID,
            MissionProgress: totalItemWeight,
            IsCompleted: false
        };
    }

    return missionProgress;
}

const getSpecificDailyMissionProgress = async (studentID) => {
    try {

        const student = await studentRepository.getStudentByID(studentID);
        if (!student) throw { status: 404, message: 'Student Not Found' };

        const dailyMissionProgress =  await dailyMissionRepository.getSpecificDailyMissionProgress(studentID);
        const completedDailyMissions = await dailyMissionRepository.getSpecificCompletedDailyMission(studentID);

        let firstMissionProgress, secondMissionProgress, thirdMissionProgress;

        firstMissionProgress = await generateMissionProgress('MS001', completedDailyMissions, dailyMissionProgress);
        secondMissionProgress = await generateMissionProgress('MS002', completedDailyMissions, dailyMissionProgress);
        thirdMissionProgress = await generateMissionProgress('MS003', completedDailyMissions, dailyMissionProgress);

        return {
            firstMissionProgress,
            secondMissionProgress,
            thirdMissionProgress
        };
    }catch(err){
        throw err;
    }
};

const getSpecificDailyMissionHistory = async (studentID) => {
    try {
        const student = await studentRepository.getStudentByID(studentID);
        if (!student) throw { status: 404, message: 'Student Not Found' };
        
        const dailyMissionHistory =  await dailyMissionRepository.getDailyMissionHistory(studentID);
        return dailyMissionHistory;
    }catch(err){
        throw err;
    }
};

const resetDailyMission = async () => {
    try {
        await dailyMissionRepository.resetDailyMission();
    }catch(err){
        throw err;
    }
};

module.exports = {getAllDailyMission, getSpecificDailyMissionProgress, getSpecificDailyMissionHistory, resetDailyMission};