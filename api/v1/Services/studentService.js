const studentRepository = require('./../Repositories/studentRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../Models/Student');

const registerStudent = async (student) => {
    try {

        const existStudentID =  await studentRepository.existStudentID(student.id);
        const existEmail =  await studentRepository.existEmail(student.email);
        
        if(existEmail) throw { status: 409, message: 'Duplicate email address' };
        if(existStudentID) throw { status: 409, message: 'Duplicate studentID' };

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

        return await studentRepository.registerStudent(newStudent);
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

        return {token: token, ...getStudentByEmail};
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

module.exports = {registerStudent, loginStudent};