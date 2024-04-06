import { Home, LogIn, Info, LogOut, User } from 'lucide-react';
import { auth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { handleLogOut } from '@/utils/action';
import { getUserById } from '@/utils/data';

export default async function Menu() {
    const session = await auth()
    let sessionUser
    !session ? null : sessionUser = await getUserById(session.user._id)
    // const sessionUser = await getUserById(session.user._id)

    console.log(sessionUser)

    return (
        <div className='flex justify-around items-center w-full h-full '>
            {!session ?
                <>
                    <Button variant="outline" size="icon">
                        <Link href="/">
                            <Home />
                        </Link>
                    </Button>
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
                        <Link href="/home">
                            <Home />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                        <Link href={`/profile/${sessionUser}`}>
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
