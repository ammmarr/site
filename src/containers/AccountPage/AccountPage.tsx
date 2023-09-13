import Label from "components/Label/Label";
import React, { FC, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { t } from "i18next";
import useForm from "hooks/useForm";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { updateProfile } from "api";
import { useNavigate } from "react-router-dom";

export interface AccountPageProps {
	className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
	const [values, setValues] = useForm({
		name: localStorage.getItem("name") ?? "",
		email: localStorage.getItem("email") ?? "",
		mobile: localStorage.getItem("phone") ?? "",
		country_code: "20",
	});
	const [image, setImage] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const editAddressData = async () => {
		setLoading(true);

		if (!!values) {
			await updateProfile({ ...values, avatar: image })
				.then(res => {
					setLoading(false);
					localStorage.setItem("name", values?.name);
					localStorage.setItem("email", values?.email);
					localStorage.setItem("phone", values?.mobile);

					toast.success(t("successSending"));
					setValues({
						name: "",
						email: "",
						mobile: "",
						country_code: "20",
					});
				})
				.catch((err: any) => {
					// setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);

						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
					if (err.response.status === 401) {
						navigate("/login");
					}
				});
		} else {
			toast.error(t("notValidData"));
			setLoading(false);
		}
	};
	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setImage(undefined);
			return;
		}

		// I've kept this example simple by using the first image instead of multiple
		setImage(e.target.files[0]);
	};
	return (
		<div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
			<Helmet>
				<title>Account || Telefreik Booking</title>
			</Helmet>
			<CommonLayout>
				<div className="space-y-6 sm:space-y-8">
					{/* HEADING */}
					{/* <h2 className="text-3xl font-semibold">Account infomation</h2> */}
					{/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
					<div className="flex flex-col md:flex-row">
						<div className="flex flex-shrink-0 items-start ">
							<div className="relative flex justify-center overflow-hidden rounded-full  md:justify-start">
								<Avatar
									imgUrl={!!image ? URL.createObjectURL(image) : ""}
									sizeClass="w-32 h-32"
								/>
								<div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black bg-opacity-60 text-neutral-50">
									<svg
										width="30"
										height="30"
										viewBox="0 0 30 30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
											stroke="currentColor"
											strokeWidth={1.5}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>

									<span className="mt-1 text-xs">{t("changeImage")}</span>
								</div>
								<input
									type="file"
									className="absolute inset-0 cursor-pointer opacity-0"
									onChange={onSelectFile}
									accept="image/*"
								/>
							</div>
						</div>
						{/* max-w-3xl */}
						<div className="mt-10 flex  w-full flex-grow flex-col items-center  justify-center space-y-6 md:mt-0  md:pl-16">
							<div className="w-2/3">
								<Label>{t("userName")}</Label>
								<Input
									className="mt-1.5"
									onChange={setValues}
									value={values.name}
									name="name"
									required
									type="text"
								/>
							</div>
							{/* ---- */}
							<div className="w-2/3">
								<Label>{t("email")}</Label>
								<Input
									type="email"
									className="mt-1.5"
									onChange={setValues}
									value={values.email}
									name="email"
									required
									pattern="/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/"
								/>
							</div>
							{/* ---- */}
							<div className="w-2/3">
								<Label>{t("phoneNumber")}</Label>
								<Input
									onChange={setValues}
									value={values.mobile}
									name="mobile"
									type="text"
									required
									className="mt-1.5"
									pattern="[0-9]{11}"
								/>
							</div>

							<div className="pt-2">
								<ButtonPrimary loading={loading} onClick={editAddressData}>
									{t("updateInfo")}
								</ButtonPrimary>
							</div>
						</div>
					</div>
				</div>
			</CommonLayout>
		</div>
	);
};

export default AccountPage;
