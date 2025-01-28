export interface authUserType  {
  id : number | string,
  username : string,
  email : string,
  password : string,
  isVerified : boolean,
  isAdmin : boolean,
  verifyToken : string | null,
  verifyTokenExpiry : Date | null,
  forgotPasswordToken : string | null,
}
export interface AuthFormProps {
  mode: 'signup' | 'signin',
  handleSubmit :(data:userDataType)=>void
}

export interface userDataType {
  username :string,
  email :string,
  password : string
}