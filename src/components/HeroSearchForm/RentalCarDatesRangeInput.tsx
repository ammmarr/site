import React, { Fragment, useEffect, useState } from "react";
import {
	AnchorDirectionShape,
	DateRangePicker,
	FocusedInputShape,
} from "react-dates";
import { DateRage } from "./StaySearchForm";
import { FC } from "react";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";

export interface RentalCarDatesRangeInputProps {
	defaultDateValue: DateRage;
	defaultFocus?: FocusedInputShape | null;
	onChange?: (data: { stateDate: DateRage }) => void;
	onFocusChange?: (focus: FocusedInputShape | null) => void;
	fieldClassName?: string;
	wrapFieldClassName?: string;
	className?: string;
	numberOfMonths?: number;
	anchorDirection?: AnchorDirectionShape;
	buttonSubmitHref?: string | any;
	hasButtonSubmit?: boolean;
	flightClassState?: any;
	flightClass?: any;
	onChangeFlightClass?: any;
	guests?: any;
	onChangeGuests?: any;
	type?: string;
}

const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
	defaultDateValue,
	onChange,
	defaultFocus = null,
	onFocusChange,
	className = "",
	fieldClassName = "[ nc-hero-field-padding ]",
	wrapFieldClassName = "flex relative",
	numberOfMonths,
	anchorDirection,
	buttonSubmitHref = () => {},
	hasButtonSubmit = true,
	flightClassState,
	flightClass,
	onChangeFlightClass,
	guests,
	onChangeGuests,
	type,
}) => {
	const [focusedInput, setFocusedInput] = useState(defaultFocus);
	const [stateDate, setStateDate] = useState(defaultDateValue);
	const startDateId = useNcId();
	const endDateId = useNcId();
	const { t, i18n } = useTranslation();
    const [END_DATE , setEND_DATE] = useState()

	window.localStorage.setItem("busEndDate" , JSON.stringify(END_DATE))
	

	useEffect(() => {
		const end_date:any = stateDate?.endDate?.format("YYYY-MM-DD")    
		setEND_DATE(end_date)
	} , [stateDate.endDate])

	useEffect(() => {
		setStateDate(defaultDateValue);
	}, [defaultDateValue]);

	useEffect(() => {
		setFocusedInput(defaultFocus);
	}, [defaultFocus]);

	const windowSize = useWindowSize();

	const handleDateFocusChange = (focus: FocusedInputShape | null) => {
		setFocusedInput(focus);
		onFocusChange && onFocusChange(focus);
	};

	const renderInputpickUpDate = () => {
		const focused = focusedInput === "startDate";
		return (
			<div
				className={`relative  flex  max-sm:w-full  ${type === "maritime"? 'w-[34vw]' :type === "bus"?" w-[25vw]":type === "cars" ?"w-[30vw]":"w-[14vw]"}   ${fieldClassName}cursor-pointer items-center  gap-[10px] rounded-full border-[1px]  border-[#E8ECF2]  text-left focus:outline-none sm:flex-shrink-0 sm:rounded-[4px]  ${className} ${
					focused ? "nc-hero-field-focused" : " "
				}`}
			>
				<div className="text-neutral-300 dark:text-neutral-400">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z"
							stroke="#B9C4D5"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<span
						className={`mt-1 flex text-sm font-light leading-none text-neutral-400 ${className}`}
					>
						{stateDate.startDate && stateDate.endDate
							? <div className="text-[12px]">{stateDate.startDate.format("DD MMM")} to {stateDate.endDate.format("DD MMM")}</div>
							: "Enter date"}
					</span>
				</div>
			</div>
		);
	};

	const renderGuest = () => {
		return (
			<div className="">
				<Popover className="relative ">
					{({ open }) => (
						<>
							<Popover.Button
								className={`
           ${open ? "" : ""}
            inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
								onClick={() => document.querySelector("html")?.click()}
							>
								<span className="text-sm font-light leading-none text-neutral-400 ">
									{`${guests} ${t("guest")}`}
								</span>
								<ChevronDownIcon
									className={`${
										open ? "" : "text-opacity-70"
									} ml-2 h-4 w-4 text-neutral-400 transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
								<Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 ">
									<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
										<div className="relative bg-white p-4 dark:bg-neutral-800">
											<NcInputNumber
												onChange={e => {
													onChangeGuests(e);
												}}
												defaultValue={guests}
												min={1}
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
            inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
								onClick={() => document.querySelector("html")?.click()}
							>
								<span className="text-sm font-light leading-none text-neutral-400 ">
									{`${t(flightClassState)}`}
								</span>
								<ChevronDownIcon
									className={`${
										open ? "" : "text-opacity-70"
									} ml-2 h-4 w-4 text-neutral-400 transition duration-150 ease-in-out  group-hover:text-opacity-80`}
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
								<Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-[200px] -translate-x-1/2 transform px-4 sm:max-w-[220px] sm:px-0 ">
									<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
										<div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800 ">
											{flightClass?.length > 0 &&
												flightClass.map((item: any) => (
													<a
														key={item?.title}
														href={item?.id}
														onClick={e => {
															e.preventDefault();
															onChangeFlightClass(item?.title, item?.id);
															close();
														}}
														className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
													>
														<p className="text-sm font-medium ">
															{t(item?.title)}
														</p>
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

	// const renderInputdropOffDate = () => {
	//   const focused = focusedInput === "endDate";
	//   return (
	//     <div
	//       className={`flex relative z-40 flex-[1.8] items-center cursor-pointer ${
	//         focused ? "nc-hero-field-focused" : " "
	//       }`}>
	//       <div className={`flex-1 flex ${fieldClassName} space-x-3 items-center`}>
	//         <div className='text-neutral-300 dark:text-neutral-400'>
	//           <svg
	//             xmlns='http://www.w3.org/2000/svg'
	//             className='nc-icon-field'
	//             fill='none'
	//             viewBox='0 0 24 24'
	//             stroke='currentColor'>
	//             <path
	//               strokeLinecap='round'
	//               strokeLinejoin='round'
	//               strokeWidth={1.5}
	//               d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
	//             />
	//           </svg>
	//         </div>
	//         <div className='flex-1'>
	//           <div className='absolute inset-0' />

	//           <div className='inline-flex items-center text-base font-semibold xl:text-lg'>
	//             <span className='flex-shrink-0'>
	//               {stateDate.endDate
	//                 ? stateDate.endDate.format("DD MMM")
	//                 : t("dropOff")}
	//             </span>
	//           </div>
	//           <span className='block mt-1 text-sm font-light leading-none text-neutral-400'>
	//             {stateDate.endDate ? t("dropOff") : t("addDate")}
	//           </span>
	//         </div>
	//       </div>
	//       {hasButtonSubmit && (
	//         <div className='relative z-20 pr-2 xl:pr-4'>
	//           <ButtonSubmit href={buttonSubmitHref} />
	//         </div>
	//       )}
	//     </div>
	//   );
	// };

	return (
		<>
			<div
				className={` relative z- flex pt-3 sm:pt-0 ${className} ${
					!!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
				}   max-sm:w-full ${type === "maritime"? 'w-[34vw]' :type === "bus"?" w-[25vw]":type === "cars" ?"w-[30vw] mr-0":"w-[14vw]"}   `}
			>
				<div className={`absolute inset-0   flex ${type === "maritime"? 'w-[34vw]' :type === "bus"?" w-[25vw]":type === "cars" ?"w-[30vw] ":"w-[14vw]"}  `}  >
					<DateRangePicker
						startDate={stateDate.startDate}
						endDate={stateDate.endDate}
						focusedInput={focusedInput}
						onDatesChange={date => {
							setStateDate(date);
							onChange && onChange({ stateDate: date });
						}}
						onFocusChange={handleDateFocusChange}
						startDateId={startDateId}
						endDateId={endDateId}
						daySize={windowSize.width > 1279 ? 54 : 44}
						orientation={"horizontal"}
						showClearDates
						noBorder
						hideKeyboardShortcutsPanel
						numberOfMonths={
							numberOfMonths || (windowSize.width < 1024 ? 1 : undefined)
						}
						anchorDirection={anchorDirection}
						renderMonthElement={({ month }) =>
							moment(month).locale(i18n.language).format("MMMM YYYY")
						}
						reopenPickerOnClearDates
						isRTL={i18n.language === "ar" ? true : false}
					/>
				</div>

				{renderInputpickUpDate()}
				{/* {renderInputdropOffDate()} */}
			</div>
			
			<div className={`mt-2  flex justify-between ${type === "flight" ?"w-[20vw] ":type === "bus" ?"w-[10vw]":type === "cars" ?"bg-black":"w-[12vw] ml-[8vw]"}   h-[56px] lg:gap-[10px] max-sm:w-full md:gap-1 max-sm:gap-2  sm:mt-0 sm:flex-row sm:justify-start sm:gap-8 max-sm:ml-0`}>
			{type !== "cars"?
				(<>
				{type !== "maritime"? <div className="flex w-[9.5vw] max-sm:w-full items-center mx-auto max-sm:h-[48px] max-sm:rounded-3xl  justify-center rounded-[4px] border-[1px] border-[#E8ECF2]  ">
					{renderGuest()}
				</div>:""}
				</>)
				:<></>
				}

				{type === "flight" && (
					<div className="flex w-[9.5vw]  items-center justify-center max-sm:w-full  rounded-full border-[1px] border-[#E8ECF2] py-3  sm:rounded-[4px]  sm:py-[25px]">
						{renderSelectClass()}
					</div>
				)}
			</div>
			{hasButtonSubmit && (
				<button
					onClick={buttonSubmitHref}
					type="button"
					className="flex h-[45px] w-[45px] max-sm:w-full max-sm:py-6 items-center justify-center rounded-full bg-[#1D4078]  text-neutral-50 hover:bg-primary-700 focus:outline-none sm:mt-0  sm:py-0"
				>
					<span className="mr-3 hidden max-sm:block">Search & compare</span>
					<svg
						width="33"
						height="34"
						viewBox="0 0 33 34"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M14.4375 5.65628C13.2187 5.65628 12.0118 5.89635 10.8857 6.36277C9.75967 6.8292 8.73651 7.51285 7.87467 8.3747C7.01282 9.23654 6.32917 10.2597 5.86274 11.3857C5.39632 12.5118 5.15625 13.7187 5.15625 14.9375C5.15625 16.1564 5.39632 17.3633 5.86274 18.4893C6.32917 19.6154 7.01282 20.6385 7.87467 21.5004C8.73651 22.3622 9.75967 23.0459 10.8857 23.5123C12.0118 23.9787 13.2187 24.2188 14.4375 24.2188C16.899 24.2188 19.2598 23.2409 21.0003 21.5004C22.7409 19.7598 23.7188 17.3991 23.7188 14.9375C23.7188 12.476 22.7409 10.1153 21.0003 8.3747C19.2598 6.63412 16.899 5.65628 14.4375 5.65628ZM3.09375 14.9375C3.09399 13.1158 3.53298 11.3209 4.37359 9.70469C5.21419 8.08848 6.43168 6.6985 7.92307 5.65232C9.41447 4.60614 11.1359 3.93454 12.9417 3.69433C14.7476 3.45411 16.5847 3.65235 18.2977 4.27228C20.0107 4.89221 21.5492 5.91559 22.7831 7.25585C24.017 8.59611 24.9099 10.2138 25.3864 11.9722C25.8629 13.7305 25.9088 15.5777 25.5204 17.3576C25.132 19.1374 24.3207 20.7976 23.155 22.1975L29.6038 28.6463C29.7051 28.7407 29.7863 28.8545 29.8427 28.981C29.8991 29.1075 29.9294 29.2441 29.9318 29.3826C29.9343 29.521 29.9088 29.6586 29.8569 29.787C29.8051 29.9154 29.7279 30.032 29.6299 30.13C29.532 30.2279 29.4154 30.3051 29.2869 30.3569C29.1585 30.4088 29.021 30.4343 28.8825 30.4318C28.7441 30.4294 28.6075 30.3991 28.481 30.3427C28.3545 30.2864 28.2407 30.2051 28.1462 30.1038L21.6975 23.655C20.0409 25.0348 18.0255 25.914 15.8872 26.1895C13.7489 26.465 11.5764 26.1255 9.62419 25.2107C7.67195 24.2959 6.02083 22.8437 4.86424 21.0243C3.70766 19.2048 3.09351 17.0935 3.09375 14.9375Z"
							fill="white"
						/>
					</svg>
				</button>
			)}
		</>
	);
};

export default RentalCarDatesRangeInput;
