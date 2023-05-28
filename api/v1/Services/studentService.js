const studentRepository = require('./../Repositories/studentRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../Models/Student');

const registerStudent = async (student) => {
    try {

        const getStudentByID =  await studentRepository.getStudentByID(student.id);
        const getStudentByEmail =  await studentRepository.getStudentByEmail(student.email);

        if(getStudentByID) throw { status: 409, message: 'Duplicate studentID' };
        if(getStudentByEmail) throw { status: 409, message: 'Duplicate email address' };

        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(student.password, salt);

        const newStudent = new Student({
            StudentID: student.id,
            StudentName: student.name,
            StudentEmail: student.email,
            StudentPassword: hashedPassword,
            PasswordSalt: salt,
            StudentImage: student.image,
        });

        await studentRepository.registerStudent(newStudent);
    }catch(err){
        throw err;
    }
};

const loginStudent = async (student) => {
    try {
        const getStudentByEmail = await studentRepository.getStudentByEmail(student.email);
        if(!getStudentByEmail) throw { status: 404, message: 'Student not found' };

        const isPasswordValid = await comparePassword(student.password, getStudentByEmail.StudentPassword, getStudentByEmail.PasswordSalt); 
        if(!isPasswordValid) throw { status: 401, message: 'Incorrect Password' };

        const token = generateJWTToken({id: getStudentByEmail.StudentID, email: getStudentByEmail.StudentEmail});

        return {Token: token, ...getStudentByEmail};
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

const getSpecificStudent = async (studentID) => {
    try {
        const getStudentByID =  await studentRepository.getStudentByID(studentID);

        if(getStudentByID == null) throw { status: 404, message: 'Student not found' };

        return getStudentByID;
    }catch(err){
        throw err;
    }
};

module.exports = {registerStudent, loginStudent, getSpecificStudent};