import { auth, signIn } from "@/utils/auth"

export default async function Login() {
    const session = await auth()
    console.log(session)
    const handleGitHubLogin = async() =>{
        "use server"
        await signIn("github")
    }
    return (
        <form action={handleGitHubLogin}>
            <p>Test</p>
            <button className="border ">Login with github</button>
        </form>
    )
}