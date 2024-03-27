
import Image from 'next/image';
import { auth } from "@/utils/auth";
import LoginForm from '@/components/loginForm/LoginForm';

export default async function Login() {
 
  
  return (
    <div className="grid grid-cols-12 gap-4 ">
      <div className="grid col-span-5 col-start-2 row-span-10 items-center justify-center mt-20">
        <Image src="/LoginIllustration.svg" width={500} height={500} alt="Illustration"></Image>
      </div>
      <div className="grid col-span-4 col-start-8 row-span-10 items-center justify-center mt-20">
        <LoginForm></LoginForm>
      </div>
    </div>
  )
}