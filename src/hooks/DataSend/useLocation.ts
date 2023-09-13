import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "i18n";
import { showApiErrorMessages } from "utils";

function searchTrip(data: any): Promise<any> {
	return axios.post(
		`${process.env.REACT_APP_API_TELE_URL}/api/transports/trips?city_from=${data?.travelFrom}&city_to=${data?.travelTo}&date=${data?.date}`,
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"Accept-Language": i18n?.language,
			},
		},
	);
}
export const useSearchTrip = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	return useMutation("searchTrip", searchTrip, {
		onSuccess: success => {
			//   toast.success(success?.data?.message);
			//   navigate("/otp");
		},
		onError: (errors: any) => {
			if (Object.keys(errors.response.data.errors)?.length) {
				showApiErrorMessages(errors.response.data.errors);
			} else {
				toast.error(errors.response.data.message);
			}
		},
	});
};
