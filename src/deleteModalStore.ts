import { atom } from "nanostores";

export const $toDeleteId = atom(0);
export const $isModalOpen = atom(false);

export function openModal(commentId: number) {
    $toDeleteId.set(commentId);
    $isModalOpen.set(true);
}

export function closeModal() {
    $isModalOpen.set(false);
}