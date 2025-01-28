export interface authUserType  {
  id : number | string,
  username : string,
  email : string,
  password : string,
  isAdmin : boolean,
 token : string,
  forgotPasswordToken : string | null,
  forgotPasswordTokenExpiry : string | null,
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
export interface loginDataType {
  email: string;
  password: string;
}