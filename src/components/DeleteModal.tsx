import { closeModal } from "../deleteModalStore";

function DeleteModal({ show, onConfirmClick }: { show: boolean, onConfirmClick: () => void }) {
	if (!show) {
		return <></>;
	}

	return (
		<div className="fixed w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white rounded-lg w-11/12 opacity-100 p-6">
				<h3 className="font-bold text-xl">Delete comment</h3>
				<p className="mt-4">
					Are you sure you want to delete this comment? This will
					remove the comment and can't be undone.
				</p>
				<div className="flex flex-row mt-4 gap-4">
					<button
						className="rounded-md bg-grayish-blue text-white uppercase hover:bg-light-grayish-blue px-5 py-3"
						onClick={() => closeModal()}
					>
						No, cancel
					</button>
					<button
						className="rounded-md bg-soft-red text-white uppercase hover:bg-pale-red px-6 py-3"
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
