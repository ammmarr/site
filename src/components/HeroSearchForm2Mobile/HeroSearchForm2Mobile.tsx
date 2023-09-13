import { Dialog, Tab, Transition, Popover } from "@headlessui/react";
import { GlobeAltIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useState } from "react";
import ButtonSubmit from "./ButtonSubmit";
import CarsSearchForm from "./CarsSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import { useTimeoutFn } from "react-use";
import BusSearchForm from "./BusSearchForm";
import MaritimeSearchForm from "./MaritimeSearchForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChangeLanguage } from "utils";

export const headerLanguage = [
	{
		id: "English",
		name: "English",
		click: () => ChangeLanguage("en"),
		active: true,
	},
	{
		id: "Arabic",
		name: "عربي",
		click: () => ChangeLanguage("ar"),
		active: true,
	},
];

const HeroSearchForm2Mobile = () => {
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);

	// FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
	const [showDialog, setShowDialog] = useState(false);
	let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
	const [data, setData] = useState<null | string>(null);
	//
	const navigate = useNavigate();
	function closeModal() {
		setShowModal(false);
	}

	function openModal() {
		setShowModal(true);
	}
	const search = () => {
		if (!!data) {
			navigate(data);
			setShowModal(false);
		}
	};
	const renderLangDropdown = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`
                ${open ? "" : "text-opacity-80"}
             group inline-flex items-center rounded-full border-neutral-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-neutral-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300`}
						>
							<GlobeAltIcon className="h-[18px] w-[18px] opacity-80" />
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
							<Popover.Panel className="absolute z-10 mt-4 w-screen max-w-[280px] px-4">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800 lg:grid-cols-2">
										{headerLanguage.map((item, index) => (
											<a
												key={index}
												onClick={() => {
													item.click();
													close();
												}}
												className={`-m-3 flex cursor-pointer items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700  ${
													item.active
														? "bg-gray-100 dark:bg-neutral-700"
														: "opacity-80"
												}`}
											>
												<div className="cursor-pointer">
													<p className="text-sm font-medium ">{item.name}</p>
												</div>
											</a>
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
	const renderButtonOpenModal = () => {
		return (
			// <div className="relative flex w-full items-center rounded-full border border-neutral-200 px-4 py-2 pr-11 font-bold shadow-lg dark:border-neutral-6000">
			// 	{renderLangDropdown()}
			// 	<button onClick={openModal} className="flex flex-row items-center">
			// 		<MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" />

			// 		<div className="ml-3 flex-1 overflow-hidden text-left">
			// 			<span className="block text-sm font-bold"> {t("whereTo")}</span>
			// 			<span className="mt-0.5 block text-xs font-bold text-neutral-500 line-clamp-1 dark:text-neutral-400">
			// 				{t("whenToPlaceholder")}
			// 			</span>
			// 		</div>

			// 		<span className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 transform items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300">
			// 			<svg
			// 				viewBox="0 0 16 16"
			// 				aria-hidden="true"
			// 				role="presentation"
			// 				focusable="false"
			// 				className="block h-4 w-4"
			// 				fill="currentColor"
			// 			>
			// 				<path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
			// 			</svg>
			// 		</span>
			// 	</button>
			// </div>
			<></>
		);
	};

	return (
		<div className="HeroSearchForm2Mobile">
			{renderButtonOpenModal()}
			<Transition appear show={showModal} as={Fragment}>
				<Dialog
					as="div"
					className="HeroSearchFormMobile__Dialog z-max relative"
					onClose={closeModal}
				>
					<div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
						<div className="flex h-full">
							<Transition.Child
								as={Fragment}
								enter="ease-out transition-transform"
								enterFrom="opacity-0 translate-y-52"
								enterTo="opacity-100 translate-y-0"
								leave="ease-in transition-transform"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-52"
							>
								<Dialog.Panel className="relative flex h-full flex-1 flex-col justify-between overflow-hidden ">
									{showDialog && (
										<Tab.Group manual>
											<div className="absolute left-4 top-4">
												<button className="" onClick={closeModal}>
													<XMarkIcon className="h-5 w-5 text-black dark:text-white" />
												</button>
											</div>

											<Tab.List className="flex w-full justify-center gap-8 pt-12 text-sm font-semibold text-neutral-500 dark:text-neutral-400 sm:text-base ">
												{[
													"",
													"Flights",
													"Maritime transport",
													"Bus",
													"Cars",
												].map((item, index) => (
													<Tab key={index} as={Fragment}>
														{({ selected }) => (
															<div className="relative select-none outline-none focus:outline-none focus-visible:ring-0">
																<div
																	className={`${
																		selected ? "text-black dark:text-white" : ""
																	}  `}
																>
																	{t(`${item}`)}
																</div>
																{selected && (
																	<span className="absolute inset-x-0 top-full border-b-2 border-black dark:border-white"></span>
																)}
															</div>
														)}
													</Tab>
												))}
											</Tab.List>
											<div className="flex flex-1 overflow-hidden px-1 pt-3">
												<Tab.Panels className="flex-1 overflow-y-auto py-4">
													<Tab.Panel>
														<div className="mt-16 flex animate-[myblur_0.4s_ease-in-out] items-center justify-center text-3xl font-bold  transition-opacity">
															{t("shouldSelectTripType")}
														</div>
													</Tab.Panel>
													<Tab.Panel>
														<div className="animate-[myblur_0.4s_ease-in-out] transition-opacity">
															<FlightSearchForm setData={setData} />
														</div>
													</Tab.Panel>
													<Tab.Panel>
														<div className="animate-[myblur_0.4s_ease-in-out] transition-opacity">
															<MaritimeSearchForm setData={setData} />
														</div>
													</Tab.Panel>
													<Tab.Panel>
														<div className="animate-[myblur_0.4s_ease-in-out] transition-opacity ">
															<BusSearchForm setData={setData} />
														</div>
													</Tab.Panel>

													<Tab.Panel>
														<div className="animate-[myblur_0.4s_ease-in-out] transition-opacity">
															<CarsSearchForm setData={setData} />
														</div>
													</Tab.Panel>
												</Tab.Panels>
											</div>
											{!!data && (
												<div className="flex justify-between border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
													<button
														type="button"
														className="flex-shrink-0 font-semibold underline"
														onClick={() => {
															setShowDialog(false);
															resetIsShowingDialog();
														}}
													>
														{t("clearAll")}
													</button>
													<ButtonSubmit
														onClick={() => {
															search();
														}}
													/>
												</div>
											)}
										</Tab.Group>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default HeroSearchForm2Mobile;
