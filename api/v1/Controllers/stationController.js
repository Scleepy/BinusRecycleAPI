const stationService = require('./../Services/stationService');

const getSpecificStation = async (req, res) => {

    try {
        
        const stationID = req.params.stationID;
        const station = await stationService.getSpecificStation(stationID);

        res.send({ status: "OK", data: station });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {getSpecificStation};