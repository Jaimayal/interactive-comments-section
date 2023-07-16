import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $currentUser, replyComment } from "../commentsStore";
import type { CommentType, Reply } from "../types";
import ScoreButtonGroup from "./ScoreButtonGroup";

interface CommentFooterProps {
	comment: CommentType | Reply;
	onLikeClick: () => void;
	onDislikeClick: () => void;
}

function CommentFooter({
	comment,
	onLikeClick,
	onDislikeClick,
}: CommentFooterProps) {
	const currentUser = useStore($currentUser);
	const [replying, setReplying] = useState(false);
	const [reply, setReply] = useState("");

	const onReplyClick = () => {
		setReplying(!replying);
	};

	const onSendReplyClick = () => {
		replyComment(comment, reply);
		setReplying(false);
		setReply("");
	};

	if (replying) {
		return (
			<>
				<footer className="flex flex-row mt-4 justify-between">
					<ScoreButtonGroup
						score={comment.score}
						likeComment={onLikeClick}
						dislikeComment={onDislikeClick}
					/>
					<div className="flex items-center justify-end">
						<button
							className="group text-light-grayish-blue font-semibold"
							onClick={onReplyClick}
						>
							<svg
								width="14"
								height="13"
								xmlns="http://www.w3.org/2000/svg"
								className="inline mr-2"
							>
								<path
									d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
									className="fill-light-grayish-blue"
								/>
							</svg>
							<span className="select-none">Reply</span>
						</button>
					</div>
				</footer>
				<section className="flex flex-col w-full bg-white mt-2">
					<textarea
						className="p-4 placeholder:text-grayish-blue border-light-grayish-blue focus-visible:outline-moderate-blue focus-visible:outline-1"
						placeholder="Add a comment..."
						onChange={(e) => setReply(e.target.value)}
						defaultValue={`@${comment.user.username} `}
					></textarea>
					<div className="flex flex-row items-center mt-4 justify-between">
						<img
							className="w-10 h-10 mr-3 rounded-full"
							src={currentUser.image.png}
						/>
						<button
							className="rounded-md bg-moderate-blue uppercase text-white py-3 px-6 hover:bg-light-grayish-blue"
							onClick={onSendReplyClick}
						>
							send
						</button>
					</div>
				</section>
			</>
		);
	}

	return (
		<footer className="flex flex-row mt-4 justify-between">
			<ScoreButtonGroup
				score={comment.score}
				likeComment={onLikeClick}
				dislikeComment={onDislikeClick}
			/>
			<div className="flex items-center justify-end">
				<button
					className="group text-moderate-blue font-semibold hover:text-light-grayish-blue"
					onClick={onReplyClick}
				>
					<svg
						width="14"
						height="13"
						xmlns="http://www.w3.org/2000/svg"
						className="inline mr-2"
					>
						<path
							d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
							fill="#5357B6"
							className="group-hover:fill-light-grayish-blue"
						/>
					</svg>
					<span className="select-none">Reply</span>
				</button>
			</div>
		</footer>
	);
}

export default CommentFooter;
