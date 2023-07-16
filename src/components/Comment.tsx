import type { CommentType } from "../types";
import CommentCommon from "./CommentCommon";

interface CommentProps {
	comment: CommentType;
}

function Comment({ comment }: CommentProps) {
	return (
		<>
			<CommentCommon comment={comment}>{comment.content}</CommentCommon>
			{comment.replies.map((reply) => (
				<section
					key={reply.id}
					className="pl-6 w-full"
				>
					<CommentCommon comment={reply}>
						<span className="text-moderate-blue font-semibold">
							@{reply.replyingTo}&nbsp;
						</span>
						{reply.content}
					</CommentCommon>
				</section>
			))}
		</>
	);
}

export default Comment;
