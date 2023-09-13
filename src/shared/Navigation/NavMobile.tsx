import React, { useEffect, useState } from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SocialsList from "shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "components/Header/LangDropdown";

import logoImage from "images/logos/logo.png";
import { useTranslation } from "react-i18next";

export interface NavMobileProps {
	data?: NavItemType[];
	onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
	data = NAVIGATION_DEMO,
	onClickClose,
}) => {
	const { t } = useTranslation();
	const [token, setToken] = useState("");

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
		localStorage.removeItem("phone");
		window.location.reload();
	};
	useEffect(() => {
		let tokenLocal = localStorage.getItem("token") ?? "";
		if (!!tokenLocal) setToken(tokenLocal);
	}, [localStorage.getItem("token")]);
	const _renderMenuChild = (item: NavItemType) => {
		return (
			<ul className="nav-mobile-sub-menu pb-1 pl-6 text-base">
				{item.children?.map((i, index) => (
					<Disclosure key={i.href + index} as="li">
						<NavLink
							end
							to={{
								pathname: i.href || undefined,
							}}
							className={({ isActive }) =>
								`mt-0.5 flex rounded-lg px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800 ${
									isActive ? "text-secondary" : ""
								}`
							}
						>
							<span
								className={`py-2.5 pr-3 ${!i.children ? "block w-full" : ""}`}
							>
								{i.name}
							</span>
							{i.children && (
								<span className="flex flex-1" onClick={e => e.preventDefault()}>
									<Disclosure.Button
										as="span"
										className="flex flex-1 justify-end py-2.5"
									>
										<ChevronDownIcon
											className="ml-2 h-4 w-4 text-neutral-500"
											aria-hidden="true"
										/>
									</Disclosure.Button>
								</span>
							)}
						</NavLink>
						{i.children && (
							<Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
						)}
					</Disclosure>
				))}
			</ul>
		);
	};

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure
				key={item.id}
				as="li"
				className="text-neutral-900 dark:text-white"
			>
				<NavLink
					end
					className={({ isActive }) =>
						`flex w-full rounded-lg px-4 text-sm font-medium uppercase tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
							isActive ? "text-secondary" : ""
						}`
					}
					to={{
						pathname: item.href || undefined,
					}}
				>
					<span
						className={`py-2.5 pr-3 ${!item.children ? "block w-full" : ""}`}
					>
						{t(`${item.name}`)}
					</span>
					{item.children && (
						<span className="flex flex-1" onClick={e => e.preventDefault()}>
							<Disclosure.Button
								as="span"
								className="flex flex-1 items-center justify-end py-2.5 "
							>
								<ChevronDownIcon
									className="ml-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</Disclosure.Button>
						</span>
					)}
				</NavLink>
				{item.children && (
					<Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
				)}
			</Disclosure>
		);
	};

	return (
		<div className="h-screen w-full transform divide-y-2 divide-neutral-100 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition dark:divide-neutral-800 dark:bg-neutral-900 dark:ring-neutral-700">
			<div className="px-5 py-6">
				<img src={logoImage} alt="logo" />

				<div className="mt-5 flex flex-col text-sm text-neutral-700 dark:text-neutral-300">
					<span>{t("navMobileDec")}</span>

					<div className="mt-4 flex items-center justify-between">
						<SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
						<span className="block">
							<SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
						</span>
					</div>
				</div>
				<span className="absolute top-2 p-1 ltr:right-2 rtl:left-2">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col space-y-1 px-2 py-6">
				{data.map(_renderItem)}
				{!!token && (
					<li
						className="mt-1 cursor-pointer ltr:mx-4 rtl:mx-7"
						onClick={logout}
					>
						{t("logout")}
					</li>
				)}
			</ul>
			<div className="flex items-center justify-between px-5 py-6">
				<LangDropdown panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 ltr:-left-3 rtl:-right-3 bottom-full sm:px-0" />
			</div>
		</div>
	);
};

export default NavMobile;
