const dailyMissionService = require('./../Services/dailyMissionService');

const getAllDailyMission = async (req, res) => {
    try {
        const allDailyMission = await dailyMissionService.getAllDailyMission();
        res.send({ status: "OK", data: allDailyMission });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const getDailyMissionProgress = async (req, res) => {

    const studentID = req.body.studentID;

    try {
        const dailyMissionProgress = await dailyMissionService.getDailyMissionProgress(studentID);
        res.send({ status: "OK", data: dailyMissionProgress });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const getDailyMissionHistory = async (req, res) => {

    const studentID = req.body.studentID;

    try {
        const dailyMissionHistory = await dailyMissionService.getDailyMissionHistory(studentID);
        res.send({ status: "OK", data: dailyMissionHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getAllDailyMission, getDailyMissionProgress, getDailyMissionHistory};