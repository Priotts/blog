"use client"

import { handleGitHubLogin, login } from "@/utils/action";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

import { useFormState } from 'react-dom'

export default function LoginForm() {
    const [state, formAction] = useFormState(login, undefined);
    const router = useRouter()
    return (
        <Card className="w-[350px] border-cyan-400">
            <CardHeader>
                <CardTitle>Log In</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="username">Username</label>
                            <Input type="text" placeholder="Your username" name="username" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="password">Password</label>
                            <Input type="password" placeholder="password..." name="password" />
                        </div>
                        <Button className="bg-sky-500">Log in</Button>
                    </div>
                </form>
            </CardContent>
            <div className="flex justify-center text-sm ">
                {state?.success === false ? <span className="text-rose-800">{state?.message}</span> : <span className="text-lime-600">
                    {router.push('/home')}
                </span>}
            </div>
            <div className="relative mb-2 mt-3">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <form action={handleGitHubLogin} className="flex justify-center pb-4">
                <Button className="bg-sky-500"> GitHub</Button>
            </form>
        </Card>
    )
}