import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $currentUser, replyComment } from "../commentsStore";
import type { CommentType, Reply } from "../types";
import ScoreButtonGroup from "./ScoreButtonGroup";

interface ReplyButtonGroupProps {
	onReplyClick: () => void;
}

function ReplyButtonGroup({
	onReplyClick,
}: ReplyButtonGroupProps) {
	return (
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
	);
}

export default ReplyButtonGroup;
