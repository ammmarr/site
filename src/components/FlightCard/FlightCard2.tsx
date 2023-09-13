import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import plane from "../../images/plane_2.jpg";
import moment from "moment";
export interface FlightCardProps {
	className?: string;
	data: any;
}

const FlightCardComponent: FC<FlightCardProps> = ({ className = "", data }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();
	const travelDate = new Date(data?.depart_trip?.departureDateTime);
	const arrivalDate = new Date(data?.depart_trip?.arrivalDateTime);
	const totalMinutes = data?.depart_trip?.durationInMinutes;
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const [dataTravel, setDataTravel] = useState<any>({});
	useEffect(() => {
		const local = sessionStorage.getItem("flightData");
		setDataTravel(JSON.parse(local ?? ""));
	}, []);

	const renderDetailTop = (trip: any) => {
		return (
			<a href={trip?.url} target="_blank" rel="norefence">
				<div className="flex flex-col md:flex-row ">
					<div className="w-24 flex-shrink-0 md:w-20 md:pt-7 lg:w-24">
						<img
							src={data?.depart_trip?.carriers?.[0]?.imageUrl}
							className="w-16"
							alt=""
						/>
					</div>
					<div className="my-5 flex md:my-0">
						<div className="flex flex-shrink-0 flex-col items-center py-2">
							<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
							<span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
							<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
						</div>
						<div className="ml-4 space-y-10 text-sm">
							<div className="flex flex-col space-y-1 rtl:mr-2">
								<span className=" text-neutral-500 dark:text-neutral-400 ">
									{data?.depart_trip?.departureDateTime}
								</span>
								{/* <span className=" font-semibold">
                  Tokyo International Airport (HND)
                </span> */}
							</div>
							<div className="flex flex-col space-y-1 rtl:mr-2">
								<span className=" text-neutral-500 dark:text-neutral-400">
									{data?.depart_trip?.arrivalDateTime}
								</span>
								{/* <span className=" font-semibold">
                  Singapore International Airport (SIN)
                </span> */}
							</div>
						</div>
					</div>
					<div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
					<ul className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400 md:space-y-2">
						<li>{t("tripCost", { price: trip?.price })}</li>
						<li>{t("flyCompany", { name: trip?.agent?.name })}</li>
						<li>{t("rateCompany", { rate: trip?.agent?.rating })}</li>
					</ul>
				</div>
			</a>
		);
	};

	const renderDetail = (trip: any) => {
		if (!isOpen) return null;
		return (
			<div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700 md:p-8 ">
				{renderDetailTop(trip)}
				<div className="my-7 space-y-5 md:my-10 md:pl-24">
					<div className="border-t border-neutral-200 dark:border-neutral-700" />
					<div className="text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
						{t("transitTime", { time: data?.depart_trip?.durationInMinutes })}
					</div>
					<div className="border-t border-neutral-200 dark:border-neutral-700" />
				</div>
				{/* {renderDetailTop()} */}
			</div>
		);
	};

	return (
		<div
			className={`nc-FlightCardgroup relative space-y-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white
     p-4 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 ${className}`}
			data-nc-id="FlightCard"
		>
			<div
				className={`relative   ltr:lg:pr-20 rtl:lg:pl-20  ${className}`}
				data-nc-id="FlightCard"
			>
				{/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
				<a href="##" className="absolute inset-0" />

				<span
					className={`absolute bottom-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-50 ltr:right-0 rtl:left-0 dark:bg-neutral-800 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${
						isOpen ? "-rotate-180 transform" : ""
					}`}
					onClick={() => setIsOpen(!isOpen)}
				>
					<i className="las la-angle-down text-xl"></i>
				</span>

				<div className="flex  flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0">
					{/* LOGO IMG */}
					<div className="w-24 flex-shrink-0 lg:w-32">
						<img src={plane} className="w-12" alt="" />
					</div>

					{/* FOR MOBILE RESPONSIVE */}
					<div className="block space-y-1 lg:hidden">
						{/* <div className="flex font-semibold">
              <div>
                <span>{travelDate?.getHours()}</span>
                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                  HND
                </span>
              </div>
              <span className="w-12 flex justify-center">
                <i className=" text-2xl las la-long-arrow-alt-right"></i>
              </span>
              <div>
                <span>20:00</span>
                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
                  SIN
                </span>
              </div>
            </div> */}
						{/* 
            <div className="text-sm text-neutral-500 font-normal mt-0.5">
              <span className="VG3hNb">Nonstop</span>
              <span className="mx-2">·</span>
              <span>7h 45m</span>
              <span className="mx-2">·</span>
              <span>HAN</span>
            </div> */}
					</div>

					{/* TIME - NAME */}
					<div className="block  flex-[4] lg:min-w-[150px] ">
						<div className="text-lg font-medium">
							{travelDate?.getHours() + ":00"} -{" "}
							{arrivalDate?.getHours() + ":00"}
						</div>
						<div className="mt-0.5 text-sm font-normal text-neutral-500">
							{data?.airlines?.name}
						</div>
					</div>

					{/* TIMME */}
					<div className="block flex-[4] whitespace-nowrap">
						<div className="text-lg font-medium">
							{" "}
							{dataTravel?.travelFrom?.cityName} -{" "}
							{dataTravel?.travelTo?.cityName}
						</div>
						<div className="mt-0.5 text-sm font-normal text-neutral-500">
							{t("hours", { hours })} - {t("minutes", { minutes })}
						</div>
					</div>

					{/* TYPE */}
					<div className="flex flex-[4] items-center gap-1 whitespace-nowrap ltr:sm:-mr-12 rtl:sm:-ml-10 md:mr-0 md:ml-0">
						<div className="text-lg font-medium">
							{t("stop", { counts: data?.depart_trip?.segments?.length })}
						</div>
						<div className="text-lg font-medium">
							{t("offers", { counts: data?.offers?.length })}
						</div>
					</div>

					{/* PRICE */}
					<div className="flex-[4]  whitespace-nowrap rtl:sm:text-right">
						<div className="mt-0.5 text-xs   font-normal text-secondary-6000 sm:text-sm">
							{Object.keys(data?.return_trip)?.length > 0
								? t("RoundTrip")
								: t("oneWay")}
						</div>
					</div>
				</div>
			</div>

			{/* DETAIL */}
			{data?.offers?.map((trip: any) => {
				return renderDetail(trip);
			})}
		</div>
	);
};

export default FlightCardComponent;
