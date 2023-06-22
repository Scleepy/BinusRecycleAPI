const studentService = require('./../Services/studentService');

const registerStudent = async (req, res) => {
    try {

        const student = req.body;

        await studentService.registerStudent(student);

        res.send({ status: "OK" });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
};

const loginStudent = async (req, res) => {
    try {

        const student = req.body;
        
        const result = await studentService.loginStudent(student);

        res.send({ status: "OK", data: result });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
}

const getSpecificStudent = async (req, res) => {
    try {

        const studentID = req.params.studentID;
        
        const result = await studentService.getSpecificStudent(studentID);

        res.send({ status: "OK", data: result });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
}

const updatePassword = async (req, res) => {
    try {

        const obj = req.body;
        const result = await studentService.updatePassword(obj);

        res.send({ status: "OK", data: result });   
    } catch (err) {
        res.status(err?.status || 500).send({ error: err?.message || err });
    }
}

module.exports = {registerStudent, loginStudent, getSpecificStudent, updatePassword};