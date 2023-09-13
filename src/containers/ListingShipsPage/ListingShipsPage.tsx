import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { searchTripsMaritime } from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import homeBg2 from "images/homeBg2.png";

export interface ListingFlightsPageProps {
	className?: string;
}

const DEMO_CATS: TaxonomyType[] = [
	{
		id: "1",
		href: "#",
		name: "Enjoy the Beauty of Brazil ",
		taxonomy: "category",
		count: 17288,
		thumbnail:
			"https://images.pexels.com/photos/1118877/pexels-photo-1118877.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
		listingType: "experiences",
	},
	{
		id: "2",
		href: "#",
		name: "Enjoy the Beauty of Paris",
		taxonomy: "category",
		count: 2118,
		thumbnail:
			"https://images.pexels.com/photos/2412609/pexels-photo-2412609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		listingType: "experiences",
	},
	{
		id: "3",
		href: "#",
		name: "Enjoy the Beauty of Bangkok",
		taxonomy: "category",
		count: 36612,
		thumbnail:
			"https://images.pexels.com/photos/732895/pexels-photo-732895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		listingType: "experiences",
	},
	{
		id: "5",
		href: "#",
		name: "Enjoy the Beauty of Singapore",
		taxonomy: "category",
		count: 188288,
		thumbnail:
			"https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
		listingType: "experiences",
	},
	{
		id: "4",
		href: "#",
		name: "Enjoy the Beauty of Seoul",
		taxonomy: "category",
		count: 188288,
		thumbnail:
			"https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		listingType: "experiences",
	},
];

const ListingShipsPage: FC<ListingFlightsPageProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");
	const [travelTo, setTravelTo] = useState<string>("");
	const [travelFrom, setTravelFrom] = useState<string>("");
	const [trips, setTrips] = useState<any>([]);
	const [city, setCity] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [cityFrom, setCityFrom] = useState<any>("");

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

	const getTripsMarinTime = async () => {
		setLoading(true);

		if (
			travelTo !== undefined &&
			travelTo !== "undefined" &&
			travelFrom !== "undefined" &&
			travelFrom !== undefined &&
			!!travelFrom &&
			!!travelTo
		) {
			await searchTripsMaritime(
				{ date, city_to: travelTo, city_from: travelFrom },
				page,
			)
				.then((res: any) => {
					if (res?.data?.data.length) {
						setTrips((prev: any) => [...prev, ...res?.data?.data]);
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
			getTripsMarinTime();
		}
	}, [travelTo, travelFrom, page, date]);

	return (
		<div
			className={`nc-ListingFlightsPage relative overflow-hidden ${className}`}
			data-nc-id="ListingFlightsPage"
		>
			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>
			<div className="bg-black m-0 p-0  w-[100vw] h-[65vh] block" style={{
				// backgroundImage: `url(${homeBg2})`,
				objectFit:"contain",
			}}> <img src = {homeBg2} className="object-cover w-[100%]  m-0 p-0  h-[65vh] "></img>
			</div>
			<BgGlassmorphism />

			<div className="container relative flex flex-col items-center w-[85vw] align-middle">
				{/* SECTION HERO */}
				<SectionHeroArchivePage
					currentPage="Maritime transport"
					currentTab="Maritime transport"
					isLoading={loading}
					city={city}
					trips={trips}
					listingType={
						<>
							<BriefcaseIcon className=" las la-plane-departure h-6 w-6" />

							<span className="ml-2.5">
								{trips.length} {t("ships")}
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

				{/* SECTION */}
				{/* <SectionGridFilterCard className="pb-24 lg:pb-28" /> */}
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
					/>
				)}
				{/* SECTION */}
				{/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}
			</div>
		</div>
	);
};

export default ListingShipsPage;
