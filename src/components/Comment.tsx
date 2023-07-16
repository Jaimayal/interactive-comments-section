import type { CommentType } from "../types";
import CommentFooter from "./CommentFooter";
import CommentHeader from "./CommentHeader";
import CommentReply from "./CommentReply";

interface CommentProps {
	comment: CommentType;
}

function Comment({ comment }: CommentProps) {
	return (
		<>
			<div className="flex flex-col w-full p-8 bg-white border-gray-300 shadow-md">
				<CommentHeader comment={comment} />
				<main className="mt-4">
					<p className="text-grayish-blue">{comment.content}</p>
				</main>
				<CommentFooter comment={comment} />
			</div>
			{comment.replies.map((reply) => (
				<CommentReply key={reply.id} reply={reply} />
			))}
		</>
	);
}

export default Comment;
