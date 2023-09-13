import React, { FC } from "react";
import { DEMO_CAR_LISTINGS } from "data/listings";
import { CarDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import CarCard from "components/CarCard/CarCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";

export interface SectionGridFilterCardProps {
	className?: string;
	city?: string;
	trips: any;
	isLoading: boolean;
	date?: any;
	travelFrom?: any;
	setPage?: any;
	cityFrom?: any;
	travelTo?: any;
	paginationStatus: boolean;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = "",
	city,
	trips,
	isLoading,
	travelFrom,
	date,
	setPage,
	cityFrom,
	travelTo,
	paginationStatus,
}) => {
	const { t } = useTranslation();
	const newCity = !!city && city !== "undefined" ? city : "";
	return (
		<div
			className={`nc-SectionGridFilterCard ${className}`}
			data-nc-id="SectionGridFilterCard"
		>
			<Heading2
				heading={
					t("egypt") + " - " + (decodeURIComponent(newCity ?? "") ?? "" ?? "")
				}
				subHeading={<></>}
			/>

			{/* <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div> */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
				{/* {data.map((car) => (
          <CarCard key={car.id} data={car} />
        ))} */}
				{trips?.length > 0 &&
					trips.map((item: any, index: number) => {
						return (
							<CarCard
								travelFrom={decodeURIComponent(cityFrom ?? "")}
								travel={travelFrom}
								key={index}
								data={item}
								date={date}
								cityTo={travelTo}
								city={decodeURIComponent(city ?? "")}
							/>
						);
					})}
			</div>
			{paginationStatus && (
				<div className="mt-12 flex items-center justify-center">
					<ButtonPrimary onClick={setPage} loading={isLoading}>
						{t("showMore")}
					</ButtonPrimary>
				</div>
			)}
		</div>
	);
};

export default SectionGridFilterCard;
