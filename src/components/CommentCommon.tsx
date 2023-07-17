import { useStore } from "@nanostores/react";
import {
	$currentUser,
	likeComment,
	dislikeComment,
	deleteComment,
	editComment,
} from "../commentsStore";
import CommentFooter from "./CommentFooter";
import CommentHeader from "./CommentHeader";
import CommentUserFooter from "./CommentUserFooter";
import type { CommentType, Reply } from "../types";
import { openModal } from "../deleteModalStore";
import { useState } from "react";
import CommentSaveEditFooter from "./CommentSaveEditFooter";
function CommentCommon({
	comment,
	children,
}: {
	comment: CommentType | Reply;
	children: React.ReactNode;
}) {
	const currentUser = useStore($currentUser);
	const [isEditing, setIsEditing] = useState(false);
	const [newContent, setNewContent] = useState("");
	const onLikeClick = () => {
		likeComment(comment.id);
	};

	const onDislikeClick = () => {
		dislikeComment(comment.id);
	};

	const onDeleteClick = () => {
		openModal(comment.id);
	};

	const onSaveEditClick = () => {
		editComment(comment.id, newContent);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<div className="flex flex-col w-full p-8 bg-white border-gray-300 shadow-md">
				<CommentHeader comment={comment} />
				<main className="mt-4">
					<textarea
						className="w-full placeholder:text-grayish-blue border-light-grayish-blue focus-visible:outline-moderate-blue focus-visible:outline-1"
						placeholder="Add a comment..."
						onChange={(e) => setNewContent(e.target.value)}
						defaultValue={comment.content}
					></textarea>
				</main>
				<CommentSaveEditFooter
					comment={comment}
					onSaveEdit={onSaveEditClick}
					onDislikeClick={onDislikeClick}
					onLikeClick={onLikeClick}
				/>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full p-8 bg-white border-gray-300 shadow-md">
			<CommentHeader comment={comment} />
			<main className="mt-4">
				<p>{children}</p>
			</main>
			{currentUser.username === comment.user.username ? (
				<CommentUserFooter
					comment={comment}
					onDislikeClick={onDislikeClick}
					onLikeClick={onLikeClick}
					onDeleteClick={onDeleteClick}
					setEditing={setIsEditing}
				/>
			) : (
				<CommentFooter
					comment={comment}
					onDislikeClick={onDislikeClick}
					onLikeClick={onLikeClick}
				/>
			)}
		</div>
	);
}

export default CommentCommon;
