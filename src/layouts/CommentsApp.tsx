import { useStore } from "@nanostores/react";
import {
	$comments,
	$currentUser,
	addComment,
	deleteComment,
} from "../commentsStore";
import Comment from "../components/Comment";
import { useEffect, useState } from "react";
import type { CommentType } from "../types";
import DeleteModal from "../components/DeleteModal";
import { $isModalOpen, $toDeleteId } from "../deleteModalStore";
function CommentsApp() {
	const localComments = useStore($comments);
	const currentUser = useStore($currentUser);
	const [comments, setComments] = useState<CommentType[]>([]);
	const [newComment, setNewComment] = useState<string>("");
	const showDeleteModal = useStore($isModalOpen);
	const toDeleteId = useStore($toDeleteId);
	useEffect(() => {
		setComments(localComments);
	}, [localComments]);

	const onSendCommentClick = () => {
		setNewComment("");
		addComment(newComment);
	};

	const onDeleteConfirmClick = () => {
		deleteComment(toDeleteId);
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
					value={newComment}
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
			<DeleteModal
				show={showDeleteModal}
				onConfirmClick={onDeleteConfirmClick}
			/>
		</>
	);
}

export default CommentsApp;
