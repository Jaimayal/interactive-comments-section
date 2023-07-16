import type { Reply } from "../types";
import CommentFooter from "./CommentFooter";
import CommentHeader from "./CommentHeader";

interface CommentReplyProps {
	reply: Reply;
}

function CommentReply({ reply }: CommentReplyProps) {
	return (
		<section className="ml-6 border-l-4 border-light-gray w-full">
			<div className="flex flex-col w-full p-8 bg-white border-gray-300 shadow-md">
				<CommentHeader comment={reply} />
				<main className="mt-4">
					<p className="text-grayish-blue">
						<span className="text-moderate-blue font-semibold">
							@{reply.replyingTo}&nbsp;
						</span>
						{reply.content}
					</p>
				</main>
				<CommentFooter comment={reply} />
			</div>
		</section>
	);
}

export default CommentReply;
