import React, { FC, useEffect, useState } from "react";
import StaySearchForm, { StaySearchFormFields } from "./StaySearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import BusSearchForm from "components/HeroSearchForm/BusSearchForm";

export type SearchTab = "Bus" | "Cars" | "Flights";

export interface HeroSearchFormProps {
	className?: string;
	defaultTab?: SearchTab;
	onTabChange?: (tab: SearchTab) => void;
	defaultFieldFocus?: StaySearchFormFields;
}
const TABS: SearchTab[] = ["Bus", "Cars", "Flights"];

const HeroSearchForm: FC<HeroSearchFormProps> = ({
	className = "",
	defaultTab = "Flights",
	onTabChange,
	defaultFieldFocus,
}) => {
	const [tabActive, setTabActive] = useState<SearchTab>(defaultTab);

	useEffect(() => {
		if (defaultTab === tabActive) {
			return;
		}
		setTabActive(defaultTab);
	}, [defaultTab]);

	const renderTab = () => {
		return (
			<ul className="flex h-[88px] justify-center space-x-5 sm:space-x-9">
				{TABS.map(tab => {
					const active = tab === tabActive;
					return (
						<li
							onClick={() => {
								setTabActive(tab);
								onTabChange && onTabChange(tab);
							}}
							className={`relative flex flex-shrink-0 cursor-pointer items-center text-base text-neutral-700 dark:text-neutral-300 ${
								active ? "text-neutral-900 dark:text-neutral-200" : ""
							} `}
							key={tab}
						>
							<div className="relative select-none">
								<span>{tab}</span>
								{active && (
									<span className="absolute top-full mt-1 mr-2 block h-0.5 w-full rounded-full bg-neutral-800 dark:bg-neutral-100" />
								)}
							</div>
						</li>
					);
				})}
			</ul>
		);
	};

	const renderForm = () => {
		switch (tabActive) {
			case "Bus":
				return <BusSearchForm />;
			case "Cars":
				return <RentalCarSearchForm />;
			case "Flights":
				return <FlightSearchForm />;

			default:
				return null;
		}
	};

	return (
		<div
			className={`nc-HeroSearchForm ${className}`}
			data-nc-id="HeroSearchForm"
		>
			{renderTab()}
			<div className="mt-2">{renderForm()}</div>
		</div>
	);
};

export default HeroSearchForm;
