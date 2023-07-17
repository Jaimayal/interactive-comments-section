import type { CommentType, Reply } from "../types";
import CommentHeader from "./CommentHeader";
import ScoreButtonGroup from "./ScoreButtonGroup";

interface CommentCommonProps {
	comment: CommentType | Reply;
	headerButtonGroup: React.ReactNode;
	footerButtonGroup: React.ReactNode;
	mainContent: React.ReactNode;
	children?: React.ReactNode;
}

function CommentCommon({
	comment,
	headerButtonGroup,
	footerButtonGroup,
	mainContent,
	children,
}: CommentCommonProps) {
	console.log(headerButtonGroup);
	return (
		<div className="flex flex-col w-full p-8 break-words bg-white border-gray-300 shadow-md">
			<div className="flex flex-row">
				<div className="hidden mr-4 md:block">
					<ScoreButtonGroup
						score={comment.score}
						commentId={comment.id}
					/>
				</div>
				<div
					className="flex flex-col w-full"
					style={{ maxWidth: "calc(100% - 43px)" }}
				>
					<CommentHeader
						comment={comment}
						buttonGroup={headerButtonGroup}
					/>
					<main className="max-w-full mt-4">{mainContent}</main>
				</div>
			</div>
			<footer className="flex flex-row justify-between mt-4 md:hidden">
				<ScoreButtonGroup
					score={comment.score}
					commentId={comment.id}
				/>
				{footerButtonGroup}
			</footer>
			{children}
		</div>
	);
}

export default CommentCommon;
