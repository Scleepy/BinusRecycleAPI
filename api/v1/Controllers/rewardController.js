const rewardService = require('./../Services/rewardService');

const getAllRewards = async (req, res) => {

    try {
        const allRewards = await rewardService.getAllRewards();
        res.send({ status: "OK", data: allRewards });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getAllRewards};