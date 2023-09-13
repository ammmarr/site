import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import GuestsInput, { GuestsObject } from "./GuestsInput";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import moment from "moment";
import { useLocation } from "react-router-dom";

const BusSearchForm = ({ setData }: any) => {
	const { t } = useTranslation();
	//
	const [fieldNameShow, setFieldNameShow] = useState<
		"locationPickup" | "locationDropoff" | "dates" | "guests" | "general"
	>("locationPickup");
	//
	const [locationInputPickUp, setLocationInputPickUp] = useState("");
	const [travelFrom, setTravelFrom] = useState<any>({});
	const [travelTo, setTravelTo] = useState<any>({});
	const [locationInputDropOff, setLocationInputDropOff] = useState("");
	const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
		startDate: null,
		endDate: null,
	});
	const { search } = useLocation();

	const [dropOffLocationType, setDropOffLocationType] = useState<
		"Round-trip" | "One-way" | ""
	>("Round-trip");
	const [flightClassState, setFlightClassState] = useState("Economy");

	const [guestInput, setGuestInput] = useState<GuestsObject>({
		guestAdults: 0,
		guestChildren: 0,
		guestInfants: 0,
	});

	useEffect(() => {
		if (!!search) {
			const data = search.slice(1).split("/");
			setLocationInputDropOff(
				decodeURIComponent(
					data?.[3] + "" !== "undefined" ? data?.[3] ?? "" : "",
				),
			);
			if (data?.[0] + "" !== "undefined" && !data?.[0]?.includes("flights")) {
				setDateRangeValue({
					startDate: moment(data?.[0] ?? ""),
					endDate: moment(data?.[0] ?? ""),
				});
			}
			setLocationInputPickUp(
				decodeURIComponent(data?.[4] + "" !== "undefined" ? data?.[4] : ""),
			);
			setTravelFrom({
				name_en: decodeURIComponent(
					data?.[4] + "" !== "undefined" ? data?.[4] : "",
				),
				name_ar: decodeURIComponent(
					data?.[4] + "" !== "undefined" ? data?.[4] : "",
				),
				id: data?.[2],
			});
			setTravelTo({
				name_en: decodeURIComponent(
					data?.[3] + "" !== "undefined" ? data?.[3] : "",
				),
				name_ar: decodeURIComponent(
					data?.[3] + "" !== "undefined" ? data?.[3] : "",
				),
				id: data?.[1],
			});
			setData(
				`/listing-bus?${moment(data?.[0] + "" ?? "")?.format("YYYY-MM-DD")}/${
					data?.[1]
				}/${data?.[2]}/${decodeURIComponent(
					data?.[3] + "" !== "undefined" ? data?.[3] : "",
				)}/${decodeURIComponent(
					data?.[4] + "" !== "undefined" ? data?.[4] : "",
				)}`,
			);
		}
	}, [search]);
	const renderInputLocationPickup = () => {
		const isActive = fieldNameShow === "locationPickup";
		return (
			<div
				className={`w-full bg-white dark:bg-neutral-800 ${
					isActive
						? "rounded-2xl shadow-lg"
						: "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow("locationPickup")}
					>
						<span className="text-neutral-400">{t("pickUp")}</span>
						<span>{locationInputPickUp || `${t("locationSearch")}`}</span>
					</button>
				) : (
					<LocationInput
						headingText={`${t("pickUp")}`}
						defaultValue={locationInputPickUp}
						onChange={(value: any) => {
							setLocationInputPickUp(
								i18next.language === "en" ? value?.name_en : value?.name_ar,
							);
							setFieldNameShow("locationDropoff");
							setTravelFrom(value);

							setData(
								`/listing-bus?${dateRangeValue?.startDate?.format(
									"YYYY-MM-DD",
								)}/${travelTo?.id}/${value?.id}/${
									i18next.language === "en"
										? travelTo?.name_en.replace("+", " ")
										: travelTo?.name_ar.replace("+", " ")
								}/${
									i18next.language === "en"
										? travelFrom?.name_en.replace("+", " ")
										: travelFrom?.name_ar.replace("+", " ")
								}`,
							);
						}}
					/>
				)}
			</div>
		);
	};

	const renderInputLocationDropoff = () => {
		const isActive = fieldNameShow === "locationDropoff";
		return (
			<div
				className={`w-full bg-white dark:bg-neutral-800 ${
					isActive
						? "rounded-2xl shadow-lg"
						: "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow("locationDropoff")}
					>
						<span className="text-neutral-400">{t("dropOff")}</span>
						<span>{locationInputDropOff || `${t("locationSearch")}`}</span>
					</button>
				) : (
					<LocationInput
						headingText={`${t("dropOff")}`}
						defaultValue={locationInputDropOff}
						onChange={(value: any) => {
							setTravelTo(value);
							setLocationInputDropOff(
								i18next.language === "en" ? value?.name_en : value?.name_ar,
							);
							setData({
								city_to: value,
								dateRangeValue,
								city_from: travelFrom,
							});
							setData(
								`/listing-bus?${dateRangeValue?.startDate?.format(
									"YYYY-MM-DD",
								)}/${value?.id}/${travelFrom?.id}/${
									i18next.language === "en"
										? travelTo?.name_en.replace("+", " ")
										: travelTo?.name_ar.replace("+", " ")
								}/${
									i18next.language === "en"
										? travelFrom?.name_en.replace("+", " ")
										: travelFrom?.name_ar.replace("+", " ")
								}`,
							);
							setFieldNameShow("dates");
						}}
					/>
				)}
			</div>
		);
	};

	const renderInputDates = () => {
		const isActive = fieldNameShow === "dates";
		const startDateString = dateRangeValue.startDate?.format("MMM DD");
		const endDateString =
			dateRangeValue?.endDate?.get("month") !==
			dateRangeValue?.startDate?.get("month")
				? dateRangeValue?.endDate?.format("MMM DD")
				: dateRangeValue?.endDate?.format("DD");
		const dateSelected =
			startDateString && endDateString
				? `${startDateString} - ${endDateString}`
				: `${startDateString || endDateString || ""}`;
		return (
			<div
				className={`w-full overflow-hidden bg-white dark:bg-neutral-800 ${
					isActive
						? "rounded-2xl shadow-lg"
						: "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium  `}
						onClick={() => setFieldNameShow("dates")}
					>
						<span className="text-neutral-400">{t("when")}</span>
						<span>{dateSelected || `${t("addDate")}`}</span>
					</button>
				) : (
					<StayDatesRangeInput
						defaultValue={dateRangeValue}
						onChange={e => {
							setDateRangeValue(e);
							setData(
								`/listing-bus?${e?.startDate?.format("YYYY-MM-DD")}/${
									travelTo?.id
								}/${travelFrom?.id}/${
									i18next.language === "en"
										? travelTo?.name_en.replace("+", " ")
										: travelTo?.name_ar.replace("+", " ")
								}/${
									i18next.language === "en"
										? travelFrom?.name_en.replace("+", " ")
										: travelFrom?.name_ar.replace("+", " ")
								}`,
							);
						}}
					/>
				)}
			</div>
		);
	};

	const renderGenerals = () => {
		const isActive = fieldNameShow === "general";
		return (
			<div
				className={`w-full overflow-hidden bg-white dark:bg-neutral-800 ${
					isActive
						? "rounded-2xl shadow-lg"
						: "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow("general")}
					>
						<span className="text-neutral-400">{t("travelType")}?</span>
						<span>{`${t(`${dropOffLocationType}`)}, ${t(
							`${flightClassState}`,
						)}`}</span>
					</button>
				) : (
					<div className="p-5">
						<span className="block text-xl font-semibold sm:text-2xl">
							{t("travelType")}?
						</span>
						<div className="relative mt-5">
							<div className="flex space-x-2">
								<div
									className={`flex cursor-pointer select-none items-center rounded-full py-1.5 px-4 text-xs font-medium ${
										dropOffLocationType === "Round-trip"
											? "bg-black text-white shadow-lg shadow-black/10"
											: "border border-neutral-300 dark:border-neutral-700"
									}`}
									onClick={e => setDropOffLocationType("Round-trip")}
								>
									{t("RoundTrip")}
								</div>
								<div
									className={`flex cursor-pointer select-none items-center rounded-full py-1.5 px-4 text-xs font-medium ${
										dropOffLocationType === "One-way"
											? "bg-black text-white shadow-lg shadow-black/10"
											: "border border-neutral-300 dark:border-neutral-700"
									}`}
									onClick={e => setDropOffLocationType("One-way")}
								>
									{t("oneWay")}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderInputGuests = () => {
		const isActive = fieldNameShow === "guests";
		let guestSelected = "";
		if (guestInput.guestAdults || guestInput.guestChildren) {
			const guest =
				(guestInput.guestAdults || 0) + (guestInput.guestChildren || 0);
			guestSelected += `${guest} ${t("guests")}`;
		}

		if (guestInput.guestInfants) {
			guestSelected += `, ${guestInput.guestInfants} ${t("infants")}`;
		}

		return (
			<div
				className={`w-full overflow-hidden bg-white dark:bg-neutral-800 ${
					isActive
						? "rounded-2xl shadow-lg"
						: "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
				}`}
			>
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow("guests")}
					>
						<span className="text-neutral-400">{t("who")}</span>
						<span>{guestSelected || `${t("addGuests")}`}</span>
					</button>
				) : (
					<GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
				)}
			</div>
		);
	};

	return (
		<div>
			<div className="w-full space-y-5">
				{renderInputLocationPickup()}
				{/*  */}
				{renderInputLocationDropoff()}
				{/*  */}
				{/* {renderGenerals()} */}
				{/*  */}
				{renderInputDates()}
				{/*  */}
				{/* {renderInputGuests()} */}
			</div>
		</div>
	);
};

export default BusSearchForm;
