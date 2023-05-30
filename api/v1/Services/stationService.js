const stationRepository = require('./../Repositories/stationRepository.js');

const getSpecificStation = async (stationID) => {
    try {
        const station =  await stationRepository.getSpecificStation(stationID);
        if (!station) throw { status: 404, message: 'Station Not Found' };
        
        return station;
    }catch(err){
        throw err;
    }
};

const getAllStationAndInformation = async () => {
    try {
        const allStationAndInformation =  await stationRepository.getAllStationAndInformation();
        return allStationAndInformation;
    }catch(err){
        throw err;
    }
};

module.exports = {getSpecificStation, getAllStationAndInformation};