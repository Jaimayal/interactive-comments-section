import { useStore } from "@nanostores/react";
import { $currentUser } from "../commentsStore";
import type { CommentType, Reply } from "../types";

interface CommentHeaderProps {
	comment: CommentType | Reply;
}

function CommentHeader({ comment }: CommentHeaderProps) {
	const currentUser = useStore($currentUser);

	if (currentUser.username === comment.user.username) {
		return (
			<header className="flex flex-row items-center justify-start">
				<img
					className="w-10 h-10 mr-3 rounded-full"
					src={comment.user.image.png}
				/>
				<h4 className="mr-3 font-bold text-black">
					{comment.user.username}
				</h4>
				<h6 className="px-2 mr-3 rounded-sm lowercase bg-moderate-blue text-white">
					you
				</h6>
				<p className="text-gray-500">{comment.createdAt}</p>
			</header>
		);
	}

	return (
		<header className="flex flex-row items-center justify-start">
			<img
				className="w-10 h-10 mr-3 rounded-full"
				src={comment.user.image.png}
			/>
			<h4 className="mr-3 font-bold text-black">
				{comment.user.username}
			</h4>
			<p className="text-gray-500">{comment.createdAt}</p>
		</header>
	);
}

export default CommentHeader;
