import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-5 col-start-2 mt-12">
        <p className="font-mono italic font-semibold text-9xl ">Elevate your <span className="underline decoration-sky-500"> connections </span>as dev</p>
      </div>
      <div className="flex col-span-5 col-start-7 row-span-5 items-center justify-center">
        <Image src="Illustration.svg" width={500} height={500} alt="Illustration"></Image>
      </div>
      <div className="flex col-span-2 col-start-2 mt-10 justify-between">
        <Link href="/register">
          <Button className="bg-sky-500">Register</Button>
        </Link>
        <Link href="login">
          <Button className="bg-sky-500">Log in</Button>
        </Link>
      </div>
    </div>
  );
}
