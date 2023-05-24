const dailyMissionRepository = require('./../Repositories/dailyMissionRepository');

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

const getDailyMissionProgress = async (studentID) => {
    try {
        const dailyMissionProgress =  await dailyMissionRepository.getDailyMissionProgress(studentID);
        const completedDailyMissions = await dailyMissionRepository.getCompletedDailyMission(studentID);

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

const getDailyMissionHistory = async (studentID) => {
    try {
        const dailyMissionHistory =  await dailyMissionRepository.getDailyMissionHistory(studentID);
        return dailyMissionHistory;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllDailyMission, getDailyMissionProgress, getDailyMissionHistory};