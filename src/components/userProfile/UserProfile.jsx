import Link from "next/link";
import Tab from "../tab/Tab";
import { Button } from "../ui/button";

export default function UserProfile({ username, pfp, createdAt, posts, bio, contact }) {
	const contents = posts.map(post => post.content);
	const github = contact.github;
	const twitter = contact.twitter;
	return (
		<div className="grid grid-cols-12  ">
			<div className="col-start-4 mt-24 border rounded-tl-lg rounded-br-lg">
				<img src={pfp} alt="" width={200} className="rounded-2xl " />
			</div>
			<div className="col-start-5 col-span-2 mt-28 ml-10  ">
				<p className="mb-4 underline italic">{username}</p>
				<Button variant="secondary">
					<Link href="/profile/settings">Setting</Link>
				</Button>

				<p className="text-sm mt-4">Joined: {createdAt}</p>
			</div>
			<div className="col-span-6 col-start-4 mt-12" >
				<Tab bio={bio} posts={contents} github={github} twitter={twitter} username={username} />
			</div>
		</div>
	)
}

