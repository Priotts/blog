"use client"

import { changeBio, changeUsername } from "@/utils/action";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useFormState } from 'react-dom'

export default function UserUpdate({ session }) {
    const [state, formAction] = useFormState(changeUsername, undefined)
    const [stateBio, formActionBio] = useFormState(changeBio, undefined)
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-start-2 font-semibold text-3xl">
                <p>Settings</p>
            </div>
            <Separator className="col-span-12"></Separator>
            <div className="col-start-2">
                <div className="mt-14 mb-8 border rounded-tl-lg rounded-br-lg">
                    <img src={session.user.pfp} alt="" width={200} className="rounded-2xl " />
                </div>
                <Button className="w-full">Change pfp</Button>
            </div>
            <div className="flex justify-center col-start-3 ">
                <Separator orientation="vertical" ></Separator>
            </div>
            <div className="col-start-4 col-span-3 mt-4">
                <p className="text-xl italic">Username</p>
                <form action={formAction}>
                    <input type="text" name="username" className="my-4 italic text-sm h-10 w-full px-1 rounded" placeholder="Your new username" />
                    <div className="col-start-1 ">
                        <Button className="h-fit">Save</Button>
                    </div>
                    <div className="my-2 h-6 ">
                        {state?.success === false ? <span className="text-rose-800 italic text-sm">{state?.message}</span> : <span className="text-lime-600 italic text-sm">
                            {state?.message}
                        </span>}
                    </div>
                </form>
                <div className="col-start-4 col-span-2 mt-4">
                    <p className="text-xl italic">Bio</p>
                    <form action={formActionBio}>
                        <textarea name="bio" className="rounded mt-4 min-h-[150px] w-full resize-none" ></textarea>
                        <div className="col-start-1 ">
                            <Button className="h-fit">Save</Button>
                        </div>
                        <div className="my-2 h-6 ">
                            {stateBio?.success === false ? <span className="text-rose-800 italic text-sm">{stateBio?.message}</span> : <span className="text-lime-600 italic text-sm">
                                {stateBio?.message}
                            </span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}