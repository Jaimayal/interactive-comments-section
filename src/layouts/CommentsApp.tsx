import { useStore } from "@nanostores/react";
import { $comments, $currentUser, addComment } from "../commentsStore";
import Comment from "../components/Comment";
import { useEffect, useState } from "react";
import type { CommentType } from "../types";
function CommentsApp() {
	const [comments, setComments] = useState<CommentType[]>([]);
	const localComments = useStore($comments);
	const [newComment, setNewComment] = useState<string>("");
	const currentUser = useStore($currentUser);

	useEffect(() => {
		setComments(localComments);
	}, [localComments])

	const onSendCommentClick = () => {
		const comment: CommentType = {
			id: Math.round(Math.random() * 10000000),
			content: newComment,
			user: currentUser,
			createdAt: "Now",
			replies: [],
			score: 0,
		};
		addComment(comment);
	};

	return (
		<>
			<main className="flex flex-col items-center justify-center flex-grow">
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</main>
			<section className="flex flex-col w-full p-8 bg-white">
				<textarea
					className="p-4 placeholder:text-grayish-blue border-light-grayish-blue focus-visible:outline-moderate-blue focus-visible:outline-1"
					placeholder="Add a comment..."
					onChange={(e) => setNewComment(e.target.value)}
				></textarea>
				<div className="flex flex-row items-center mt-4 justify-between">
					<img
						className="w-10 h-10 mr-3 rounded-full"
						src={currentUser.image.png}
					/>
					<button
						className="rounded-md bg-moderate-blue uppercase text-white py-3 px-6 hover:bg-light-grayish-blue"
						onClick={onSendCommentClick}
					>
						send
					</button>
				</div>
			</section>
		</>
	);
}

export default CommentsApp;
