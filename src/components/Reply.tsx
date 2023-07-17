import { useStore } from "@nanostores/react";
import { $currentUser } from "../commentsStore";
import type { Reply } from "../types";
import CommentCurrentUser from "./CommentCurrentUser";
import CommentOtherUser from "./CommentOtherUser";

function Reply({ reply }: { reply: Reply }) {
	const currentUser = useStore($currentUser);

	const replyComponent =
		currentUser.username === reply.user.username ? (
			<CommentCurrentUser comment={reply} />
		) : (
			<CommentOtherUser comment={reply} />
		);

	return (
		<section
			className="ml-3 border-l-gray-200 border-l-2"
			style={{ width: "calc(100% - 0.75rem)" }}
		>
			<div className="pl-2">{replyComponent}</div>
		</section>
	);
}

export default Reply;
