import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function resetPassword(data: any): Promise<any> {
	const lang = localStorage.getItem("i18nextLng");
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/v1/mobile/customer/reset-password`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": lang,
			},
		},
	);
}
export const useResetPassword = ({ path }: { path: string }) => {
	const navigate = useNavigate();

	return useMutation("resetPassword", resetPassword, {
		onSuccess: async () => {
			toast.success("reset password successfully");
			navigate(path);
		},
		onError: (errors: any) => {
			const err = errors.response.data.errors;

			for (const m in err) {
				toast.error(err[m]);
			}
		},
	});
};
