import { useEffect, useRef, useState } from "react";
import { editComment } from "../commentsStore";
import { openModal } from "../deleteModalStore";
import type { CommentType, Reply } from "../types";
import CommentHeader from "./CommentHeader";
import CrudButtonGroup from "./CrudButtonGroup";
import ScoreButtonGroup from "./ScoreButtonGroup";

function CommentCurrentUser({ comment }: { comment: CommentType | Reply }) {
	const [isEditing, setIsEditing] = useState(false);
	const [newContent, setNewContent] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "0px";
			const scrollHeight = textAreaRef.current.scrollHeight;
			textAreaRef.current.style.height = scrollHeight + "px";
		}
	}, [textAreaRef.current, newContent]);

	const onDeleteClick = () => {
		openModal(comment.id);
	};

	const onEditClick = () => {
		setIsEditing(true);
		setNewContent(comment.content);
	};

	const onSaveEditClick = () => {
		editComment(comment.id, newContent);
		setIsEditing(false);
		setNewContent("");
	};

	let content = null;
	if ((comment as Reply).replyingTo !== undefined) {
		const reply = comment as Reply;
		content = (
			<>
				<span className="text-moderate-blue font-bold">
					@{reply.replyingTo}&nbsp;
				</span>
				{reply.content}
			</>
		);
	} else {
		content = <>{comment.content}</>;
	}

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
						ref={textAreaRef}
					></textarea>
				</main>
				<footer className="flex flex-row mt-4 justify-between">
					<ScoreButtonGroup
						score={comment.score}
						commentId={comment.id}
					/>
					<div className="flex items-center justify-end gap-4">
						<button
							className="rounded-md bg-moderate-blue uppercase text-white py-3 px-6 hover:bg-light-grayish-blue"
							onClick={() => onSaveEditClick()}
						>
							<span className="select-none">Update</span>
						</button>
					</div>
				</footer>
			</div>
		);
	}

	return (
		<div className="flex flex-col w-full p-8 bg-white border-gray-300 shadow-md">
			<CommentHeader comment={comment} />
			<main className="mt-4">{content}</main>
			<footer className="flex flex-row mt-4 justify-between">
				<ScoreButtonGroup
					score={comment.score}
					commentId={comment.id}
				/>
				<CrudButtonGroup
					onDeleteClick={onDeleteClick}
					onEditClick={onEditClick}
				/>
			</footer>
		</div>
	);
}

export default CommentCurrentUser;
