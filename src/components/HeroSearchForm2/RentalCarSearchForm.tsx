import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import { FC } from "react";
import moment from "moment";

export interface DateRage {
	startDate: moment.Moment | null;
	endDate: moment.Moment | null;
}

export interface TimeRage {
	startTime: string;
	endTime: string;
}

export interface RentalCarSearchFormProps {
	haveDefaultValue?: boolean;
}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({
	haveDefaultValue,
}) => {
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
		"same" | "different"
	>("same");

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

	const renderRadioBtn = () => {
		return (
			<div className="flex items-center justify-center space-x-3 pb-3">
				<div
					className={`flex cursor-pointer items-center rounded-full py-1.5 px-4 text-xs font-medium ${
						dropOffLocationType === "same"
							? "bg-black text-white shadow-lg shadow-black/10"
							: "border border-neutral-300 dark:border-neutral-700"
					}`}
					onClick={e => setDropOffLocationType("same")}
				>
					Same drop off
				</div>
				<div
					className={`flex cursor-pointer items-center rounded-full py-1.5 px-4 text-xs font-medium ${
						dropOffLocationType === "different"
							? "bg-black text-white shadow-lg shadow-black/10"
							: "border border-neutral-300 dark:border-neutral-700"
					}`}
					onClick={e => setDropOffLocationType("different")}
				>
					Different drop off
				</div>
			</div>
		);
	};

	const renderForm = () => {
		return (
			<form className="relative w-full ">
				{renderRadioBtn()}
				<div className="flex w-full flex-row rounded-full border border-neutral-200 dark:border-neutral-700">
					<div className="relative flex flex-1 flex-row">
						<LocationInput
							defaultValue={pickUpInputValue}
							onChange={e => setPickUpInputValue(e)}
							onInputDone={() =>
								setFieldFocused(
									dropOffLocationType === "different"
										? "dropOffInput"
										: "startDate",
								)
							}
							placeHolder="City or Airport"
							desc="Pick up location"
						/>
						{dropOffLocationType === "different" && (
							<LocationInput
								defaultValue={dropOffInputValue}
								onChange={e => setDropOffInputValue(e)}
								onInputDone={() => setFieldFocused("startDate")}
								placeHolder="City or Airport"
								desc="Drop off location"
								autoFocus={fieldFocused === "dropOffInput"}
							/>
						)}
					</div>
					<RentalCarDatesRangeInput
						className={` ${
							dropOffLocationType === "different" ? "flex-1" : "flex-[1.3]"
						}`}
						defaultDateValue={dateRangeValue}
						defaultTimeValue={timeRangeValue}
						defaultFocus={fieldFocused === "dropOffInput" ? null : fieldFocused}
						onFocusChange={focus => setFieldFocused(focus)}
						onChange={data => {
							setDateRangeValue(data.stateDate);
							setTimeRangeValue(data.stateTimeRage);
						}}
					/>
				</div>
			</form>
		);
	};

	return renderForm();
};

export default RentalCarSearchForm;
