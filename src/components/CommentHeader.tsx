import { useStore } from "@nanostores/react";
import { $currentUser } from "../commentsStore";
import type { CommentType, Reply } from "../types";
import CrudButtonGroup from "./CrudButtonGroup";
import { useRef } from "react";
import usePrettyDate from "../hooks/usePrettyDate";

interface CommentHeaderProps {
	comment: CommentType | Reply;
	buttonGroup: React.ReactNode;
}

function CommentHeader({ comment, buttonGroup }: CommentHeaderProps) {
	const currentUser = useStore($currentUser);
	const date = usePrettyDate(comment.createdAt)

	if (currentUser.username === comment.user.username) {
		return (
			<header className="flex flex-row items-center justify-start">
				<img
					className="w-10 h-10 mr-3 rounded-full"
					src={comment.user.image.png}
				/>
				<h4 className="mr-3 font-bold text-black">
					{comment.user.username}
				</h4>
				<h6 className="px-2 mr-3 text-white lowercase rounded-sm bg-moderate-blue">
					you
				</h6>
				<p className="text-gray-500">{date}</p>
				<div className="hidden md:block md:flex-grow md:justify-end">
					{buttonGroup}
				</div>
			</header>
		);
	}

	return (
		<header className="flex flex-row items-center justify-start">
			<img
				className="w-10 h-10 mr-3 rounded-full"
				src={comment.user.image.png}
			/>
			<h4 className="mr-3 font-bold text-black">
				{comment.user.username}
			</h4>
			<p className="text-gray-500">{date}</p>
			<div className="hidden md:block md:flex-grow md:justify-end">
				{buttonGroup}
			</div>
		</header>
	);
}

export default CommentHeader;
