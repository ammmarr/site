import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
function validatedOtp(data: any): Promise<any> {
	const lang = localStorage.getItem("i18nextLng");
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/validate-otp`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": lang,
			},
		},
	);
}

export const useValidateOtp = () => {
	return useMutation("validatedOtp", validatedOtp, {
		onSuccess: async data => {
			await localStorage.setItem("phone", data?.data?.data?.mobile);
			toast.success("OTP Verified Successfully");
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;

			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};
