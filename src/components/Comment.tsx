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
		);

	return (
		<>
			{commentComponent}
			{comment.replies.map((reply) => (
				<Reply key={reply.id} reply={reply} />
			))}
		</>
	);
}

export default Comment;
