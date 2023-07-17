import { closeModal } from "../deleteModalStore";

function DeleteModal({
	show,
	onConfirmClick,
}: {
	show: boolean;
	onConfirmClick: () => void;
}) {
	if (!show) {
		return <></>;
	}

	return (
		<div className="fixed z-20 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
			<div className="w-11/12 p-6 bg-white rounded-lg opacity-100 md:w-96">
				<h3 className="text-xl font-bold">Delete comment</h3>
				<p className="mt-4">
					Are you sure you want to delete this comment? This will
					remove the comment and can't be undone.
				</p>
				<div className="flex flex-row gap-4 mt-4">
					<button
						className="px-5 py-3 text-white uppercase rounded-md bg-grayish-blue hover:bg-light-grayish-blue"
						onClick={() => closeModal()}
					>
						No, cancel
					</button>
					<button
						className="px-6 py-3 text-white uppercase rounded-md bg-soft-red hover:bg-pale-red"
						onClick={() => {
							closeModal();
							onConfirmClick();
						}}
					>
						Yes, delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteModal;
