const adminService = require('./../Services/adminService');

const registerAdmin = async (req, res) => {
    try {

        const admin = req.body;

        await adminService.registerAdmin(admin);

        res.send({ status: "OK" });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const loginAdmin = async (req, res) => {
    try {

        const admin = req.body;
        
        const result = await adminService.loginAdmin(admin);

        res.send({ status: "OK", data: result });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
}

module.exports = {registerAdmin, loginAdmin};
