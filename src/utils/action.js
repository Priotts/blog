'use server'

import { signIn, signOut } from "./auth"

export const handleGitHubLogin = async () => {
    await signIn('github')
}

export const handleLogOut =async () =>{
    await signOut("")
}