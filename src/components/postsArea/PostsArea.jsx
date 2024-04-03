import { getPosts } from "@/utils/data"
import PostCard from "../postCard/PostCard"
import Link from "next/link"
import { Button } from "../ui/button"

export default async function PostsArea({ numberOfItems, skipSetItems, pageNumber }) {
    const fetchPost = await getPosts({ numberOfItems, skipSetItems })
    const data = fetchPost.post
    return (
        <div className="">
            <PostCard data={data}></PostCard>
            <Link href={pageNumber === 1 ? "" : `/home/?page=${pageNumber - 1}`} >
                <Button className="bg-sky-500" >&lt;</Button>
            </Link>

            <Link href={pageNumber === data.totalPage ? "" : `/home/?page=${pageNumber + 1}`}>
                <Button className="bg-sky-500" disabled={pageNumber === data.totalPage ? true : false}>&gt;</Button>
            </Link>
        </div>
    )
}