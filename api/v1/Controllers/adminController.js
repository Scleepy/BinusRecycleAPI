const adminService = require('./../Services/adminService');
const bcrypt = require('bcrypt');
const Admin = require('../Models/Admin');

const registerAdmin = async (req, res) => {
    try {

        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            AdminName: name,
            AdminEmail: email,
            AdminPassword: hashedPassword,
            PasswordSalt: salt,
        });

        const result = await adminService.registerAdmin(admin);

        res.send({ status: "OK" });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

module.exports = {registerAdmin};

// AdminID VARCHAR(5) NOT NULL PRIMARY KEY,
// AdminName VARCHAR(MAX) NOT NULL,
// AdminEmail VARCHAR(MAX) NOT NULL,
// AdminImage VARBINARY(MAX) DEFAULT NULL,
// AdminPassword VARCHAR(MAX) NOT NULL,
// PasswordSalt VARCHAR(MAX) NOT NULL,
