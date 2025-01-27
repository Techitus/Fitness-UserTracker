/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authAPI } from "@/http";
import { STATUS } from "@/types/status";
import { authUserType } from "@/types/user.auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    user : authUserType,
    status : STATUS
}
interface RegisterData {
    username: string;
    email: string;
    password: string;
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


export function register(data :RegisterData ){
    return async function registerThunk(dispatch : any){
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response = await authAPI.post('register',data)
            if(response.status === 200){
                dispatch(setUser(response.data.user))
                dispatch(setStatus(STATUS.SUCCESS))
            }else{
                dispatch(setStatus(STATUS.ERROR))
            }

        }catch(error){
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}