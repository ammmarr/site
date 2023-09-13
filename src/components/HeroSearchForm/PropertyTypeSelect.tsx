import React, { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import Checkbox from "shared/Checkbox/Checkbox";
import { PropertyType } from "components/HeroSearchForm2Mobile/PropertyTypeSelect";

export interface PropertyTypeSelectProps {
	onChange?: (data: any) => void;
	fieldClassName?: string;
	defaultValue?: PropertyType[];
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
	onChange,
	fieldClassName = "[ nc-hero-field-padding ]",
	defaultValue,
}) => {
	const [typeOfProperty, setTypeOfProperty] = React.useState<PropertyType[]>(
		defaultValue || [],
	);

	useEffect(() => {
		if (!defaultValue) return;
		setTypeOfProperty(defaultValue);
	}, defaultValue);

	let typeOfPropertyText = "";
	if (typeOfProperty && typeOfProperty.length > 0) {
		typeOfPropertyText = typeOfProperty
			.filter(item => item.checked)
			.map(item => {
				return item.name;
			})
			.join(", ");
	}
	return (
		<Popover className="relative flex flex-1">
			{({ open, close }) => (
				<>
					<Popover.Button
						className={`flex w-full flex-shrink-0 items-center text-left ${fieldClassName} cursor-pointer space-x-3 focus:outline-none ${
							open ? "nc-hero-field-focused" : ""
						}`}
						onClick={() => document.querySelector("html")?.click()}
					>
						<div className="text-neutral-300 dark:text-neutral-400">
							<svg
								className="nc-icon-field nc-icon-field-2"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
								></path>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
								></path>
							</svg>
						</div>
						<div className="flex-1">
							<span className="block overflow-hidden font-semibold xl:text-lg">
								<span className="line-clamp-1">
									{typeOfPropertyText || `Type`}
								</span>
							</span>
							<span className="mt-1 block text-sm font-light leading-none text-neutral-400 ">
								Property type
							</span>
						</div>
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
						<Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white py-5 px-4 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:py-6 sm:px-8">
							<div className="">
								<div className="relative flex flex-col space-y-5">
									{typeOfProperty.map((item, index) => (
										<div key={item.name} className="">
											<Checkbox
												name={item.name}
												label={item.name}
												subLabel={item.description}
												defaultChecked={typeOfProperty[index].checked}
												onChange={e => {
													const newState = typeOfProperty.map((item, i) => {
														if (i === index) {
															return { ...item, checked: e };
														}
														return item;
													});
													setTypeOfProperty(() => {
														return newState;
													});
													onChange && onChange(newState);
												}}
											/>
										</div>
									))}
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default PropertyTypeSelect;
