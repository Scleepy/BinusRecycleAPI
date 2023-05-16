const purchaseService = require('./../Services/purchaseService');

const getPurchaseHistory = async (req, res) => {

    const studentID = req.body.studentID;

    try {
        const purchaseHistory = await purchaseService.getPurchaseHistory(studentID);
        res.send({ status: "OK", data: purchaseHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getPurchaseHistory};