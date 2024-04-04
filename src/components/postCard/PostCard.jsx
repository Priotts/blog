import Link from "next/link";

export default function PostCard({ data }) {

    return (
        <div>
            {data.map((post, index) => (
                <div className="flex items-center border rounded-tl-lg rounded-br-lg mb-4 w-full" key={index}>
                    <div className="my-4 mx-4">
                        <img src={post.users[0].pfp} alt="Picture of the author" width={45}
                            height={40}></img>
                    </div>
                    <div className="w-full">
                        <div className="mt-4">
                            <Link href={""} className="font-bold">
                                {post.users[0].username}
                            </Link>
                        </div>
                        <div className="w-full mb-4 mt-1">
                            {post.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}