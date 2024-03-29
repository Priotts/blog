"use client"

import { searchUser } from "@/utils/action"
import { useState, useEffect } from "react"

export default function SearchUser(){
    const [data, setData] = useState("")
    const [user, setUser] = useState(null)
 
    return(
        <>
            <input placeholder="Search user..." className="mb-4"   />
        </>
    )
}