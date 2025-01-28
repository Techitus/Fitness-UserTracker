import { NextResponse } from "next/server";
import createResponse from "./nextResponse";

const checkOtpExpiration = (
  otpGeneratedTime: string,
  thresholdTime: number
): NextResponse => {
  const currentTime = Date.now();
  
  if (currentTime - parseInt(otpGeneratedTime) <= thresholdTime) {
    return createResponse(200, "Valid OTP, now you can proceed to reset the password");
  } else {
    return createResponse(400, "OTP expired. Please generate a new one");
  }
};

export default checkOtpExpiration;
