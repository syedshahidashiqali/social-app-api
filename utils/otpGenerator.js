const otpGenerator = require('otp-generator');

const OTP_LENGTH =  10

const OTP_CONFIG = {
    upperCaseAlphabets: false,
    specialChars: false
}

const generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};

module.exports = {
    generateOTP
}