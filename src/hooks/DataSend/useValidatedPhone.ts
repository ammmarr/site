import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
function validatedPhone(data: any): Promise<any> {
	const lang = localStorage.getItem("i18nextLng");
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/forget-password`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": lang,
			},
		},
	);
}

export const useValidatePhone = () => {
	return useMutation("addLoginData", validatedPhone, {
		onSuccess: async data => {
			await localStorage.setItem("phone", data?.data?.data?.mobile);
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;

			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};
