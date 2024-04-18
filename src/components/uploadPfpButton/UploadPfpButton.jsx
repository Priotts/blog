"use client"
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from "lucide-react"

export default function UploadPfpButton() {
    const { pending } = useFormStatus()

    return (
        <Button className='w-full mt-4' disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </>
            ) : "Upload"}
        </Button>
    )
}