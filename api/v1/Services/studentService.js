const studentRepository = require('./../Repositories/studentRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../Models/Student');

const generateJWTToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
}

const registerStudent = async (student) => {
    try {

        const getStudentByID =  await studentRepository.getStudentByID(student.studentID);
        const getStudentByEmail =  await studentRepository.getStudentByEmail(student.studentEmail);

        if(getStudentByID) throw { status: 409, message: 'Duplicate studentID' };
        if(getStudentByEmail) throw { status: 409, message: 'Duplicate email address' };

        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(student.studentPassword, salt);

        const newStudent = new Student({
            StudentID: student.studentID,
            StudentName: student.studentName,
            StudentEmail: student.studentEmail,
            StudentPassword: hashedPassword,
            PasswordSalt: salt,
            StudentProgram: student.studentProgram,
            IsSuperUser: student.isSuperUser
        });

        await studentRepository.registerStudent(newStudent);
    }catch(err){
        throw err;
    }
};

const loginStudent = async (student) => {
    try {
        const getStudentByEmail = await studentRepository.getStudentByEmail(student.studentEmail);
        if(!getStudentByEmail) throw { status: 404, message: 'Student not found' };

        const isPasswordValid = await bcrypt.compare(student.studentPassword, getStudentByEmail.StudentPassword);
        if(!isPasswordValid) throw { status: 401, message: 'Incorrect Password' };

        const token = generateJWTToken({id: getStudentByEmail.StudentID, email: getStudentByEmail.StudentEmail});

        if (!getStudentByEmail.IsSuperUser) getStudentByEmail.IsSuperUser = false;

        return {Token: token, ...getStudentByEmail};
    }catch(err){
        throw err;
    }
};

const getSpecificStudent = async (studentID) => {
    try {
        const getStudentByID =  await studentRepository.getStudentByID(studentID);

        if(!getStudentByID) throw { status: 404, message: 'Student not found' };

        return getStudentByID;
    }catch(err){
        throw err;
    }
};

const updatePassword = async (obj) => {
    try {
        const getStudentByEmail = await studentRepository.getStudentByEmail(obj.studentEmail);
        const isOldPasswordValid = await bcrypt.compare(obj.oldPassword, getStudentByEmail.StudentPassword);

        if(!isOldPasswordValid) throw { status: 401, message: 'Incorrect old password' };
        if (obj.newPassword !== obj.confirmNewPassword) throw { status: 400, message: 'New password and confirm password do not match' };
        
        //ALPHANUMERIC 5 LETTER
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        if(!regex.test(obj.newPassword)) throw { status: 400, message: 'Password must be alphanumeric and at least 5 characters long' };

        const isMatch = await bcrypt.compare(obj.newPassword, getStudentByEmail.StudentPassword);
        if (isMatch) throw { status: 400, message: "New password should be different from the current password." };

        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(obj.newPassword, salt);

        await studentRepository.updatePassword(getStudentByEmail.StudentID, hashedPassword, salt);

    }catch(err){
        throw err;
    }
};

module.exports = {registerStudent, loginStudent, getSpecificStudent, updatePassword};