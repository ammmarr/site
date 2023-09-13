import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "./LangDropdown";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import DropdownTravelers from "./DropdownTravelers";
import { Link } from "react-router-dom";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";

export interface MainNav2Props {
	className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
	return (
		<div className={`nc-MainNav1 nc-MainNav2 relative z-10 ${className}`}>
			<div className="relative flex items-center justify-between px-4 py-4 lg:container lg:py-5">
				<div className="hidden flex-1 items-center justify-start space-x-3 sm:space-x-8 md:flex lg:space-x-10">
					<Logo />
					<div className="hidden h-10 border-l border-neutral-300 dark:border-neutral-500 lg:block"></div>
					<div className="hidden lg:block">
						<DropdownTravelers />
					</div>
				</div>

				<div className="!mx-auto max-w-lg flex-[3] md:px-3 lg:hidden">
					<HeroSearchForm2MobileFactory />
				</div>

				<div className="hidden flex-1 flex-shrink-0 items-center justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
					<div className="hidden items-center space-x-1 lg:flex">
						<CurrencyDropdown />
						<LangDropdown />
						<Link
							to="/add-listing-1"
							className="
                group
                inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-gray-700 text-opacity-90 hover:border-neutral-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300"
						>
							List your property
						</Link>

						<div></div>
						<SwitchDarkMode />
						<div className="pr-1.5">
							<NotifyDropdown className="-ml-2 xl:-ml-1" />
						</div>
						<AvatarDropdown />
					</div>
					<div className="flex items-center space-x-2 lg:hidden">
						<NotifyDropdown />
						<AvatarDropdown />
						<MenuBar />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainNav2;
