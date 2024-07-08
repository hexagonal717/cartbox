const mongoose = require('mongoose');


const otpInfoSchema = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: Number, required: true},
    otpExpiration: {type: Date}
})

module.exports = mongoose.model('otpInfo', otpInfoSchema)