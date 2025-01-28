/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import AuthForm from "@/components/form/Form";
import Background from "@/components/ui/background";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { login } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { STATUS } from "@/types/status";
import { userDataType } from "@/types/user.auth";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const Page = () => {
  const { toast } = useToast()
  const [Loading,setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter();
  const { status } = useAppSelector((state) => state.auth);
 const LoginSubmit = async (user: userDataType) => {
         setLoading(true);
         await dispatch(login(user));
     };
     useEffect(() => {
      if (Loading) {
          if (status === STATUS.SUCCESS) {
            toast({
              description: "User Logged in successfully...",
              duration: 3000
            }) 
              setLoading(false);
              setTimeout(() => {
                  router.push("/");  
              }, 1000);
          } else if (status === STATUS.ERROR) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Please confirm your credientials",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
              setLoading(false);
          }
      }
  }, [status, Loading, router]);
  return (
    <div className="relative w-screen h-screen">
     
      <Background />
      {Loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-transparent p-4 rounded-lg flex flex-col items-center space-y-2">
                  <Loader />
                  
              </div>
          </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center -mt-40">
        < AuthForm mode= "signin" handleSubmit={LoginSubmit}/>
      </div>
    </div>
  );
};

export default Page;
