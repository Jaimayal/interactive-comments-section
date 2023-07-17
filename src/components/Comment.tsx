import { useStore } from "@nanostores/react";
import { $currentUser } from "../commentsStore";
import type { CommentType } from "../types";
import CommentCurrentUser from "./CommentCurrentUser";
import CommentOtherUser from "./CommentOtherUser";
import Reply from "./Reply";

interface CommentProps {
	comment: CommentType;
}

function Comment({ comment }: CommentProps) {
	const currentUser = useStore($currentUser);

	const commentComponent =
		currentUser.username === comment.user.username ? (
			<CommentCurrentUser comment={comment} />
		) : (
			<CommentOtherUser comment={comment} />
		)

	return (
		<>
			{commentComponent}
			<section
				className="flex flex-col ml-3 border-l-gray-300 border-l-2 md:ml-6 md:gap-6"
			>
				{comment.replies.map((reply) => (
					<Reply key={reply.id} reply={reply} />
				))}
			</section>
		</>
	);
}

export default Comment;
