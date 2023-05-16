const recycleService = require('./../Services/recycleService');

const getAllRecycleHistory = async (req, res) => {

    const studentID = req.body.studentID;

    try {
        const recycleHistory = await recycleService.getAllRecycleHistory(studentID);
        res.send({ status: "OK", data: recycleHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const getSpecificRecycleHistory = async (req, res) => {

    const data = req.body;

    try {
        const specificRecycleHistory = await recycleService.getSpecificRecycleHistory(data);
        res.send({ status: "OK", data: specificRecycleHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getAllRecycleHistory, getSpecificRecycleHistory};