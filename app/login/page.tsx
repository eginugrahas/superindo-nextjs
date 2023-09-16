import Image from "next/image";
import { LogIn } from "../components/auth/LogIn";

const LoginPage: React.FC = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center">
        <LogIn />
      </div>
      <div className="relative">
        <Image src="/grocery.png" fill alt="grocery" objectFit="cover"></Image>
      </div>
    </div>
  );
};


export default LoginPage;