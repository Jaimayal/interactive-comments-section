import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";
import type { CommentType, Reply, User } from "./types";

const initialUserState: User = {
	image: {
		png: "./images/avatars/image-juliusomo.png",
		webp: "./images/avatars/image-juliusomo.webp",
	},
	username: "juliusomo",
};

const initialCommentsState: CommentType[] = [
	{
		id: 1,
		content:
			"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
		createdAt: "1 month ago",
		score: 12,
		user: {
			image: {
				png: "./images/avatars/image-amyrobson.png",
				webp: "./images/avatars/image-amyrobson.webp",
			},
			username: "amyrobson",
		},
		replies: [],
	},
	{
		id: 2,
		content:
			"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
		createdAt: "2 weeks ago",
		score: 5,
		user: {
			image: {
				png: "./images/avatars/image-maxblagun.png",
				webp: "./images/avatars/image-maxblagun.webp",
			},
			username: "maxblagun",
		},
		replies: [
			{
				id: 3,
				content:
					"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
				createdAt: "1 week ago",
				score: 4,
				replyingTo: "maxblagun",
				user: {
					image: {
						png: "./images/avatars/image-ramsesmiron.png",
						webp: "./images/avatars/image-ramsesmiron.webp",
					},
					username: "ramsesmiron",
				},
			},
			{
				id: 4,
				content:
					"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
				createdAt: "2 days ago",
				score: 2,
				replyingTo: "ramsesmiron",
				user: {
					image: {
						png: "./images/avatars/image-juliusomo.png",
						webp: "./images/avatars/image-juliusomo.webp",
					},
					username: "juliusomo",
				},
			},
		],
	},
];

export const $currentUser = atom(initialUserState);
// export const $comments = deepMap(initialCommentsState);
export const $comments = persistentAtom<CommentType[]>(
	"comments",
	initialCommentsState,
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	}
);
export function likeComment(commentId: number) {
	const comments = $comments.get();

	const comment = comments.find((comment) => comment.id === commentId);
	if (comment) {
		comment.score += 1;
		$comments.set([...comments]);
		return;
	}

	comments.forEach((comment) => {
		const reply = comment.replies.find((reply) => reply.id === commentId);

		if (reply) {
			reply.score += 1;
		}
	});
	$comments.set([...comments]);
}
export function dislikeComment(commentId: number) {
	const comments = $comments.get();

	const comment = comments.find((comment) => comment.id === commentId);
	if (comment) {
		comment.score -= 1;
		$comments.set([...comments]);
		return;
	}

	comments.forEach((comment) => {
		const reply = comment.replies.find((reply) => reply.id === commentId);

		if (reply) {
			reply.score -= 1;
		}
	});
	$comments.set([...comments]);
}
export function replyComment(toReply: CommentType | Reply, reply: Reply) {
	const comments = $comments.get();

	const comment = comments.find((comment) => comment.id === toReply.id);
	if (comment) {
		comment.replies.push(reply);
		$comments.set([...comments]);
		return;
	}

	comments.forEach((comment) => {
		const isReply = comment.replies.find(
			(reply) => reply.id === toReply.id
		);
		if (isReply) {
			comment.replies.push(reply);
		}
	});
	$comments.set([...comments]);
}
export function addComment(comment: CommentType) {
	$comments.set([...$comments.get(), comment]);
}