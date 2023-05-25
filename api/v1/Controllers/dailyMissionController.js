const dailyMissionService = require('./../Services/dailyMissionService');

const getAllDailyMission = async (req, res) => {
    try {
        const allDailyMission = await dailyMissionService.getAllDailyMission();
        res.send({ status: "OK", data: allDailyMission });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const getSpecificDailyMissionProgress = async (req, res) => {

    const studentID = req.params.studentID;

    try {
        const dailyMissionProgress = await dailyMissionService.getSpecificDailyMissionProgress(studentID);
        res.send({ status: "OK", data: dailyMissionProgress });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const getSpecificDailyMissionHistory = async (req, res) => {

    const studentID = req.params.studentID;

    try {
        const dailyMissionHistory = await dailyMissionService.getSpecificDailyMissionHistory(studentID);
        res.send({ status: "OK", data: dailyMissionHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getAllDailyMission, getSpecificDailyMissionProgress, getSpecificDailyMissionHistory};