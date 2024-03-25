import { Home, LogIn, Info, LogOut, User } from 'lucide-react';
import { auth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { handleLogOut } from '@/utils/action';

export default async function Menu() {
    const session = await auth()
    return (
        <div className='flex justify-around items-center w-full h-full'>
            <Button variant="outline" size="icon">
                <Link href="/">
                    <Home />
                </Link>
            </Button>
            {!session ?
                <>
                    <Button variant="outline" size="icon">
                        <Link href="info">
                            <Info />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                        <Link href="/login">
                            <LogIn />
                        </Link>
                    </Button>
                </> :
                <>
                    <Button variant="outline" size="icon">
                        <Link href="info">
                            <User />
                        </Link>
                    </Button>
                    <form action={handleLogOut}>
                        <Button variant="outline" size="icon">
                            <LogOut />
                        </Button>
                    </form>
                </>}

        </div>
    )
}
