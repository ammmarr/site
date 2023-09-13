import i18next from "i18next";
import { toast } from "react-toastify";

export const ChangeLanguageDocumentAttributes = () => {
	document.documentElement.dir = i18next.dir();
	document.documentElement.lang = i18next.language;
};
export const ChangeLanguage = (langKey: "ar" | "en") => {
	i18next
		.changeLanguage(langKey)
		.then(() => ChangeLanguageDocumentAttributes());
};
export const showApiErrorMessages = (response: any) => {
	for (const error in response) {
		toast.error(response[error]);
	}
	// response.errorMessages.forEach((errorMessage: any) => {
	//   toast.error(errorMessage);
	// });
};
