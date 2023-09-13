import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import heroRightImage from "images/hero-right-car.png";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchTripsMaritime, searchTripsPrivate } from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";

export interface ListingCarPageProps {
	className?: string;
}

const ListingCarPage: FC<ListingCarPageProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");
	const [travelTo, setTravelTo] = useState<string>("");
	const [travelFrom, setTravelFrom] = useState<string>("");
	const [trips, setTrips] = useState<any>([]);
	const [city, setCity] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [cityFrom, setCityFrom] = useState<any>("");
	const [paginationStatus, setPaginationStatus] = useState<boolean>(true);
    
	useEffect(() => {
		if (!!search) {
			const data = search.slice(1).split("/");
			setDate(data?.[0]);
			setTravelTo(data?.[1]);
			setTravelFrom(data?.[2]);
			setCity(data?.[3]);
			setCityFrom(data?.[4]);
			setTrips([]);
			setPage(1);
		}
	}, [search]);
	const [loading, setLoading] = useState<boolean>(false);

	const getTripsCars = async () => {
		setLoading(true);

		if (
			travelTo !== undefined &&
			travelTo !== "undefined" &&
			travelFrom !== "undefined" &&
			travelFrom !== undefined &&
			!!travelFrom &&
			!!travelTo
		) {
			await searchTripsPrivate(
				{ date, city_to: travelTo, city_from: travelFrom },
				page,
			)
				.then((res: any) => {
					if (res?.data?.data.length) {
						setTrips((prev: any) => [...prev, ...res?.data?.data]);
					} else if (page > 1) {
						setPaginationStatus(false);
					}

					setLoading(false);
				})
				.catch((errors: any) => {
					setLoading(false);
					if (Object.keys(errors.response.data.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(errors.response.data.errors);
					} else {
						setLoading(false);
						toast.error(errors.response.data.message);
					}
				});
		}
	};

	useEffect(() => {
		if (
			travelTo !== undefined &&
			travelTo !== "undefined" &&
			travelFrom !== "undefined" &&
			travelFrom !== undefined &&
			!!travelFrom &&
			!!travelTo
		) {
			getTripsCars();
		}
	}, [travelTo, travelFrom, page, date]);

	return (
		<div
			className={`nc-ListingCarPage relative overflow-hidden ${className}`}
			data-nc-id="ListingCarPage"
		>
			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>
			<BgGlassmorphism />

			<div className="container relative">
				{/* SECTION HERO */}
				<SectionHeroArchivePage
					rightImage={heroRightImage}
					currentPage="Cars"
					currentTab="Cars"
					trips={trips}
					isLoading={loading}
					listingType={
						<>
							<i className="las la-car text-2xl"></i>
							<span className="ml-2.5">
								{" "}
								{trips.length} {t("Cars")}
							</span>
						</>
					}
					className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
				/>{" "}
				{loading && page === 1 && (
					<div className="my-4 flex w-full justify-center">
						<svg
							className="-ml-1 mr-3 h-20 w-20 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="3"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				)}
				{/* SECTION */}
				{trips.length > 0 && (
					<SectionGridFilterCard
						trips={trips}
						city={city}
						isLoading={loading}
						className="pb-24 lg:pb-28"
						date={date}
						travelFrom={travelFrom}
						travelTo={travelTo}
						cityFrom={cityFrom}
						setPage={() => setPage(page + 1)}
						paginationStatus={paginationStatus}
					/>
				)}
				{/* SECTION 1 */}
				{/* SECTION */}
				{/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}
			</div>
		</div>
	);
};

export default ListingCarPage;
