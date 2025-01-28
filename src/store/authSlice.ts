/* eslint-disable @typescript-eslint/no-unused-vars */
import { STATUS } from "@/types/status";
import { authUserType } from "@/types/user.auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

interface AuthState {
    user : authUserType,
    status : STATUS
}
export interface RegisterData {
    username: string;
    email: string;
    password: string;
  }
  export interface LoginData {
    email : string,
    password : string
  }
  
const initialState : AuthState = {
    user : {} as authUserType,
    status : STATUS.LOADING
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
       setUser(state : AuthState,action : PayloadAction<authUserType>){
        state.user = action.payload;
       },
       setStatus(state : AuthState, action : PayloadAction<STATUS>){
        state.status = action.payload;
       }
    }

})
export const {setUser, setStatus} = authSlice.actions
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
export function login(user :LoginData ){
    return async function loginThunk(dispatch : AppDispatch){
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response = await axios.post('/api/auth/signin',user)
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

