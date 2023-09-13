import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function addSignup(data: any): Promise<any> {
	const lang = localStorage.getItem("i18nextLng");
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/register`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": lang,
			},
		},
	);
}
export const useAddSignup = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	return useMutation("addSignupData", addSignup, {
		onSuccess: () => {
			toast.success(t("RegSuccess"));
			navigate("/login");
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;

			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};
