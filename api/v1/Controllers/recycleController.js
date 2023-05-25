const recycleService = require('./../Services/recycleService');

const getSpecificRecycleHistory = async (req, res) => {

    const studentID = req.params.studentID;

    try {
        const recycleHistory = await recycleService.getSpecificRecycleHistory(studentID);
        res.send({ status: "OK", data: recycleHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const getSpecificRecycleHistoryByAdmin = async (req, res) => {

    const adminID = req.params.adminID;

    try {
        const recycleHistory = await recycleService.getSpecificRecycleHistoryByAdmin(adminID);
        res.send({ status: "OK", data: recycleHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const getSpecificCategoryRecycleHistory = async (req, res) => {

    const data = req.params;

    try {
        const specificRecycleHistory = await recycleService.getSpecificCategoryRecycleHistory(data);
        res.send({ status: "OK", data: specificRecycleHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const studentRecycle = async (req, res) => {

    const data = req.body;

    try {
        const studentRecycle = await recycleService.studentRecycle(data);
        res.send({ status: "OK" });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }

}

module.exports = {getSpecificRecycleHistory, getSpecificCategoryRecycleHistory, studentRecycle, getSpecificRecycleHistoryByAdmin};