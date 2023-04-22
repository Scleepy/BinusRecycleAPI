const Admin = require('./../Database/Admin');

const registerAdmin = async (admin) => {
    try {
        let latestID = await Admin.getLatestID();
        const IDNumber = parseInt(latestID.substr(-3), 10) + 1;

        const newID = `AD${IDNumber.toString().padStart(3, '0')}`;
        const exist =  await Admin.existEmail(admin.AdminEmail);
        
        if(exist){
            const error = new Error('Duplicate email address');
            error.status = 409;
            throw error;
        }

        admin.AdminID = newID;

        return await Admin.registerAdmin(admin);
    }catch(err){
        throw err;
    }
};

module.exports = {registerAdmin};