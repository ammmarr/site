import React, { FC, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { AppContext } from "components/context/AppContext";
import useInput from "hooks/useInput";
import { useTranslation } from "react-i18next";
import { useValidatePhone } from "hooks/DataSend/useValidatedPhone";
import OtpInput from "react-otp-input";
import { useValidateOtp } from "hooks/DataSend/useValidateOtp";
import { useResetPassword } from "hooks/DataSend/useResetPassword";

export interface PageLoginProps {
	className?: string;
}

const PageForgetPassword: FC<PageLoginProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	const { token } = useContext(AppContext);
	const { mutate, isSuccess: isvalidatedPhone } = useValidatePhone();
	const { mutate: mutateOtp, isSuccess: isvalidatedOtp } = useValidateOtp();
	const { mutate: mutateResetPassword } = useResetPassword({
		path: "/login",
	});
	const [otp, setOtp] = useState<string>("");

	const {
		value: phone,
		isValid: PhoneISValid,
		hasError: phoneHasError,
		inputBlurHandler: phoneBlur,
		valueChangeHandler: phoneChange,
		reset: resetPhone,
	} = useInput((value: any) => value.length <= 12);

	const {
		value: password,
		isValid: passwordISValid,
		hasError: passwordHasError,
		inputBlurHandler: passwordBlur,
		valueChangeHandler: passwordChange,
	} = useInput((value: any) => value.length === 6);
	const {
		value: confirmPassword,
		isValid: confirmPasswordISValid,
		hasError: confirmPasswordHasError,
		inputBlurHandler: confirmPasswordBlur,
		valueChangeHandler: confirmPasswordChange,
	} = useInput((value: any) => value === password);
	const handleSubmitPhone = (event: any) => {
		event.preventDefault();
		if (!PhoneISValid) {
			return;
		}
		const officialPhone = phone?.substring(1);

		const data = new FormData();
		data.append("mobile", officialPhone);
		data.append("phonecode", "20");

		mutate(data);
		localStorage.setItem("phone", `${phone}`);
	};

	const handleSubmitOpt = () => {
		if (!PhoneISValid) {
			return;
		}
		const officialPhone = phone?.substring(1);

		const data = new FormData();
		data.append("mobile", officialPhone);
		data.append("phonecode", "20");
		data.append("code", otp);

		mutateOtp(data);
	};

	const handleSubmitResetPassword = () => {
		if (!PhoneISValid) {
			return;
		}
		const officialPhone = phone?.substring(1);

		const data = new FormData();
		data.append("mobile", officialPhone);
		data.append("phonecode", "20");
		data.append("code", otp);
		data.append("password", password);
		data.append("password_confirmation", confirmPassword);

		mutateResetPassword(data);
	};

	return (
		<div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
			<Helmet>
				<title>Login || Telefreik For Booking</title>
			</Helmet>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
					Reset Password
				</h2>
				<div className="mx-auto max-w-md space-y-6">
					<form
						className="grid grid-cols-1 gap-6"
						method="post"
						onSubmit={handleSubmitPhone}
					>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								{t("phoneNumber")}
							</span>
							<Input
								type="text"
								placeholder="0105478...."
								className="mt-1"
								value={phone}
								onChange={phoneChange}
								onBlur={phoneBlur}
								autoFocus
							/>
							{phoneHasError && (
								<p className="mt-1 text-red-900">
									{t("Enter a valid phone number")}
								</p>
							)}
						</label>
						{isvalidatedPhone && !isvalidatedOtp && (
							<div className="grid grid-cols-1 gap-6">
								<label className="block">
									<span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
										{t("otp")}
									</span>
								</label>
								<div className="flex w-full justify-center">
									<OtpInput
										value={otp}
										inputStyle={{
											height: "3.5rem",
											width: "3.5rem",
											border: "1px solid rgb(67,56,202)",
											borderRadius: 4,
											color: "text-neutral-800 dark:text-neutral-200",
											fontWight: "bolder",
											fontSize: "1.5rem",
										}}
										hasErrored={otp?.length <= 4}
										onChange={(e: any) => setOtp(e)}
										placeholder="----"
										isInputNum={true}
										numInputs={4}
										separator={<div style={{ marginInline: "0.5rem" }} />}
										shouldAutoFocus={true}
										containerStyle={{ direction: "ltr" }}
									/>
								</div>

								<ButtonPrimary className="" onClick={() => handleSubmitOpt()}>
									{t("continueResetPassword")}
								</ButtonPrimary>
							</div>
						)}
						{isvalidatedOtp && (
							<div className="grid grid-cols-1 gap-6">
								<label className="block">
									<span className="text-neutral-800 dark:text-neutral-200">
										{t("password")}
									</span>
									<Input
										type="password"
										className="mt-1"
										value={password}
										onChange={passwordChange}
										onBlur={passwordBlur}
									/>
									{passwordHasError && (
										<p className="mt-1 text-red-900">{t("inValidPassword")}</p>
									)}
								</label>
								<label className="block">
									<span className="text-neutral-800 dark:text-neutral-200">
										{t("confirmPassword")}
									</span>
									<Input
										type="password"
										className="mt-1"
										value={confirmPassword}
										onChange={confirmPasswordChange}
										onBlur={confirmPasswordBlur}
									/>
									{!!password && confirmPasswordHasError && (
										<p className="mt-1 text-red-900">
											{t("notMatchedPassword")}
										</p>
									)}
								</label>
								<ButtonPrimary className="" onClick={handleSubmitResetPassword}>
									{" "}
									{t("ConfirmResetPassword")}
								</ButtonPrimary>
							</div>
						)}
						{!isvalidatedPhone && (
							<ButtonPrimary type="submit">Continue</ButtonPrimary>
						)}
					</form>

					{/* ==== */}
					<div className="relative text-center">
						<span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
							{t("or")}
						</span>
						<div className="absolute left-0 top-1/2 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
					</div>

					{!token && (
						<span className="block text-center text-neutral-700 dark:text-neutral-300 ">
							{t("newUser")} {` `}(
							<Link to="/signup">
								<span className="text-primary-6000">
									{t("createAnAccount")}
								</span>
							</Link>
							)
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default PageForgetPassword;
