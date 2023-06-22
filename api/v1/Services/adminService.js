const adminRepository = require('./../Repositories/AdminRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');

const generateJWTToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
}

const registerAdmin = async (admin) => {
    try {
        let latestID = await adminRepository.getLatestID();
        const IDNumber = parseInt(latestID.substr(-3), 10) + 1;

        const newID = `AD${IDNumber.toString().padStart(3, '0')}`;
        const exist =  await adminRepository.getAdminByEmail(admin.adminEmail);
        
        if(exist) throw { status: 409, message: 'Duplicate email address' };

        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(admin.adminPassword, salt);

        const newAdmin = new Admin({
            AdminID: newID,
            AdminName: admin.adminName,
            AdminEmail: admin.adminEmail,
            AdminPassword: hashedPassword,
            PasswordSalt: salt,
            StationID: admin.stationID,
        });

        await adminRepository.registerAdmin(newAdmin);
    }catch(err){
        throw err;
    }
};

const loginAdmin = async (admin) => {
    try {
        
        const getAdminByEmail = await adminRepository.getAdminByEmail(admin.adminEmail);
        if(!getAdminByEmail) throw { status: 404, message: 'Admin not found' };

        const isPasswordValid = await bcrypt.compare(admin.adminPassword, getAdminByEmail.AdminPassword);
        if(!isPasswordValid) throw { status: 401, message: 'Incorrect Password' };

        const token = generateJWTToken({AdminID: getAdminByEmail.AdminID, AdminEmail: getAdminByEmail.AdminEmail})

        return {Token: token, ...getAdminByEmail};
    }catch(err){
        throw err;
    }
};

const updatePassword = async (obj) => {
    try {
        const getAdminByEmail = await adminRepository.getAdminByEmail(obj.adminEmail);
        const isOldPasswordValid = await bcrypt.compare(obj.oldPassword, getAdminByEmail.AdminPassword);

        if(!isOldPasswordValid) throw { status: 401, message: 'Incorrect old password' };
        if (obj.newPassword !== obj.confirmNewPassword) throw { status: 400, message: 'New password and confirm password do not match' };
        
        //ALPHANUMERIC 5 LETTER
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        if(!regex.test(obj.newPassword)) throw { status: 400, message: 'Password must be alphanumeric and at least 5 characters long' };

        const isMatch = await bcrypt.compare(obj.newPassword, getAdminByEmail.AdminPassword);
        if (isMatch) throw { status: 400, message: "New password should be different from the current password." };

        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(obj.newPassword, salt);

        await adminRepository.updatePassword(getAdminByEmail.AdminID, hashedPassword, salt);

    }catch(err){
        throw err;
    }
};

module.exports = {registerAdmin, loginAdmin, updatePassword};