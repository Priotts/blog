import { Github } from 'lucide-react';
import { handleGitHubLogin } from "@/utils/action";

export default async function Login() {
    return (
        <div className="grid grid-cols-12 gap-4 border">
            <Github></Github>
            <>
                <form action={handleGitHubLogin}>
                    <p>Test</p>
                    <button className="border ">Login with github</button>
                </form>
            </>
        </div>
    )
}