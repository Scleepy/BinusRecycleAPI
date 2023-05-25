const purchaseService = require('./../Services/purchaseService');

const getSpecificPurchaseHistory = async (req, res) => {

    const studentID = req.params.studentID;

    try {
        const purchaseHistory = await purchaseService.getSpecificPurchaseHistory(studentID);
        res.send({ status: "OK", data: purchaseHistory });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getSpecificPurchaseHistory};