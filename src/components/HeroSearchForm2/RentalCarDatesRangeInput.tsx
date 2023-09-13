import React, { Fragment, useEffect, useState } from "react";
import {
	AnchorDirectionShape,
	DateRangePicker,
	FocusedInputShape,
} from "react-dates";
import { DateRage } from "./StaySearchForm";
import { FC } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { TimeRage } from "./RentalCarSearchForm";
import useWindowSize from "hooks/useWindowResize";
import ButtonSubmit from "./ButtonSubmit";
import useNcId from "hooks/useNcId";

type Fields = "pickUp" | "dropOff";

export interface RentalCarDatesRangeInputProps {
	defaultDateValue: DateRage;
	defaultTimeValue: TimeRage;
	defaultFocus?: FocusedInputShape | null;
	onChange?: (data: { stateDate: DateRage; stateTimeRage: TimeRage }) => void;
	onFocusChange?: (focus: FocusedInputShape | null) => void;
	fieldClassName?: string;
	wrapFieldClassName?: string;
	className?: string;
	numberOfMonths?: number;
	anchorDirection?: AnchorDirectionShape;
}

const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
	defaultDateValue,
	defaultTimeValue,
	onChange,
	defaultFocus = null,
	onFocusChange,
	className = "",
	fieldClassName = "[ nc-hero-field-padding--small ]",
	wrapFieldClassName = " ",
	numberOfMonths,
	anchorDirection,
}) => {
	const [focusedInput, setFocusedInput] = useState(defaultFocus);
	const [stateDate, setStateDate] = useState(defaultDateValue);
	const [stateTimeRage, setStateTimeRage] = useState(defaultTimeValue);
	const startDateId = useNcId();
	const endDateId = useNcId();
	//
	useEffect(() => {
		setStateDate(defaultDateValue);
	}, [defaultDateValue]);

	useEffect(() => {
		setFocusedInput(defaultFocus);
	}, [defaultFocus]);

	useEffect(() => {
		if (onChange) {
			onChange({ stateDate, stateTimeRage });
		}
	}, [stateDate, stateTimeRage]);

	const windowSize = useWindowSize();

	const handleDateFocusChange = (focus: FocusedInputShape | null) => {
		setFocusedInput(focus);
		onFocusChange && onFocusChange(focus);
	};

	const renderEditTime = (field: Fields) => {
		const times = [
			"12:00 AM",
			"1:00 AM",
			"2:00 AM",
			"3:00 AM",
			"4:00 AM",
			"5:00 AM",
			"6:00 AM",
			"7:00 AM",
			"8:00 AM",
			"9:00 AM",
			"10:00 AM",
			"11:00 AM",
			"12:00 PM",
			"1:00 PM",
			"2:00 PM",
			"3:00 PM",
			"4:00 PM",
			"5:00 PM",
			"6:00 PM",
			"7:00 PM",
			"8:00 PM",
			"9:00 PM",
			"10:00 PM",
			"11:00 PM",
		];
		let timeValue = stateTimeRage.startTime;
		if (field === "dropOff") {
			timeValue = stateTimeRage.endTime;
		}
		return (
			<Listbox
				value={stateTimeRage.startTime}
				onChange={(time: string) => {
					if (field === "pickUp") {
						return setStateTimeRage(state => ({ ...state, startTime: time }));
					}
					setStateTimeRage(state => ({ ...state, endTime: time }));
				}}
				as="div"
				className="relative flex-shrink-0"
			>
				<Listbox.Button className="group inline-flex items-center focus:outline-none">
					<span className="text-base font-semibold lowercase">
						{`, ` + timeValue}
					</span>
					<span className="absolute -right-2 -top-2.5 z-20 ml-0.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
						<svg
							className="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeMiterlimit="10"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeMiterlimit="10"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M3 22H21"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeMiterlimit="10"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</Listbox.Button>

				<Listbox.Options className="absolute z-40 mt-5 max-h-60 min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-neutral-800 dark:ring-white/20 sm:text-sm">
					{times.map((time, index) => (
						<Listbox.Option
							key={index}
							className={({ active }) =>
								`${
									active
										? "bg-amber-100 text-amber-900"
										: "text-gray-900 dark:text-neutral-200"
								} relative cursor-default select-none py-2 pl-10 pr-4`
							}
							value={time}
						>
							{({ selected, active }) => (
								<>
									<span
										className={`${
											selected ? "font-medium" : "font-normal"
										} block truncate`}
									>
										{time}
									</span>
									{selected ? (
										<span
											className={`${
												active ? "text-amber-600" : "text-amber-600"
											}  absolute inset-y-0 left-0 flex items-center pl-3`}
										>
											<CheckIcon className="h-5 w-5" aria-hidden="true" />
										</span>
									) : null}
								</>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox>
		);
	};

	const renderInputpickUpDate = () => {
		const focused = focusedInput === "startDate";
		return (
			<div
				className={`relative flex flex-1 ${fieldClassName} cursor-pointer items-center space-x-3 ${
					focused ? "nc-hero-field-focused--2" : " "
				}`}
			>
				<div className="flex-1 ">
					<div className="absolute inset-0" />

					<div className="inline-flex items-center text-base font-semibold">
						<span className="flex-shrink-0">
							{stateDate.startDate
								? stateDate.startDate.format("DD MMM")
								: "Pick up"}
						</span>
						{stateDate.startDate && renderEditTime("pickUp")}
					</div>

					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{stateDate.startDate ? "Pick up" : `Add date`}
					</span>
				</div>
			</div>
		);
	};

	const renderInputdropOffDate = () => {
		const focused = focusedInput === "endDate";
		return (
			<div
				className={`relative flex flex-[1.8] cursor-pointer items-center ${
					focused ? "nc-hero-field-focused--2" : " "
				}`}
			>
				<div className={`flex-1 ${fieldClassName}`}>
					<div className="absolute inset-0" />

					<div className="inline-flex items-center text-base font-semibold">
						<span className="flex-shrink-0">
							{stateDate.endDate
								? stateDate.endDate.format("DD MMM")
								: "Drop off"}
						</span>
						{stateDate.endDate && renderEditTime("dropOff")}
					</div>
					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{stateDate.endDate ? "Drop off" : `Add date`}
					</span>
				</div>

				<div className="relative z-20 pr-2">
					<ButtonSubmit href="/listing-car" />
				</div>
			</div>
		);
	};

	return (
		<div
			className={`RentalCarDatesRangeInput relative z-10 flex ${className} ${
				!!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
			}`}
		>
			<div className="absolute inset-0 flex">
				<DateRangePicker
					startDate={stateDate.startDate}
					endDate={stateDate.endDate}
					focusedInput={focusedInput}
					onDatesChange={date => setStateDate(date)}
					onFocusChange={handleDateFocusChange}
					startDateId={startDateId}
					endDateId={endDateId}
					daySize={windowSize.width > 500 ? 48 : undefined}
					orientation={"horizontal"}
					showClearDates
					noBorder
					hideKeyboardShortcutsPanel
					numberOfMonths={
						numberOfMonths || (windowSize.width <= 1024 ? 1 : undefined)
					}
					anchorDirection={anchorDirection}
					reopenPickerOnClearDates
				/>
			</div>

			<div className={`${wrapFieldClassName} flex w-full`}>
				{renderInputpickUpDate()}
				{renderInputdropOffDate()}
			</div>
		</div>
	);
};

export default RentalCarDatesRangeInput;
