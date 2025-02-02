/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { STATUS } from "@/types/status";
import { AuthState, AuthUserType,  LoginDataType, RegisterData, ResetPassword, VerifyOtpAdmin, VerifyOtpData } from "@/types/user.auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";


const savedToken = typeof window !== "undefined" ? localStorage.getItem('token') : null;
const savedEmail = typeof window !== "undefined" ? localStorage.getItem('email') : null;
const initialState: AuthState = {
    user: savedToken ? { token: savedToken, email: savedEmail } as AuthUserType : {} as AuthUserType,
    status: STATUS.LOADING,
    isAuthenticated: !!savedToken,
};
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
       setUser(state : AuthState,action : PayloadAction<AuthUserType>){
        state.user = action.payload;
         state.isAuthenticated = true;
       },
       setStatus(state : AuthState, action : PayloadAction<STATUS>){
        state.status = action.payload;
       }, setToken(state: AuthState, action: PayloadAction<string>) {
        state.user.token = action.payload;
      },logout(state: AuthState) {
        state.user = {} as AuthUserType;
        state.isAuthenticated = false;
        state.user.token = '';
        localStorage.removeItem('token');
        axios.post('/api/auth/logout');
    },setEmail(state: AuthState, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },setIsAdmin(state: AuthState, action: PayloadAction<boolean>) {
      state.user.isAdmin = action.payload;
    }

} 
})
export const {setUser,setStatus ,setToken,setEmail,logout,setIsAdmin} = authSlice.actions
export default authSlice.reducer;


export function register(user :RegisterData ){
    return async function registerThunk(dispatch : AppDispatch){
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response = await axios.post('/api/auth/signup',user)
            if(response.status === 200){
                dispatch(setStatus(STATUS.SUCCESS))
                dispatch(setUser(response.data));
                
            }else{
                alert("Unexpected response");
                dispatch(setStatus(STATUS.ERROR))
                
            }

        }catch(error){
            dispatch(setStatus(STATUS.ERROR))

        }
    }
}
export function login(user: LoginDataType) {
  return async function loginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await axios.post('/api/auth/signin', user);
      if (response.status === 200) {
        const { token, email, isAdmin } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('isAdmin',isAdmin)
        dispatch(setUser({
          token, email, isAdmin,
          id: "",
          username: "",
          password: "",
          forgotPasswordToken: null,
          forgotPasswordTokenExpiry: null
        }));
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        alert("Unexpected response");
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}


export function forgetPassword(user : {email : string}){
    return async function forgetPasswordThunk(dispatch:AppDispatch){
        try{
            const response = await axios.post('/api/auth/forgetpassword',user)
            if(response.status === 200){
                dispatch(setStatus(STATUS.SUCCESS))
            }else{
                dispatch(setStatus(STATUS.ERROR))
            }
        

        }catch(err){
            dispatch(setStatus(STATUS.ERROR))

        }
    }
}
export function verifyOtp(user: VerifyOtpData) {
    return async function verifyOtpThunk(dispatch: AppDispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await axios.post("/api/auth/verify-otp", user);
  
        if (response.status === 200) {
          dispatch(setStatus(STATUS.SUCCESS));
          return {
            success: true,
            message: "OTP verified successfully",
          };
        } else {
          dispatch(setStatus(STATUS.ERROR));
          return {
            success: false,
            message: "Invalid OTP",
          };
        }
      } catch (error) {
        dispatch(setStatus(STATUS.ERROR));
        return {
          success: false,
          message: "Failed to verify OTP",
        };
      }
    };
  }

  export function resetPassword(user: ResetPassword) {
    return async function resetPasswordThunk(dispatch: AppDispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await axios.post("/api/auth/resetpassword", user);
        if (response.status === 200) {
          dispatch(setStatus(STATUS.SUCCESS));
          return { success: true, message: "Password reset successfully" };
        } else {
          dispatch(setStatus(STATUS.ERROR));
          return { success: false, message: response.data?.message || "Unexpected error" };
        }
      } catch (err: any) {
        dispatch(setStatus(STATUS.ERROR));
        return { success: false, message: err.response?.data?.message || "Failed to reset password" };
      }
    };
  }
  

  export function verifyAdmin(user : {email : string}){
    return async function verifyAdminThunk(dispatch:AppDispatch){
        try{
            const response = await axios.post('/api/auth/adminverify',user)
            if(response.status === 200){
                dispatch(setStatus(STATUS.SUCCESS))
            }else{
                dispatch(setStatus(STATUS.ERROR))
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR))

        }
    }
}

export function verifyAdminOtp(user: VerifyOtpAdmin) {
  return async function verifyAdminOtpThunk(dispatch: AppDispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await axios.post("/api/auth/admin-otp", user);

      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        return {
          success: true,
          message: "Congratulations!! Now you are verified user 🥰",
        };
      } else {
        dispatch(setStatus(STATUS.ERROR));
        return {
          success: false,
          message: "Invalid OTP ",
        };
      }
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
      return {
        success: false,
        message: "Failed to verify OTP",
      };
    }
  };
}