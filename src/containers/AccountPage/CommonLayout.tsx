import React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export interface CommonLayoutProps {
	children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
	const { t } = useTranslation();
	return (
		<div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
			<div className="border-b border-neutral-200 bg-white pt-12 dark:border-neutral-700 dark:bg-neutral-800">
				<div className="container">
					<div className="hiddenScrollbar flex gap-2 space-x-8 overflow-x-auto md:space-x-14 ">
						<NavLink
							to="/account"
							className={({ isActive }) =>
								`block flex-shrink-0 border-b-2 py-5 md:py-8 ${
									isActive ? "border-primary-500" : "border-transparent"
								}`
							}
						>
							{t("accountInfo")}
						</NavLink>
						<NavLink
							to="/account-password"
							className={({ isActive }) =>
								`block flex-shrink-0 border-b-2 py-5 md:py-8 ${
									isActive ? "border-primary-500" : "border-transparent"
								}`
							}
						>
							{t("changePassword")}
						</NavLink>
						{/* <NavLink
              to="/account-savelists"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-transparent" : "border-primary-500"
                }`
              }5555555555555555555555555555555555555555
            >
              Save lists
            </NavLink>
            <NavLink
              to="/account-password"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Change password
            </NavLink>
            <NavLink
              to="/account-billing"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Change Billing
            </NavLink> */}
					</div>
				</div>
			</div>
			<div className="container pt-14 pb-24 sm:pt-20 lg:pb-32">{children}</div>
		</div>
	);
};

export default CommonLayout;
