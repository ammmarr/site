import React, { FC, useContext, useEffect, useState } from "react";
import Navigation from "shared/Navigation/Navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import logoImage from "images/logos/navLogo.png";

import LangDropdown from "components/Header/LangDropdown";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { AppContext } from "components/context/AppContext";
import AvatarDropdown from "./AvatarDropdown";

export interface MainNav1Props {
	className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
	const { t, i18n } = useTranslation();
	const routes = useLocation();
	const [token, setToken] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		let tokenLocal = localStorage.getItem("token") ?? "";
		const lName: any = localStorage.getItem("name");
		if (!!tokenLocal) setToken(tokenLocal);
		setName(lName);
	}, [localStorage.getItem("token"), localStorage.getItem("name")]);

	return (
		<div className={`nc-MainNav1 relative z-[9999] ${className}`}
		style={{
			backdropFilter :'50px',
			
		}}
		>
			<div className="relative flex items-center justify-between px-4 py-4 lg:container lg:py-2">
				<div className="hidden flex-1 items-center justify-start space-x-4 sm:space-x-10 md:flex">
					<img src={logoImage} alt="logo" className="ml-4 " />

					<Navigation />
				</div>

				{routes?.pathname !== "/login" &&
					routes?.pathname !== "/otp" &&
					routes?.pathname !== "/signup" && (
						<div className="!mx-auto max-w-lg flex-[3] md:px-3 lg:hidden">
							<HeroSearchForm2MobileFactory />
						</div>
					)}

				<div className="hidden flex-1 flex-shrink-0 items-center justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
					<div className="hidden items-center space-x-0.5 xl:flex">
						{/* <SwitchDarkMode /> */}
						<div className="px-1" />
						<LangDropdown />
						{!token && (
							<ButtonPrimary href="/login">{t("login")}</ButtonPrimary>
						)}
						{!!token && <AvatarDropdown />}
					</div>
					<div className="flex items-center xl:hidden">
						<SwitchDarkMode />
						<div className="px-0.5" />
						<LangDropdown />
						{!token && (
							<ButtonPrimary href="/login">{t("login")}</ButtonPrimary>
						)}

						{!!token && <AvatarDropdown />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainNav1;
