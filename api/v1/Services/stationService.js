const stationRepository = require('./../Repositories/stationRepository.js');

const getSpecificStation = async (stationID) => {
    try {
        const station =  await stationRepository.getSpecificStation(stationID);
        return station;
    }catch(err){
        throw err;
    }
};

module.exports = {getSpecificStation};