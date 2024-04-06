import Link from "next/link";

export default function PostCard({ data }) {

    return (
        <div>
            {data.map((post, index) => (
                <div className="flex flex-col lg:flex-row items-center border rounded-tl-lg rounded-br-lg mb-4 w-full word-break: break-all" key={index}>
                    <div className="my-4 mx-4">
                        <Link href={`/profile/${post.users[0].username}`} prefetch={false}>
                            <img src={post.users[0].pfp} alt="Picture of the author" width={45}
                                height={40}></img>
                        </Link>
                    </div>
                    <div className="w-full">
                        <div className="lg:mt-4 ml-4">
                            <Link href={`/profile/${post.users[0].username}`} className="font-bold text-lg" prefetch={false}>
                                {post.users[0].username}
                            </Link>
                        </div>
                        <div className="w-fit mb-4 mt-1 mx-4 overflow-auto ">
                            {post.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}