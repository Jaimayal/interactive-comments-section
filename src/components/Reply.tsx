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
		<section className="pl-6 w-full">
			{replyComponent}
		</section>
	);
}

export default Reply;
