// Creat 4-digits OTP
export const otpMaker = () => ({
  type: "CREATE_OTP"
});

export const otpSaver = otp => ({
  type: "SAVE_OTP",
  otp: otp
});
