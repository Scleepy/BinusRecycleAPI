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

const studentRecycle = async (data) => {
    try {
        
        // 1kg => +20 eco coins
        // get total eco coins from main recycle data
        // update recycle history

        // check daily mission => if done all(+5)


        // const specificRecycleHistory =  await recycleRepository.getSpecificRecycleHistory(data);
        // return specificRecycleHistory;
    }catch(err){
        throw err;
    }
}

module.exports = {getAllRecycleHistory, getSpecificRecycleHistory, studentRecycle};