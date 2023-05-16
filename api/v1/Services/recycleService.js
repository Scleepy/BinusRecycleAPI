const recycleRepository = require('./../Repositories/recycleRepository');

const getAllRecycleHistory = async (studentID) => {
    try {
        const recycleHistory =  await recycleRepository.getAllRecycleHistory(studentID);
        return recycleHistory;
    }catch(err){
        throw err;
    }
};

const getSpecificRecycleHistory = async (data) => {
    try {
        const specificRecycleHistory =  await recycleRepository.getSpecificRecycleHistory(data);
        return specificRecycleHistory;
    }catch(err){
        throw err;
    }
};

module.exports = {getAllRecycleHistory, getSpecificRecycleHistory};