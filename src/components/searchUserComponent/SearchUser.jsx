"use client"

import { searchUser } from "@/utils/action"
import { useState, useEffect } from "react"
import { Input } from "../ui/input"

export default function SearchUser(){
    const [data, setData] = useState("")
    const [user, setUser] = useState(null)
 
    return(
        <>
            <Input placeholder="Search user..." className="mb-4"   />
        </>
    )
}