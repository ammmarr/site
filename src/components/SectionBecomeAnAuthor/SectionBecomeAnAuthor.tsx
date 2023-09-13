import React, { FC, useContext, useEffect, useState } from "react";
import NcImage from "shared/NcImage/NcImage";
import rightImgDemo from "images/BecomeAnAuthorImg.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext } from "components/context/AppContext";

export interface SectionBecomeAnAuthorProps {
	className?: string;
	rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
	className = "",
	rightImg = rightImgDemo,
}) => {
	const { t } = useTranslation();
	const [token, setToken] = useState("");
	useEffect(() => {
		let tokenLocal = localStorage.getItem("token") ?? "";
		if (!!tokenLocal) setToken(tokenLocal);
	}, [localStorage.getItem("token")]);
	return (
		<div
			className={`nc-SectionBecomeAnAuthor relative flex flex-col items-center lg:flex-row  ${className}`}
			data-nc-id="SectionBecomeAnAuthor"
		>
			<div className="mb-16 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
				{/* <Logo className="w-20" /> */}
				<h2 className="mt-6 text-3xl font-semibold sm:mt-11 sm:text-4xl">
					{t("whyChoose")}
				</h2>
				<span className="mt-6 block text-neutral-500 dark:text-neutral-400">
					{t("chooseDesc")}
				</span>
				{!token && (
					<ButtonPrimary className="mt-6 sm:mt-11">
						<Link to="/signup">{t("createAccount")}</Link>
					</ButtonPrimary>
				)}
			</div>
			<div className="flex-grow">
				<NcImage src={rightImg} />
			</div>
		</div>
	);
};

export default SectionBecomeAnAuthor;
