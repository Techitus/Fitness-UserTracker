/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { STATUS } from "@/types/status";
import { AuthState, AuthUserType,  LoginDataType, RegisterData, ResetPassword, VerifyOtpData } from "@/types/user.auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";


const initialState : AuthState = {
    user : {} as AuthUserType,
    status : STATUS.LOADING
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
       setUser(state : AuthState,action : PayloadAction<AuthUserType>){
        state.user = action.payload;
       },
       setStatus(state : AuthState, action : PayloadAction<STATUS>){
        state.status = action.payload;
       }, setToken(state: AuthState, action: PayloadAction<string>) {
        state.user.token = action.payload;
      },
    }

})
export const {setUser,setStatus ,setToken} = authSlice.actions
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
export function login(user :LoginDataType ){
    return async function loginThunk(dispatch : AppDispatch){
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response = await axios.post('/api/auth/signin',user)
            if(response.status === 200){
                const {token} = response.data
                dispatch(setToken(token))
                localStorage.setItem('token', token);
                dispatch(setStatus(STATUS.SUCCESS))
            }else{
                alert("Unexpected response");
                dispatch(setStatus(STATUS.ERROR))
                
            }

        }catch(error){
            dispatch(setStatus(STATUS.ERROR))

        }
    }
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
  