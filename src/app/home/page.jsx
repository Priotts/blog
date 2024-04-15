import CreatePost from "@/components/createPost/createPost";
import PostsArea from "@/components/postsArea/PostsArea";
import SearchUserComponent from "@/components/searchUserComponent/SearchUserComponent";

import { auth } from "@/utils/auth";
import { getUserById, userInfo } from "@/utils/data";

export default async function Home({ searchParams }) {
    const session = await auth()
    const user = await getUserById(session.user._id)
    const info = await userInfo(user)
    const pageNumber = Number(searchParams.page ?? 1)
    const numberOfItems = 5
    const skipSetItems = (pageNumber - 1) * numberOfItems
    return (
        <div className="grid grid-cols-12 gap-4 ">
            <div className="col-start-1 col-span-12 mt-4 lg:col-span-3 row-span-4 ml-4">
                <SearchUserComponent></SearchUserComponent>
            </div>
            <div className="col-start-4 col-span-6 h-fit">
                <CreatePost sessionPfp={info.pfp}></CreatePost>
            </div>
            <div className="col-start-4 col-span-6 ">
                <PostsArea numberOfItems={numberOfItems} skipSetItems={skipSetItems} pageNumber={pageNumber}/>
            </div>
        </div>
    )
}