import React, { useEffect, useState } from "react";
import { SingleDatePicker, AnchorDirectionShape } from "react-dates";
import { FC } from "react";
import moment from "moment";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";
import ButtonSubmit from "./ButtonSubmit";
import i18n from "i18n";
import { useTranslation } from "react-i18next";

export interface ExperiencesDateSingleInputProps {
	defaultValue: moment.Moment | null;
	onChange?: (date: moment.Moment | null) => void;
	defaultFocus?: boolean;
	fieldClassName?: string;
	onFocusChange?: (focused: boolean) => void;
	className?: string;
	anchorDirection?: AnchorDirectionShape;
	hasButtonSubmit?: boolean;
	buttonSubmitHref?: string | any;
}

const ExperiencesDateSingleInput: FC<ExperiencesDateSingleInputProps> = ({
	defaultValue,
	onChange,
	defaultFocus = false,
	onFocusChange,
	anchorDirection,
	className = "",
	fieldClassName = "[ nc-hero-field-padding ]",
	hasButtonSubmit = true,
	buttonSubmitHref = "/",
}) => {
	const [focusedInput, setFocusedInput] = useState(defaultFocus);
	const [startDate, setStartDate] = useState(defaultValue);
	const startDateId = useNcId();
	const { t } = useTranslation();
	const windowSize = useWindowSize();

	useEffect(() => {
		setStartDate(defaultValue);
	}, [defaultValue]);

	useEffect(() => {
		setFocusedInput(defaultFocus);
	}, [defaultFocus]);

	const handleDateFocusChange = (arg: { focused: boolean }) => {
		setFocusedInput(arg.focused);
		onFocusChange && onFocusChange(arg.focused);
	};

	const renderInputCheckInDate = () => {
		const focused = focusedInput;
		return (
			<div
				className={`relative flex flex-1 ${fieldClassName} cursor-pointer items-center space-x-3 ${
					focused ? "nc-hero-field-focused" : ""
				}`}
			>
				<div className="text-neutral-300 dark:text-neutral-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="nc-icon-field"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<div className="flex-grow">
					<span className="block font-semibold xl:text-lg">
						{startDate ? startDate.format("DD MMM") : moment().format("DD MMM")}
					</span>
					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{startDate ? t("date") : t("addDate")}
					</span>
				</div>
				{hasButtonSubmit && (
					<div className="relative z-40 pr-2 xl:pr-4">
						<ButtonSubmit href={buttonSubmitHref} />
					</div>
				)}
			</div>
		);
	};

	return (
		<div
			className={`ExperiencesDateSingleInput relative flex ${className} ${
				!!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
			}`}
		>
			<div className="absolute inset-0 flex">
				<SingleDatePicker
					date={startDate}
					onDateChange={date => {
						setStartDate(date);
						onChange && onChange(date);
					}}
					id={startDateId}
					focused={focusedInput}
					daySize={windowSize.width > 1279 ? 56 : 44}
					orientation={"horizontal"}
					onFocusChange={handleDateFocusChange}
					noBorder
					hideKeyboardShortcutsPanel
					numberOfMonths={1}
					anchorDirection={anchorDirection}
					showClearDate
					reopenPickerOnClearDate
					renderMonthElement={({ month }) =>
						moment(month).locale(i18n.language).format("MMMM YYYY")
					}
					isRTL={true}
				/>
			</div>

			{renderInputCheckInDate()}
		</div>
	);
};

export default ExperiencesDateSingleInput;
