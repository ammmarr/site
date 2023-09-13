import React, { FC } from "react";
import Heading2 from "components/Heading/Heading2";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";
import FlightCard from "components/FlightCard/FlightCard";
import FlightCardComponent from "components/FlightCard/FlightCard2";

export interface SectionGridFilterCardProps {
	className?: string;
	isLoading: boolean;
	setPage?: any;
	trips: any;
	paginationStatus: boolean;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = "",
	isLoading,
	setPage,
	trips,
	paginationStatus,
}) => {
	const { t } = useTranslation();
	return (
		<div
			className={`nc-SectionGridFilterCard ${className}`}
			data-nc-id="SectionGridFilterCard"
		>
			{/* <Heading2
        heading="Singapore - Tokyo"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            {t("flights")} {trips?.length}
            <span className="mx-2">·</span>
            round trip
            <span className="mx-2">·</span>2 Guests
          </span>
        }
      /> */}

			<div className="grid grid-cols-1 gap-6 rounded-3xl lg:bg-neutral-50 lg:p-10  lg:dark:bg-black/20">
				{trips.map((item: any, index: number) => (
					<FlightCardComponent key={index} data={item} />
				))}

				{paginationStatus && (
					<div className="mt-12 flex items-center justify-center">
						<ButtonPrimary onClick={setPage} loading={isLoading}>
							{t("showMore")}
						</ButtonPrimary>
					</div>
				)}
			</div>
		</div>
	);
};

export default SectionGridFilterCard;
