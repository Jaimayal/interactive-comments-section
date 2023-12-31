import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $currentUser, replyComment } from "../commentsStore";
import type { CommentType, Reply } from "../types";
import CommentCommon from "./CommentCommon";
import ReplyButtonGroup from "./ReplyButtonGroup";

function CommentOtherUser({ comment }: { comment: CommentType | Reply }) {
	const currentUser = useStore($currentUser);
	const [isReplying, setIsReplying] = useState(false);
	const [reply, setReply] = useState("");

	const onReplyClick = () => {
		setIsReplying(true);
	};

	const onSendReplyClick = () => {
		replyComment(comment, reply);
		setIsReplying(false);
		setReply("");
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

	if (isReplying) {
		return (
			<CommentCommon
				comment={comment}
				headerButtonGroup={
					<ReplyButtonGroup onReplyClick={onReplyClick} />
				}
				footerButtonGroup={
					<>
						<button
							className="font-semibold group text-light-grayish-blue"
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
					</>
				}
				mainContent={<>{content}</>}
			>
				<section className="flex flex-col w-full mt-2 bg-white">
					<textarea
						className="p-4 placeholder:text-grayish-blue border-light-grayish-blue focus-visible:outline-moderate-blue focus-visible:outline-1"
						placeholder="Add a comment..."
						onChange={(e) => setReply(e.target.value)}
						defaultValue={`@${comment.user.username} `}
					></textarea>
					<div className="flex flex-row items-center justify-between mt-4">
						<img
							className="w-10 h-10 mr-3 rounded-full"
							src={currentUser.image.png}
						/>
						<button
							className="px-6 py-3 text-white uppercase rounded-md bg-moderate-blue hover:bg-light-grayish-blue"
							onClick={onSendReplyClick}
						>
							send
						</button>
					</div>
				</section>
			</CommentCommon>
		);
	}

	return (
		<CommentCommon
			comment={comment}
			headerButtonGroup={<ReplyButtonGroup onReplyClick={onReplyClick} />}
			footerButtonGroup={<ReplyButtonGroup onReplyClick={onReplyClick} />}
			mainContent={<>{content}</>}
		/>
	);
}

export default CommentOtherUser;
