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
import { openModal } from "../deleteModalStore"
function CommentCommon({ comment, children }: { comment: CommentType | Reply, children: React.ReactNode }) {
	const currentUser = useStore($currentUser);

	const onLikeClick = () => {
		likeComment(comment.id);
	};

	const onDislikeClick = () => {
		dislikeComment(comment.id);
	};

	const onDeleteClick = () => {
        openModal(comment.id);
	};

	const onSaveEditClick = (message: string) => {
		editComment(comment.id, message);
	};
    
	return (
		<div className="flex flex-col w-full p-8 bg-white border-gray-300 shadow-md">
			<CommentHeader comment={comment} />
			<main className="mt-4">
				<p>
                    {children}
                </p>
			</main>
			{currentUser.username === comment.user.username ? (
				<CommentUserFooter
					comment={comment}
					onDislikeClick={onDislikeClick}
					onLikeClick={onLikeClick}
					onDeleteClick={onDeleteClick}
					onSaveEditClick={onSaveEditClick}
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
