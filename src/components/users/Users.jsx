
import { getUser } from "@/utils/data"
import Card from "../card/Card"
import Link from "next/link"
import { Button } from "../ui/button"

export default async function Users({ numberOfItems, skipSetItems, pageNumber }) {
    const users = await getUser({ numberOfItems, skipSetItems })
    return (
        <div className="">
            <Card users={users.data}></Card>
            <div className="flex my-5 justify-around items-center gap-5">

                <Link href={pageNumber === 1 ? "" : `/home/?page=${pageNumber - 1}`} >
                    <Button className="bg-sky-500" >&lt;</Button>
                </Link>

                <Link href={pageNumber === users.totalPage ? "" :`/home/?page=${pageNumber + 1}`}>
                    <Button className="bg-sky-500" disabled={pageNumber === users.totalPage ? true : false}>&gt;</Button>
                </Link>
            </div>
        </div>
    )
}