"use client";

import AuthForm from "@/components/form/Form";
import Background from "@/components/ui/background";

const Page = () => {
  return (
    <div className="relative w-screen h-screen">
     
      <Background />

      <div className="absolute inset-0 flex items-center justify-center -mt-40">
        < AuthForm mode= "signin"/>
      </div>
    </div>
  );
};

export default Page;
