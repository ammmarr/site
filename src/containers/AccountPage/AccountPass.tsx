import useInput from "hooks/useInput";
import React from "react";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";

const AccountPass = () => {
	const { t } = useTranslation();

	const {
		value: password,
		isValid: passwordISValid,
		hasError: passwordHasError,
		inputBlurHandler: passwordBlur,
		valueChangeHandler: passwordChange,
	} = useInput((value: any) => value.length === 6);

	const {
		value: newPassword,
		isValid: newPasswordISValid,
		hasError: newPasswordHasError,
		inputBlurHandler: newPasswordBlur,
		valueChangeHandler: newPasswordChange,
	} = useInput((value: any) => value.length === 6);

	const {
		value: confirmPassword,
		isValid: confirmPasswordISValid,
		hasError: confirmPasswordHasError,
		inputBlurHandler: confirmPasswordBlur,
		valueChangeHandler: confirmPasswordChange,
	} = useInput((value: any) => value === newPassword);

	const handleUpdatePassword = () => {
		if (!passwordISValid) return;

		const data = new FormData();
		data.append("password", password);
		data.append("new-password", newPassword);
		data.append("password_confirmation", confirmPassword);
	};

	return (
		<div>
			<CommonLayout>
				<div className="space-y-6 sm:space-y-8">
					{/* HEADING */}
					<h2 className="text-3xl font-semibold">{t("updateYourPassword")}</h2>
					<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className=" max-w-xl space-y-6">
						<div className="grid grid-cols-1 gap-6">
							<label className="block">
								<span className="text-neutral-800 dark:text-neutral-200">
									{t("currentPassword")}
								</span>
								<div className="mt-2 flex w-full">
									<OtpInput
										value={password}
										inputStyle={{
											height: "3.5rem",
											width: "3.5rem",
											border: "1px solid rgb(67,56,202)",
											borderRadius: 4,
											color: "text-neutral-800 dark:text-neutral-200",
											fontWight: "bolder",
											fontSize: "1.5rem",
										}}
										hasErrored={password?.length <= 6}
										onChange={(e: any) => {
											const event: any = {
												target: {
													value: e,
												},
											};
											passwordChange(event);
										}}
										placeholder="------"
										isInputNum={true}
										numInputs={6}
										separator={<div style={{ marginInline: "0.5rem" }} />}
										shouldAutoFocus={true}
										containerStyle={{ direction: "ltr" }}
									/>
								</div>
								{passwordHasError && (
									<p className="mt-1 text-red-900">{t("inValidPassword")}</p>
								)}
							</label>
							<label className="block">
								<span className="text-neutral-800 dark:text-neutral-200">
									{t("newPassword")}
								</span>
								<div className="mt-2 flex w-full">
									<OtpInput
										value={newPassword} //
										inputStyle={{
											height: "3.5rem",
											width: "3.5rem",
											border: "1px solid rgb(67,56,202)",
											borderRadius: 4,
											color: "text-neutral-800 dark:text-neutral-200",
											fontWight: "bolder",
											fontSize: "1.5rem",
										}}
										hasErrored={newPassword?.length <= 6}
										onChange={(e: any) => {
											const event: any = {
												target: {
													value: e,
												},
											};
											newPasswordChange(event);
										}}
										placeholder="------"
										isInputNum={true}
										numInputs={6}
										separator={<div style={{ marginInline: "0.5rem" }} />}
										containerStyle={{ direction: "ltr" }}
									/>
								</div>
								{newPasswordHasError && (
									<p className="mt-1 text-red-900">{t("inValidPassword")}</p>
								)}
							</label>
							<label className="block">
								<span className="text-neutral-800 dark:text-neutral-200">
									{t("confirmPassword")}
								</span>
								<div className="mt-2 flex w-full">
									<OtpInput
										value={confirmPassword}
										inputStyle={{
											height: "3.5rem",
											width: "3.5rem",
											border: "1px solid rgb(67,56,202)",
											borderRadius: 4,
											color: "text-neutral-800 dark:text-neutral-200",
											fontWight: "bolder",
											fontSize: "1.5rem",
										}}
										hasErrored={confirmPassword?.length <= 6}
										onChange={(e: any) => {
											const event: any = {
												target: {
													value: e,
												},
											};
											confirmPasswordChange(event);
										}}
										placeholder="------"
										isInputNum={true}
										numInputs={6}
										separator={<div style={{ marginInline: "0.5rem" }} />}
										containerStyle={{ direction: "ltr" }}
									/>
								</div>
								{!!newPassword && confirmPasswordHasError && (
									<p className="mt-1 text-red-900">{t("notMatchedPassword")}</p>
								)}
							</label>
						</div>
						<div className="pt-2">
							<ButtonPrimary onClick={handleUpdatePassword}>
								{t("updatePassword")}
							</ButtonPrimary>
						</div>
					</div>
				</div>
			</CommonLayout>
		</div>
	);
};

export default AccountPass;
