const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  AdminID: {
    type: String,
    required: true,
    unique: true
  },
  AdminName: {
    type: String,
    required: true
  },
  AdminEmail: {
    type: String,
    required: true,
    unique: true
  },
  AdminPassword: {
    type: String,
    required: true
  },
  PasswordSalt: {
    type: String,
    required: true
  },
  StationID: {
    type: String,
    required: true
  },
  IsSuperUser: {
    type: Boolean, 
    default: false,
    required: true
  }
});
  
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
