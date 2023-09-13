import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { sendContact } from "api";

export const useContactData = async () => {
	const { t } = useTranslation();
	return await useMutation("contact", sendContact, {
		onSuccess: () => {
			toast.success(t("successSending"));
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;
			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};
