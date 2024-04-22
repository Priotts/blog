"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { register } from "@/utils/action";
import { useFormState } from 'react-dom'
import Link from "next/link";

export default function RegisterForm() {
    const [state, formAction] = useFormState(register, undefined);

    return (
        <Card className="w-[350px] border-cyan-400">
            <CardHeader>
                <CardTitle>Join us!</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="username">Username</label>
                            <Input name="username" placeholder="Username..." />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="email">Email</label>
                            <Input name="email" placeholder="Email..." />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="password">Password</label>
                            <Input name="password" type="password" placeholder="Password" />
                        </div>
                        <Button className="bg-sky-500">Create account</Button>
                        <div className="flex justify-center text-sm ">
                            {state?.success === false ? <span className="text-rose-800">{state?.message}</span> : <span className="text-lime-600">
                                {state?.message}
                            </span>}
                        </div>
                    </div>
                </form>
                <div className="relative mb-2 mt-3">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or <Link href={"/login"}>Login</Link></span>
                </div>
            </div>
            </CardContent>
        </Card>
    )
}