import React, { FC } from "react";
import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";

export interface SectionGridFilterCardProps {
	className?: string;
	data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = "",
	data = DEMO_DATA,
}) => {
	return (
		<div
			className={`nc-SectionGridFilterCard ${className}`}
			data-nc-id="SectionGridFilterCard"
		>
			<Heading2 />

			<div className="mb-8 lg:mb-11">
				<TabFilters />
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
				{data.map(stay => (
					<StayCard key={stay.id} data={stay} />
				))}
			</div>
			<div className="mt-16 flex items-center justify-center">
				<Pagination />
			</div>
		</div>
	);
};

export default SectionGridFilterCard;
