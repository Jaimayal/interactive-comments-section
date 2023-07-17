import { useEffect, useRef, useState } from "react";
import { editComment } from "../commentsStore";
import { openModal } from "../deleteModalStore";
import type { CommentType, Reply } from "../types";
import CommentHeader from "./CommentHeader";
import CrudButtonGroup from "./CrudButtonGroup";
import ScoreButtonGroup from "./ScoreButtonGroup";
import CommentCommon from "./CommentCommon";

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
				<span className="font-bold text-moderate-blue">
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
			<CommentCommon
				comment={comment}
				headerButtonGroup={
					<CrudButtonGroup
						onDeleteClick={onDeleteClick}
						onEditClick={onEditClick}
					/>
				}
				footerButtonGroup={
					<button
						className="px-6 py-3 text-white uppercase rounded-md bg-moderate-blue hover:bg-light-grayish-blue"
						onClick={() => onSaveEditClick()}
					>
						<span className="select-none">Update</span>
					</button>
				}
				mainContent={
					<>
						<textarea
							className="w-full placeholder:text-grayish-blue border-light-grayish-blue focus-visible:outline-moderate-blue focus-visible:outline-1"
							placeholder="Add a comment..."
							onChange={(e) => setNewContent(e.target.value)}
							defaultValue={comment.content}
							ref={textAreaRef}
						></textarea>
						<div className="hidden mt-4 md:block text-end">
							<button
								className="px-6 py-3 text-white uppercase rounded-md bg-moderate-blue hover:bg-light-grayish-blue"
								onClick={() => onSaveEditClick()}
							>
								<span className="select-none">Update</span>
							</button>
						</div>
					</>
				}
			/>
		);
	}

	return (
		<CommentCommon
			comment={comment}
			headerButtonGroup={
				<CrudButtonGroup
					onDeleteClick={onDeleteClick}
					onEditClick={onEditClick}
				/>
			}
			footerButtonGroup={
				<CrudButtonGroup
					onDeleteClick={onDeleteClick}
					onEditClick={onEditClick}
				/>
			}
			mainContent={<>{content}</>}
		/>
	);
}

export default CommentCurrentUser;
