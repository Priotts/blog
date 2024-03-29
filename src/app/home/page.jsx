import SearchUser from "@/components/searchUserComponent/SearchUser";
import Users from "@/components/users/Users";

export default function Home() {
    return (
        <div className="grid grid-cols-12 gap-4 ">
            <div className="col-start-2 col-span-2  ">
                <SearchUser></SearchUser>
                <Users></Users>
            </div>
        </div>
    )
}