'use client'
import { CompanyInfo } from "@/components/setting/company-info";
import { UpdateCredentials } from "@/components/setting/update-credential";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "@/hooks/use-toast";
import { resetPassword } from "@/store/authSlice";
import { STATUS } from "@/types/status";
import { ResetPassword } from "@/types/user.auth";
import { useEffect } from "react";

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.auth);
  const handleResetPassword = async(user:ResetPassword)=>{
   await dispatch(resetPassword(user))
    
  }
  useEffect(()=>{
    if(status === STATUS.SUCCESS){
      toast({
        description: "Password reset successfully...",
        duration: 3000,
      })
    }
    },[status])
    useEffect(() =>{
    if(status === STATUS.ERROR){
      toast({
        description: "Failed to reset password...",
        duration: 3000,
      })
    }
  },[status])
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <CompanyInfo />
        </div>
        <div className="hidden lg:block">
          <Separator orientation="vertical" />
        </div>
        <div className="w-full lg:w-1/2">
          <UpdateCredentials resetChange={handleResetPassword} />
        </div>
      </div>
    </div>
  );
}
