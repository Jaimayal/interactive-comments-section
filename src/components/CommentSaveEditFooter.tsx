import { useState } from "react";
import type { CommentType, Reply } from "../types";
import ScoreButtonGroup from "./ScoreButtonGroup";

interface CommentSaveEditFooterProps {
	comment: CommentType | Reply;
	onLikeClick: () => void;
	onDislikeClick: () => void;
	onSaveEdit: () => void;
}
function CommentSaveEditFooter({
	comment,
	onLikeClick,
	onDislikeClick,
    onSaveEdit,
}: CommentSaveEditFooterProps) {
	return (
		<footer className="flex flex-row mt-4 justify-between">
			<ScoreButtonGroup
				score={comment.score}
				likeComment={onLikeClick}
				dislikeComment={onDislikeClick}
			/>
			<div className="flex items-center justify-end gap-4">
				<button className="rounded-md bg-moderate-blue uppercase text-white py-3 px-6 hover:bg-light-grayish-blue" onClick={() => onSaveEdit()}>
					<span className="select-none">Update</span>
				</button>
			</div>
		</footer>
	);
}

export default CommentSaveEditFooter;
