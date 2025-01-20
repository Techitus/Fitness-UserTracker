import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import logo from '@/app/images/logo-gym.png';

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center w-3/4 md:w-full h-full bg-transparent ">
      <Card className="w-full max-w-md ">
        <CardHeader className="flex justify-center items-center">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src={logo}
              alt="Logo"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </CardHeader>

        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
