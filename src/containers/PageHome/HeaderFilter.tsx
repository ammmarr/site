import React, { FC, useEffect, useState } from "react";
import Heading from "shared/Heading/Heading";
import Nav from "shared/Nav/Nav";
import NavItem from "shared/NavItem/NavItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { ReactNode } from "react";

export interface HeaderFilterProps {
	tabActive: string;
	tabs: string[];
	heading: ReactNode;
	subHeading?: ReactNode;
	onClickTab: (item: string) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
	tabActive,
	tabs,
	subHeading = "",
	heading = "🎈 Latest Articles",
	onClickTab,
}) => {
	const [tabActiveState, setTabActiveState] = useState(tabActive);

	useEffect(() => {
		setTabActiveState(tabActive);
	}, [tabActive]);

	const handleClickTab = (item: string) => {
		onClickTab && onClickTab(item);
		setTabActiveState(item);
	};

	return (
		<div className="relative mb-8 flex flex-col">
			<Heading desc={subHeading}>{heading}</Heading>
			<div className="flex items-center justify-between">
				<Nav
					className="sm:space-x-2"
					containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
				>
					{tabs.map((item, index) => (
						<NavItem
							key={index}
							isActive={tabActiveState === item}
							onClick={() => handleClickTab(item)}
						>
							{item}
						</NavItem>
					))}
				</Nav>
				<span className="hidden flex-shrink-0 sm:block">
					<ButtonSecondary className="!leading-none">
						<span>View all</span>
						<i className="las la-arrow-right ml-3 text-xl"></i>
					</ButtonSecondary>
				</span>
			</div>
		</div>
	);
};

export default HeaderFilter;
