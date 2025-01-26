export interface authUserType  {
  id : number | string,
  username : string,
  email : string,
  password : string,
  confirmPassword : string,
  isVerified : boolean,
  isAdmin : boolean,
  verifyToken : string | null,
  verifyTokenExpiry : Date | null,
  forgotPasswordToken : string | null,
}