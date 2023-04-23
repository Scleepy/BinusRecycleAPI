const adminService = require('./../Services/adminService');
const Admin = require('../Models/Admin');

const registerAdmin = async (req, res) => {
    try {

        const {name, email, password} = req.body;

        const admin = new Admin({
            AdminName: name,
            AdminEmail: email,
            AdminPassword: password,
        });

        await adminService.registerAdmin(admin);

        res.send({ status: "OK" });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const loginAdmin = async (req, res) => {
    try {

        const {email, password} = req.body;
        
        const result = await adminService.loginAdmin(email, password);

        res.send({ status: "OK", data: result });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
}

module.exports = {registerAdmin, loginAdmin};
