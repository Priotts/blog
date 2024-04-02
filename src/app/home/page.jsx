import SearchUser from "@/components/searchUserComponent/SearchUser";
import Users from "@/components/users/Users";

export default function Home({ searchParams }) {
    const pageNumber = Number(searchParams.page ?? 1)
    const numberOfItems = 2
    const skipSetItems = (pageNumber - 1) * numberOfItems
    return (
        <div className="grid grid-cols-12 gap-4 ">
            <div className="col-start-1 col-span-2 ml-4">
                <SearchUser></SearchUser>
                <Users numberOfItems={numberOfItems} skipSetItems={skipSetItems} pageNumber={pageNumber} ></Users>
            </div>
        </div>
    )
}