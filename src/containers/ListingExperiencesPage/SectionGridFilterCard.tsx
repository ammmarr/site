import React, { FC } from "react";
import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
import { ExperiencesDataType, StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";

export interface SectionGridFilterCardProps {
	className?: string;
	data?: StayDataType[];
}

const DEMO_DATA: ExperiencesDataType[] = DEMO_EXPERIENCES_LISTINGS.filter(
	(_, i) => i < 8,
);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = "",
	data = DEMO_DATA,
}) => {
	return (
		<div
			className={`nc-SectionGridFilterCard ${className}`}
			data-nc-id="SectionGridFilterCard"
		>
			<Heading2
				heading="Experiences in Tokyo"
				subHeading={
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						233 experiences
						<span className="mx-2">·</span>
						Aug 12 - 18
						<span className="mx-2">·</span>2 Guests
					</span>
				}
			/>

			<div className="mb-8 lg:mb-11">
				<TabFilters />
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
				{data.map(stay => (
					<ExperiencesCard key={stay.id} data={stay} />
				))}
			</div>
			<div className="mt-16 flex items-center justify-center">
				<Pagination />
			</div>
		</div>
	);
};

export default SectionGridFilterCard;
