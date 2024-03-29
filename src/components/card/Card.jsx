export default function Card({ users }) {
    // console.log(users)
    return (
        <div className=" ">
            
            {users.map((user, index) => (
                <div key={index} className="flex py-4 border-y">
                    <div>
                        <img src={user.pfp} alt="" width={35} className="rounded" />
                    </div>
                    <div className="text-xl">
                        {user.username}
                    </div>
                </div>
            ))}
        </div>
    )
}