import Link from "next/link";
import Tab from "../tab/Tab";
import { Button } from "../ui/button";

export default function UserProfile({ sessionUser, username, pfp, createdAt, posts, bio, contact }) {
	const contents = posts.map(post => post.content);
	const github = contact.github;
	const twitter = contact.twitter;
	const date = createdAt.split('T')[0];
	return (
		<div className="flex flex-col items-center lg:grid lg:grid-cols-12">
			<div className="col-start-4 mt-24 border rounded-tl-lg rounded-br-lg ">
				<img src={pfp} alt="" width={200} className="rounded-2xl " />
			</div>
			<div className="lg:col-start-5 lg:col-span-2 mt-4 lg:mt-28 lg:ml-10 ">
				<p className="mb-4 underline italic">{username}</p>
				{sessionUser === username ?<Button variant="secondary">
					<Link href="/profile/settings">Setting</Link>
				</Button> : null}
				<p className="text-sm mt-4">Joined: {date}</p>
			</div>
			<div className="col-span-6 col-start-4 mt-12" >
				<Tab bio={bio} posts={contents} github={github} twitter={twitter} username={username} />
			</div>
		</div>
	)
}

