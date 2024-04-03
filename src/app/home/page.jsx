import CreatePost from "@/components/createPost/createPost";
import PostsArea from "@/components/postsArea/PostsArea";
import SearchUser from "@/components/searchUserComponent/SearchUser";
import Users from "@/components/users/Users";
import { auth } from "@/utils/auth";

export default async function Home({ searchParams }) {
    const session = await auth()
    const pageNumber = Number(searchParams.page ?? 1)
    const numberOfItems = 5
    const skipSetItems = (pageNumber - 1) * numberOfItems
    return (
        <div className="grid grid-cols-12 gap-4 ">
            <div className="col-start-1 col-span-2 row-span-4 ml-4">
                {/* <SearchUser></SearchUser>
                <Users numberOfItems={numberOfItems} skipSetItems={skipSetItems} pageNumber={pageNumber} ></Users> */}
            </div>
            <div className="col-start-4 col-span-6 h-fit">
                <CreatePost session={session}></CreatePost>
            </div>
            <div className="col-start-4 col-span-6">
                <PostsArea numberOfItems={numberOfItems} skipSetItems={skipSetItems} pageNumber={pageNumber}/>
            </div>
        </div>
    )
}