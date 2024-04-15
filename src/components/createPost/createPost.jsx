"use client"

import { Button } from "../ui/button"
import { createPost } from "@/utils/action"
import { useFormState } from 'react-dom'

export default function CreatePost({ sessionPfp }) {
    const [state, formAction] = useFormState(createPost, undefined)
    return (
        <form action={formAction}>
            <div className="flex flex-col lg:flex-row my-4 items-center">
                <img src={sessionPfp} alt="pfp" width={45} height={45} className="mr-4 border rounded-tl-lg rounded-br-lg h-fit"></img>
                <textarea name="post" className="border rounded mt-1 min-h-[150px] px-3 py-2 text-sm ring-offset-background w-full resize-none " ></textarea>
                <Button variant="link" className="lg:ml-4">Post</Button>
            </div>
            <div className="flex justify-center h-6">
                {state?.success === false ? <span className="text-rose-800 italic text-sm">{state?.message}</span> : <span className="text-lime-600 italic text-sm">
                    {state?.message}
                </span>}
            </div>
        </form>
    )
}