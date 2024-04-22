"use client"

import { changeBio, changeUsername, social, updatePfp } from "@/utils/action";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useFormState } from 'react-dom'
import { X, Github } from 'lucide-react';
import UploadPfpButton from "../uploadPfpButton/UploadPfpButton";

export default function UserUpdate({ sessionPfp }) {
    const [state, formAction] = useFormState(changeUsername, undefined)
    const [stateBio, formActionBio] = useFormState(changeBio, undefined)
    const [stateContact, formActionContact] = useFormState(social, undefined)
    const [statePfp, formActionPfp] = useFormState(updatePfp, undefined)

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-start-2 font-semibold text-3xl p-4">
                <p>Settings</p>
            </div>
            <Separator className="col-span-12 "></Separator>
            <div className="col-start-4 col-span-5 lg:col-start-2 lg:col-auto">
                <div className="flex items-center justify-center lg:mt-14 lg:mb-8 border rounded-tl-lg rounded-br-lg">
                    <img src={sessionPfp} alt="" width={200} className="rounded-2xl " />
                </div>
                <div className="overflow-hidden ">
                    <form action={formActionPfp}>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="picture">Profile picture</label>
                            <input type="file" name="pfp" />
                        </div>
                        <UploadPfpButton />
                        <div className="my-1 h-auto ">
                            {statePfp?.success === false ? <span className="text-rose-800 italic text-sm">{statePfp?.message}</span> : <span className="text-lime-600 italic text-sm">
                                {statePfp?.message}
                            </span>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden lg:flex lg:justify-center lg:col-start-3 ">
                <Separator orientation="vertical" ></Separator>
            </div>
            <div className="col-start-4 col-span-5 lg:col-start-4 lg:col-span-3 lg:mt-4">
                <p className="text-lg font-semibold">Username</p>
                <form action={formAction}>
                    <input type="text" name="username" className="my-1 italic border text-sm h-10 w-full px-1 rounded" placeholder="Your new username" />
                    <div className="col-start-1 my-1">
                        <Button className="h-fit">Save</Button>
                    </div>
                    <div className="my-1 h-6 ">
                        {state?.success === false ? <span className="text-rose-800 italic text-sm">{state?.message}</span> : <span className="text-lime-600 italic text-sm">
                            {state?.message}
                        </span>}
                    </div>
                </form>
                <div className="col-start-4 col-span-2 mt-4">
                    <p className="text-lg font-semibold">Bio</p>
                    <form action={formActionBio}>
                        <textarea name="bio" className="border rounded mt-1 min-h-[150px] px-3 py-2 text-sm ring-offset-background w-full resize-none" ></textarea>
                        <div className="col-start-1 ">
                            <Button className="h-fit my-1">Save</Button>
                        </div>
                        <div className="my-1 h-6 ">
                            {stateBio?.success === false ? <span className="text-rose-800 italic text-sm">{stateBio?.message}</span> : <span className="text-lime-600 italic text-sm">
                                {stateBio?.message}
                            </span>}
                        </div>
                    </form>
                </div>
                <p className="text-lg font-semibold">Social accounts</p>
                <form action={formActionContact}>
                    <div className="my-2 ">
                        <Github />
                        <input type="text" name="github" className="my-4 italic text-sm h-9 w-full lg:w-2/4 px-1 border rounded" placeholder="your github name " />
                        <X />
                        <input type="text" name="x" className="my-4 italic text-sm h-9 w-full lg:w-2/4 px-1 border rounded" placeholder="@your twitter name" />
                    </div>
                    <div className="col-start-1 my-1">
                        <Button className="h-fit">Save</Button>
                    </div>
                    <div className="my-1 h-6 ">
                        {stateContact?.success === false ? <span className="text-rose-800 italic text-sm">{stateContact?.message}</span> : <span className="text-lime-600 italic text-sm">
                            {stateContact?.message}
                        </span>}
                    </div>
                </form>
            </div>
        </div>
    )
}