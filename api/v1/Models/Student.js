const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  StudentID: {
    type: String,
    required: true,
    unique: true
  },
  StudentName: {
    type: String,
    required: true
  },
  StudentEmail: {
    type: String,
    required: true,
  },
  StudentPassword: {
    type: String,
    required: true
  },
  PasswordSalt: {
    type: String,
    required: true
  },
  StudentPoints: {
    type: Number,
    default: 0
  },
  StudentProgram: {
    type: String,
    required: true
  }
});
  
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
