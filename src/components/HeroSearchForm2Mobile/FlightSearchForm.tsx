import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import GuestsInput, { GuestsObject } from "./GuestsInput";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getFlightsClasses } from "api";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import moment from "moment";

const FlightSearchForm = ({ setData }: any) => {
	const { t } = useTranslation();
	//
	const [fieldNameShow, setFieldNameShow] = useState<
		"locationPickup" | "locationDropoff" | "dates" | "guests" | "general"
	>("locationPickup");
	//
	const [locationInputPickUp, setLocationInputPickUp] = useState("");
	const [locationInputDropOff, setLocationInputDropOff] = useState("");

	const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
		startDate: null,
		endDate: null,
	});
	const [travelFrom, setTravelFrom] = useState<any>("");
	const [travelTo, setTravelTo] = useState<any>("");
	const [dropOffLocationType, setDropOffLocationType] = useState<
		"roundTrip" | "oneWay" | ""
	>("roundTrip");
	const [flightClassState, setFlightClassState] = useState("Economy");
	const [flightClassCode, setFlightClassCode] = useState("");
	const [guests, setGuests] = useState(1);
	const navigate = useNavigate();

	const [flightClass, setFlightClass] = useState<any>([]);
	const [guestInput, setGuestInput] = useState<GuestsObject>({
		guestAdults: 0,
		guestChildren: 0,
		guestInfants: 0,
	});
	const navigateFightTrips = () => {
		sessionStorage.setItem(
			"flightData",
			JSON.stringify({
				travelFrom: travelFrom,
				travelTo: travelTo,
				rounded: dropOffLocationType,
				dateRangeValue: dateRangeValue,
				cabinClass: flightClassCode,
				round: dropOffLocationType === "oneWay" ? 1 : 2,
				origin: travelFrom?.id,
				destination: travelTo?.id,
				departureDateTime: dateRangeValue?.startDate?.format("YYYY-MM-DD"),
				arrivalDateTime: dateRangeValue?.endDate?.format("YYYY-MM-DD"),
				adults: guestInput.guestAdults,
				childrenAges: [],
				filter_by: "cheapest",
				filter_dir: "desc",
			}),
		);
		navigate("/listing-flights");
	};
	useEffect(() => {
		setData(`/listing-flights`);
	}, []);
	useEffect(() => {
		const localStorage = JSON.parse(
			sessionStorage.getItem("flightData") ?? "{}",
		);
		if (Object.keys(localStorage).length) {
			setDateRangeValue({
				startDate: moment(localStorage?.dateRangeValue?.startDate ?? ""),
				endDate: moment(localStorage?.dateRangeValue?.endDate ?? ""),
			});

			setDropOffLocationType(localStorage?.round == 1 ? "oneWay" : "roundTrip");
			setLocationInputPickUp(localStorage?.travelFrom?.name ?? "");
			setLocationInputDropOff(localStorage?.travelTo?.name ?? "");
			setFlightClassState(localStorage?.cabinClassState ?? "");
			setGuestInput({
				guestAdults: localStorage?.adults ?? 0,
			});
		}
	}, []);

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
					// <LocationInput
					//   headingText={`${t("pickUp")}`}
					//   defaultValue={locationInputPickUp}
					//   onChange={(value) => {
					//     setLocationInputPickUp(value);
					//     setFieldNameShow("dates");
					//   }}

					// />
					<LocationInput
						headingText={`${t("pickUp")}`}
						defaultValue={locationInputPickUp}
						type={"flight"}
						onChange={(value: any) => {
							setLocationInputPickUp(value?.name);
							const flightData = JSON.parse(
								sessionStorage.getItem("flightData") ?? "{}",
							);
							setFieldNameShow("locationDropoff");

							sessionStorage.setItem(
								"flightData",
								JSON.stringify({
									...flightData,
									origin: value?.id,
									travelFrom: value,
								}),
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
						<span className="text-neutral-400"> {t("dropOff")}</span>
						<span>{locationInputDropOff || `${t("locationSearch")}`}</span>
					</button>
				) : (
					<LocationInput
						headingText={`${t("dropOff")}?`}
						defaultValue={locationInputDropOff}
						type={"flight"}
						onChange={(value: any) => {
							setLocationInputDropOff(value?.name);
							setFieldNameShow("dates");
							const flightData = JSON.parse(
								sessionStorage.getItem("flightData") ?? "{}",
							);
							sessionStorage.setItem(
								"flightData",
								JSON.stringify({
									...flightData,
									destination: value?.id,
									travelTo: value,
								}),
							);
						}}
					/>
				)}
			</div>
		);
	};
	const { data } = useQuery(
		["getFlightsClasses"],
		() => {
			return getFlightsClasses();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				setFlightClass(response?.data?.data);
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
			},
		},
	);

	const renderInputDates = () => {
		const isActive = fieldNameShow === "dates";
		const startDateString = dateRangeValue.startDate?.format("MMM DD");
		const endDateString =
			dateRangeValue.endDate?.get("month") !==
			dateRangeValue.startDate?.get("month")
				? dateRangeValue.endDate?.format("MMM DD")
				: dateRangeValue.endDate?.format("DD");
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
							const flightData = JSON.parse(
								sessionStorage.getItem("flightData") ?? "{}",
							);
							sessionStorage.setItem(
								"flightData",
								JSON.stringify({
									...flightData,
									departureDateTime: e?.startDate?.format("YYYY-MM-DD"),
									arrivalDateTime: e?.endDate?.format("YYYY-MM-DD"),
									dateRangeValue: e,
								}),
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
						<span className="text-neutral-400">{t("flightType")}</span>
						<span>
							{`${t(`${dropOffLocationType}`)}, ${t(`${flightClassState}`)}`}
						</span>
					</button>
				) : (
					<div className="p-5">
						<span className="block text-xl font-semibold sm:text-2xl">
							{t("flightType")}?
						</span>
						<div className="relative mt-5">
							<div className="flex gap-2 space-x-2">
								<div
									className={`flex cursor-pointer   select-none items-center rounded-full py-1.5 px-4 text-xs font-medium ${
										dropOffLocationType === "roundTrip"
											? "bg-black text-white shadow-lg shadow-black/10"
											: "border  border-neutral-300 dark:border-neutral-700"
									}`}
									onClick={e => {
										setDropOffLocationType("roundTrip");
										const flightData = JSON.parse(
											sessionStorage.getItem("flightData") ?? "{}",
										);
										sessionStorage.setItem(
											"flightData",
											JSON.stringify({
												...flightData,
												round: 2,
											}),
										);
									}}
								>
									{t("RoundTrip")}
								</div>
								<div
									className={`flex cursor-pointer select-none items-center rounded-full py-1.5 px-4 text-xs font-medium ${
										dropOffLocationType === "oneWay"
											? "bg-black text-white shadow-lg shadow-black/10"
											: "border  border-neutral-300 dark:border-neutral-700"
									}`}
									onClick={e => {
										setDropOffLocationType("oneWay");
										const flightData = JSON.parse(
											sessionStorage.getItem("flightData") ?? "{}",
										);
										sessionStorage.setItem(
											"flightData",
											JSON.stringify({
												...flightData,
												round: 1,
											}),
										);
									}}
								>
									{t("oneWay")}
								</div>
							</div>

							<div className="mt-6">
								<label className="text-base font-semibold" htmlFor="">
									{t("ticketClass")}
								</label>
								<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
									{flightClass.map((item: any) => {
										return renderRadio("class", item?.id, item?.title);
									})}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderRadio = (
		name: string,
		id: string,
		label: string,
		defaultChecked?: boolean,
	) => {
		return (
			<div className="flex items-center ">
				<input
					defaultChecked={flightClassState === label}
					id={id + name}
					name={name}
					onChange={() => {
						setFlightClassState(label);
						setFlightClassCode(id);
						const flightData = JSON.parse(
							sessionStorage.getItem("flightData") ?? "{}",
						);
						sessionStorage.setItem(
							"flightData",
							JSON.stringify({
								...flightData,
								cabinClass: id,
								cabinClassState: label,
							}),
						);
					}}
					type="radio"
					className="!checked:bg-primary-500  h-6 w-6 border-neutral-300 bg-transparent text-primary-500 focus:ring-primary-500 rtl:ml-1"
				/>
				<label
					htmlFor={id + name}
					className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
				>
					{t(`${label}`)}
				</label>
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
			const flightData = JSON.parse(
				sessionStorage.getItem("flightData") ?? "{}",
			);
			sessionStorage.setItem(
				"flightData",
				JSON.stringify({
					...flightData,
					adults: guestInput.guestAdults,
				}),
			);
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
				{renderGenerals()}
				{/*  */}
				{renderInputDates()}
				{/*  */}
				{renderInputGuests()}
			</div>
		</div>
	);
};

export default FlightSearchForm;
