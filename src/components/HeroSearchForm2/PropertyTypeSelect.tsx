import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import Checkbox from "shared/Checkbox/Checkbox";

// DEMO DATA
const typeOfProperty = [
	{
		name: "Duplex House",
		description: "Have a place to yourself",
		checked: true,
	},
	{
		name: "Ferme House",
		description: "Have your own room and share some common spaces",
		checked: true,
	},
	{
		name: "Chalet House",
		description:
			"Have a private or shared room in a boutique hotel, hostel, and more",
		checked: true,
	},
	{
		name: "Maison House",
		description: "Stay in a shared space, like a common room",
	},
];

export interface PropertyTypeSelectProps {
	onChange?: (data: any) => void;
	fieldClassName?: string;
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
	onChange,
	fieldClassName = "[ nc-hero-field-padding ]",
}) => {
	return (
		<Popover className="[ nc-flex-1 ] relative flex">
			{({ open, close }) => (
				<>
					<Popover.Button
						className={`flex w-full flex-shrink-0 items-center text-left ${fieldClassName} cursor-pointer space-x-3 focus:outline-none ${
							open ? "nc-hero-field-focused--2" : ""
						}`}
						onClick={() => {
							(
								(document.querySelector("#nc-site-header") as HTMLElement) ||
								null
							)?.click();
						}}
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
						<div className="flex-grow">
							<span className="block font-semibold xl:text-lg">Type</span>
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
						<Popover.Panel className="absolute left-0 top-full z-30 mt-3 w-full max-w-sm rounded-3xl bg-white py-5 px-4 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:py-6 sm:px-8">
							<div className="">
								<div className="relative flex flex-col space-y-5">
									{typeOfProperty.map(item => (
										<div key={item.name} className="">
											<Checkbox
												name={item.name}
												label={item.name}
												subLabel={item.description}
												defaultChecked={item.checked}
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
