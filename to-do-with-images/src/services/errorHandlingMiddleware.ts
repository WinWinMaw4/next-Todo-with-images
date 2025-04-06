import { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import isOnline from "is-online";

let offlineErrorShown = false;

const errorHandlingMiddleware: Middleware = () => (next) => async (action) => {
	if (isRejectedWithValue(action)) {
		// const errorMessage = action.payload?.message || "An error occur red";
		const errorMessage = action.error.message || "An error occur red";


		try {
			const online = await isOnline();
			if (!online && !offlineErrorShown) {
				toast.error("No internet connection");
				offlineErrorShown = true; // Set flag to true to prevent duplicate messages
			} else if (online) {
				// Reset the flag if onlineှ
				offlineErrorShown = false;

				// Handle specific error messages or status codes here if needed
				// switch (action.payload?.originalStatus) {
				// 	case 404:
				// 		// alert("Resource not found")
				// 		toast.error("Resource not found");
				// 		break;
				// 	case 500:
				// 		toast.error("Server error, please try again later");
				// 		break;
				// 	default:
				// 		toast.error(errorMessage);
				// 		break;
				// }
			}
		} catch (error) {
			console.error("Error checking internet connection:", error);
			// Fallback handling in case of an error while checking online status
			toast.error("An error occurred while checking internet connection");
		}
	}

	return next(action);
};

export default errorHandlingMiddleware;
