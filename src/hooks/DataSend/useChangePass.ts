import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "i18n";

function changePass(data: any): Promise<any> {
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/login`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
			},
		},
	);
}
export const useChangePass = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const path = sessionStorage.getItem("path");
	return useMutation("changePass",changePass , {
		onSuccess:  data => {
			toast.success("change password done");
            navigate(-1)
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;

			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};