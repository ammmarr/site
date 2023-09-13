import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getFlightsTrips, getFlightsTripsSession } from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export interface ListingFlightsPageProps {
	className?: string;
}

const ListingFlightsPage: FC<ListingFlightsPageProps> = ({
	className = "",
}) => {
	const { t } = useTranslation();
	const [page, setPage] = useState<number>(1);

	const [loading, setLoading] = useState<boolean>(false);
	const [trips, setTrips] = useState<any>([]);
	const [sessionToken, setSessionToken] = useState<string>("");
	const location = useLocation();
	const [paginationStatus, setPaginationStatus] = useState<boolean>(true);

	const getFlightsTripsData = async (localData: any) => {
		setLoading(true);
		if (!!localData) {
			console.log("local data flight trip " , localData)
			const body: any = {
				cabinClass: localData?.cabinClass,
				round: localData?.round,
				origin: localData?.origin,
				destination: localData?.destination,
				departureDateTime: localData?.departureDateTime,
				adults: localData?.adults,
				childrenAges: [],
				filter_by: "cheapest",
				filter_dir: "desc",
			};
			if (localData?.round === 2)
				body["arrivalDateTime"] = localData?.arrivalDateTime;
			await getFlightsTrips(body)
				.then((res: any) => {
					setTrips([]);
					if (!!res?.data?.sessionToken) {
						setSessionToken(res?.data?.sessionToken ?? "");
					}
				})
				.catch((errors: any) => {
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

	const getTripsSessionToken = async () => {
		if (!!sessionToken) {
			await getFlightsTripsSession(page, sessionToken)
				.then((res: any) => {
					if (!!res?.data?.data?.length) {
						setTrips((prev: any) => [...prev, ...res?.data?.data]);
					} else if (page > 1) {
						setPaginationStatus(false);
					}
					setLoading(false);
				})
				.catch((errors: any) => {
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
		if (!!sessionToken) {
			getTripsSessionToken();
		}
	}, [sessionToken, page]);
	useEffect(() => {
		const localStorageData: any = sessionStorage.getItem("flightData");
		let searchData = {};
		if (!!localStorageData) searchData = JSON.parse(localStorageData ?? "{}");
		setPage(1);
		if (!!searchData) {
			getFlightsTripsData(searchData);
		}
	}, [sessionStorage.getItem("flightData"), location]);

	return (
		<div
			className={`nc-ListingFlightsPage relative overflow-hidden ${className}`}
			data-nc-id="ListingFlightsPage"
		>
			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>
			<BgGlassmorphism />

			<div className="container relative">
				{/* SECTION HERO */}
				<SectionHeroArchivePage
					trips={trips}
					currentPage="Flights"
					currentTab="Flights"
					isLoading={loading}
					listingType={
						<>
							<i className="las la-plane-departure text-2xl"></i>
							<span className="ml-2.5">
								{trips?.length} {t("flights")}
							</span>
						</>
					}
					className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
				/>
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
				{trips.length > 0 && (
					<SectionGridFilterCard
						isLoading={loading}
						setPage={() => setPage(page + 1)}
						className="pb-24 lg:pb-28"
						trips={trips}
						paginationStatus={paginationStatus}
					/>
				)}
			</div>
		</div>
	);
};

export default ListingFlightsPage;
