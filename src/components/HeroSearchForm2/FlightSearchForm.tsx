import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import moment from "moment";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";

export interface DateRage {
	startDate: moment.Moment | null;
	endDate: moment.Moment | null;
}

export interface TimeRage {
	startTime: string;
	endTime: string;
}

export interface FlightSearchFormProps {
	haveDefaultValue?: boolean;
}

const flightClass = [
	{
		name: "Economy",
		href: "##",
	},
	{
		name: "Business",
		href: "##",
	},
	{
		name: "Multiple",
		href: "##",
	},
];

const FlightSearchForm: FC<FlightSearchFormProps> = ({ haveDefaultValue }) => {
	// DEFAULT DATA FOR ARCHIVE PAGE
	const defaultPickUpInputValue = "Tokyo, Jappan";
	const defaultDropOffInputValue = "Paris, France";

	// USE STATE
	const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
		startDate: null,
		endDate: null,
	});

	const [timeRangeValue, setTimeRangeValue] = useState<TimeRage>({
		startTime: "10:00 AM",
		endTime: "10:00 AM",
	});
	const [pickUpInputValue, setPickUpInputValue] = useState("");
	const [dropOffInputValue, setDropOffInputValue] = useState("");
	const [fieldFocused, setFieldFocused] = useState<
		FocusedInputShape | "dropOffInput" | null
	>(null);
	const [dropOffLocationType, setDropOffLocationType] = useState<
		"roundTrip" | "oneWay" | ""
	>("roundTrip");
	const [guests, setGuests] = useState(1);
	const [flightClassState, setFlightClassState] = useState("Economy");

	// USER EFFECT
	useEffect(() => {
		if (haveDefaultValue) {
			setDateRangeValue({
				startDate: moment(),
				endDate: moment().add(4, "days"),
			});

			setPickUpInputValue(defaultPickUpInputValue);
			setDropOffInputValue(defaultDropOffInputValue);
		}
	}, []);
	//

	const renderGuest = () => {
		return (
			<div className="">
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={`
           ${open ? "" : ""}
            inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
								onClick={() => {
									(
										(document.querySelector(
											"#nc-site-header",
										) as HTMLElement) || null
									)?.click();
								}}
							>
								<span>{`${guests} Guest`}</span>
								<ChevronDownIcon
									className={`${
										open ? "" : "text-opacity-70"
									} ml-2 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
									aria-hidden="true"
								/>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute left-1/2 z-30 mt-3 -translate-x-1/2 transform px-4 sm:px-0 ">
									<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
										<div className="relative bg-white p-4 dark:bg-neutral-800">
											<NcInputNumber
												onChange={e => setGuests(e)}
												min={1}
												defaultValue={guests}
												max={20}
											/>
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
			</div>
		);
	};

	const renderSelectClass = () => {
		return (
			<div className="">
				<Popover className="relative">
					{({ open, close }) => (
						<>
							<Popover.Button
								className={`
           ${open ? "" : ""}
            inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
								onClick={() => {
									(
										(document.querySelector(
											"#nc-site-header",
										) as HTMLElement) || null
									)?.click();
								}}
							>
								<span>{`${flightClassState}`}</span>
								<ChevronDownIcon
									className={`${
										open ? "" : "text-opacity-70"
									} ml-2 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
									aria-hidden="true"
								/>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute left-1/2 z-30 mt-3 w-screen max-w-[200px] -translate-x-1/2 transform px-4 sm:max-w-[220px] sm:px-0 ">
									<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
										<div className="relative grid bg-white p-3 dark:bg-neutral-800">
											{flightClass.map(item => (
												<a
													key={item.name}
													href={item.href}
													onClick={e => {
														e.preventDefault();
														setFlightClassState(item.name);
														close();
													}}
													className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
												>
													<p className="text-sm font-medium ">{item.name}</p>
												</a>
											))}
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
			</div>
		);
	};

	const renderRadioBtn = () => {
		return (
			<div className="flex justify-center space-x-3 pb-3">
				<div
					className={`flex cursor-pointer select-none items-center rounded-full py-1.5 px-4 text-xs font-medium ${
						dropOffLocationType === "roundTrip"
							? "bg-black text-white shadow-lg shadow-black/10"
							: "border border-neutral-300 dark:border-neutral-700"
					}`}
					onClick={e => setDropOffLocationType("roundTrip")}
				>
					Round-trip
				</div>
				<div
					className={`flex cursor-pointer select-none items-center rounded-full py-1.5 px-4 text-xs font-medium ${
						dropOffLocationType === "oneWay"
							? "bg-black text-white shadow-lg shadow-black/10"
							: "border border-neutral-300 dark:border-neutral-700"
					}`}
					onClick={e => setDropOffLocationType("oneWay")}
				>
					One-way
				</div>
				<div className="rounded-full border border-neutral-300 dark:border-neutral-700">
					{renderSelectClass()}
				</div>
				<div className="rounded-full border border-neutral-300 dark:border-neutral-700">
					{renderGuest()}
				</div>
			</div>
		);
	};

	const renderForm = () => {
		return (
			<form className="relative w-full ">
				{renderRadioBtn()}
				<div className=" flex w-full rounded-full border border-neutral-200 dark:border-neutral-700">
					<div className="relative flex flex-1">
						<LocationInput
							defaultValue={pickUpInputValue}
							onChange={e => setPickUpInputValue(e)}
							onInputDone={() => setFieldFocused("dropOffInput")}
							placeHolder="Flying from"
							desc="Where do you want to fly from?"
						/>
						<LocationInput
							defaultValue={dropOffInputValue}
							onChange={e => setDropOffInputValue(e)}
							onInputDone={() => setFieldFocused("startDate")}
							placeHolder="Flying to"
							desc="Where you want to fly to?"
							autoFocus={fieldFocused === "dropOffInput"}
						/>
					</div>
					<RentalCarDatesRangeInput
						defaultDateValue={dateRangeValue}
						defaultTimeValue={timeRangeValue}
						defaultFocus={fieldFocused === "dropOffInput" ? null : fieldFocused}
						onFocusChange={focus => setFieldFocused(focus)}
						onChange={data => {
							setDateRangeValue(data.stateDate);
							setTimeRangeValue(data.stateTimeRage);
						}}
						className="flex-1"
					/>
				</div>
			</form>
		);
	};

	return renderForm();
};

export default FlightSearchForm;
