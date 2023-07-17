import { useRef } from "react";

export default function usePrettyDate(createdAt: string): string {
    const now = new Date();
	const date = new Date(createdAt);

	const difference = new Date(now.getTime() - date.getTime());

	const stringDifference = useRef("");
	const differenceYears = difference.getUTCFullYear() - 1970;
	const differenceMonths = difference.getUTCMonth();
	const differenceDays = difference.getUTCDate() - 1;

	if (differenceYears > 0) {
		if (differenceYears === 1) {
			stringDifference.current = `1 year ago`;
		} else {
			stringDifference.current = `${differenceYears} years ago`;
		}
	} else if (differenceMonths > 0) {
		if (differenceMonths === 1) {
			stringDifference.current = `1 month ago`;
		} else {
			stringDifference.current = `${differenceMonths} months ago`;
		}
	} else if (differenceDays > 0) {
		if (differenceDays === 1) {
			stringDifference.current = `1 day ago`;
		} else {
			stringDifference.current = `${differenceDays} days ago`;
		}
	} else {
		stringDifference.current = "Today";
	}

    return stringDifference.current
}