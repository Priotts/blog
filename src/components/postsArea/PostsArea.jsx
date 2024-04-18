import { getPosts } from "@/utils/data"
import PostCard from "../postCard/PostCard"
import Link from "next/link"
import { Button } from "../ui/button"

export default async function PostsArea({ numberOfItems, skipSetItems, pageNumber }) {
    const fetchPost = await getPosts({ numberOfItems, skipSetItems })
    const data = fetchPost.post
    const totPage = fetchPost.totalPage

    return (
        <div className="">
            <PostCard data={data}></PostCard>
            <div className="flex justify-center">
                {totPage > 1 && (
                    <div className="flex justify-around lg:w-2/3 w-fit ">
                        <Link href={pageNumber === 1 ? "" : `/home/?page=${pageNumber - 1}`} >
                            <Button className="bg-sky-500" disabled={pageNumber === 1}>&lt; Previous</Button>
                        </Link>
                        <Link href={pageNumber === totPage ? "" : `/home/?page=${pageNumber + 1}`}>
                            <Button className="bg-sky-500" disabled={pageNumber === totPage}>Next &gt; </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}