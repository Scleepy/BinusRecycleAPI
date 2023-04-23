const Admin = require('./../Repositories/AdminRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAdmin = async (admin) => {
    try {
        let latestID = await Admin.getLatestID();
        const IDNumber = parseInt(latestID.substr(-3), 10) + 1;

        const newID = `AD${IDNumber.toString().padStart(3, '0')}`;
        const exist =  await Admin.existEmail(admin.AdminEmail);
        
        if(exist) throw { status: 409, message: 'Duplicate email address' };

        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(admin.AdminPassword, salt);

        admin.AdminPassword = hashedPassword;
        admin.PasswordSalt = salt;
        admin.AdminID = newID;

        return await Admin.registerAdmin(admin);
    }catch(err){
        throw err;
    }
};

const loginAdmin = async (email, password) => {
    try {
        
        const getAdminByEmail = await Admin.getAdminByEmail(email);
        if(!getAdminByEmail) throw { status: 404, message: 'Admin not found' };

        const isPasswordValid = await comparePassword(password, getAdminByEmail.AdminPassword, getAdminByEmail.PasswordSalt); 
        if(!isPasswordValid) throw { status: 401, message: 'Incorrect Password' };

        const token = generateJWTToken({id: getAdminByEmail.AdminID, email: getAdminByEmail.AdminEmail});

        return {token: token};
    }catch(err){
        throw err;
    }
};

const comparePassword = async (password, hashedPassword, passwordSalt) => {
    const generateHashedPassword = await bcrypt.hash(password, passwordSalt);
    return hashedPassword === generateHashedPassword;
};

const generateJWTToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
}

module.exports = {registerAdmin, loginAdmin};