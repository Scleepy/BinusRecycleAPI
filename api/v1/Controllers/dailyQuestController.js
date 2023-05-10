const dailyQuestService = require('./../Services/dailyQuestService');

const getAllDailyQuest = async (req, res) => {
    try {
        const allDailyQuest = await dailyQuestService.getAllDailyQuest();
        res.send({ status: "OK", data: allDailyQuest });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getAllDailyQuest};