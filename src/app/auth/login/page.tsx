"use client";

import LoginForm from "@/components/form/Form";
import Background from "@/components/ui/background";

const Page = () => {
  return (
    <div className="relative w-screen h-screen">
      {/* Background */}
      <Background />

      {/* LoginForm */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
