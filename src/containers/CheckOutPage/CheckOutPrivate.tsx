/* eslint-disable jsx-a11y/iframe-has-title */
import {
	CheckIcon,
	ChevronUpDownIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
	createPayment,
	createPrivateTrip,
	getAddressList,
	getCitiesPrivate,
} from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import PaymentDetailsModal from "shared/payment";
import { Listbox, Transition } from "@headlessui/react";
import i18next from "i18next";
import { useQuery } from "react-query";
import AddAddress from "shared/address";

export interface CheckOutPrivatePageProps {
	className?: string;
}
const bus_Return_Ticket = window.localStorage.getItem(
    "bus_Return_Ticket"
  );
  const travle_from_bus = JSON.stringify(bus_Return_Ticket);
const CheckOutPrivatePage: FC<CheckOutPrivatePageProps> = ({
	className = "",
}) => {
	console.log('travle_from_bus',travle_from_bus,);
	
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");
	const { t } = useTranslation();
	const [id, setId] = useState("");
	const [price, setPrice] = useState<string | number>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<number | string>("");
	const [iframe, setIframe] = useState<null | string>(null);
	let [isOpen, setIsOpen] = useState(false);
	const [tripType, setTripType] = useState<number | string>(1);
	const [cityTo, setCityTo] = useState<any>({});
	const [cityFrom, setCityFrom] = useState<any>({});
	const [travelDate, setTravelDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [cities, setCities] = useState<any>([]);
	const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!!search) {
			const data = search?.slice(1)?.split("/");
			setDate(data?.[0]);
			setId(data?.[1]);
			sessionStorage.setItem(
				"path",
				location?.pathname + `?${data?.[0]}/${data?.[1]}`,
			);
		}
	}, [search]);

	const createTicket = async () => {
		const body: any = {
			round: +tripType,
			boarding: {
				date: travelDate,
				address_id: cityFrom?.id,
			},
		};
		if (+tripType === 2) {
			body["return"] = {
				date: returnDate,
				address_id: cityTo?.id,
			};
		}
		setLoading(true);
		if (!!date) {
			await createPrivateTrip(body, id)
				.then(res => {
					if (res?.data?.data?.id) {
						setOrderId(res?.data?.data?.id);
					}
					setLoading(false);
					setPrice(res?.data?.data?.total);
					toast.success(res?.data?.message);
				})
				.catch(err => {
					setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
					if (err.response.status === 401) {
						navigate("/login");
					}
				});
		} else {
			toast.error(t("notValidData"));
			setLoading(false);
		}
	};
	const { data } = useQuery(
		["getAddressList", isAddressOpen],
		() => getAddressList(),

		{
			keepPreviousData: true,
			onSuccess: response => {
				setCities(response?.data?.data);
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
	const createPayments = async () => {
		if (!!orderId) {
			await createPayment(orderId)
				.then(res => {
					if (res?.data?.data?.url) {
						setIframe(res?.data?.data?.url);

						setIsOpen(true);
					}
					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
				});
		} else {
			toast.error(t("notFound"));
			setLoading(false);
		}
	};

	const renderMain = () => {
		return (
			<div className="flex w-full flex-col space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				<h2 className="text-3xl font-semibold lg:text-4xl">
					{t("confirmPayment")}
				</h2>
				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<div>
						<h3 className="text-2xl font-semibold">{t("tripDate")}</h3>
						<NcModal
							renderTrigger={openModal => <></>}
							renderContent={() => <></>}
							modalTitle=""
						/>
					</div>
					<div className="mt-6 flex flex-col divide-y divide-neutral-200 rounded-3xl border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 sm:flex-row sm:divide-x sm:divide-y-0">
						<ModalSelectDate
							defaultValue={date}
							onSelectDate={() => {}}
							renderChildren={({ openModal }) => (
								<button
									onClick={openModal}
									className="flex flex-1 justify-between space-x-5 p-5 text-left "
									type="button"
									disabled
								>
									<div className="flex flex-col">
										<span className="text-sm text-neutral-400">
											{t("tripDate")}
										</span>
										<span className="mt-1.5 text-lg font-semibold">{date}</span>
									</div>
									{/*<PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />*/}
								</button>
							)}
						/>
					</div>
					<div className="mt-4 mb-4 block grid-cols-1 items-center gap-4 gap-y-2 md:grid md:grid-cols-4">
						<div className=" md:col-span-2">
							<Listbox value={tripType} onChange={setTripType}>
								<label htmlFor="seatsCount">{t("tripType")}</label>

								<div className="relative">
									<Listbox.Button className="relative flex w-full cursor-default justify-start rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 dark:bg-transparent sm:text-sm">
										<span className="block truncate">
											{tripType === 1 ? t("oneWay") : t("Round-trip")}
										</span>
										<span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											<Listbox.Option
												key={2}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? "bg-gray-100 text-indigo-600"
															: "text-gray-900"
													}`
												}
												value={2}
											>
												{({ selected }) => (
													<>
														<span
															className={`block truncate ${
																selected ? "font-medium" : "font-normal"
															}`}
														>
															{t("Round-trip")}
														</span>
														{selected ? (
															<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
											<Listbox.Option
												key={2}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? "bg-gray-100 text-indigo-600"
															: "text-gray-900"
													}`
												}
												value={1}
											>
												{({ selected }) => (
													<>
														<span
															className={`block truncate ${
																selected ? "font-medium" : "font-normal"
															}`}
														>
															{t("oneWay")}
														</span>
														{selected ? (
															<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						<div className="md:col-span-2 ">
							<Listbox value={cityFrom} onChange={setCityFrom}>
								<label htmlFor="seatsCount">{t("pickingFrom")}</label>

								<div className="relative">
									<Listbox.Button className="relative  flex h-9 w-full cursor-default justify-start rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 dark:bg-transparent sm:text-sm">
										<span className="block truncate">{cityFrom?.name}</span>
										<span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{cities.length > 0 &&
												cities.map((city: any) => (
													<Listbox.Option
														key={city?.id}
														className={({ active }) =>
															`relative cursor-default select-none py-2 pl-10 pr-4 ${
																active
																	? "bg-gray-100 text-indigo-600"
																	: "text-gray-900"
															}`
														}
														value={city}
													>
														{({ selected }) => (
															<>
																<span
																	className={`block truncate ${
																		selected ? "font-medium" : "font-normal"
																	}`}
																>
																	{city?.name}
																</span>
																{selected ? (
																	<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
																		<CheckIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											<Listbox.Option
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? "bg-gray-100 text-indigo-600"
															: "text-gray-900"
													}`
												}
												value={""}
											>
												<div
													className="col-span-4 mt-6 cursor-pointer  md:mt-2"
													onClick={() => setIsAddressOpen(true)}
												>
													{t("addAddress")}
												</div>
											</Listbox.Option>
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>

						{tripType === 2 && (
							<>
								<div className="md:col-span-2 ">
									<Listbox value={cityTo} onChange={setCityTo}>
										<label htmlFor="seatsCount">{t("dropRoundOff")}</label>

										<div className="relative">
											<Listbox.Button className="relative flex h-9 w-full cursor-default justify-start rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
												<span className="block truncate">{cityTo?.name}</span>
												<span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2">
													<ChevronUpDownIcon
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</span>
											</Listbox.Button>
											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
													{cities.length > 0 &&
														cities.map((city: any) => (
															<Listbox.Option
																key={city?.id}
																className={({ active }) =>
																	`relative cursor-default select-none py-2 pl-10 pr-4 ${
																		active
																			? "bg-gray-100 text-indigo-600"
																			: "text-gray-900"
																	}`
																}
																value={city}
															>
																{({ selected }) => (
																	<>
																		<span
																			className={`block truncate ${
																				selected ? "font-medium" : "font-normal"
																			}`}
																		>
																			{city?.name}
																		</span>
																		{selected ? (
																			<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
																				<CheckIcon
																					className="h-5 w-5"
																					aria-hidden="true"
																				/>
																			</span>
																		) : null}
																	</>
																)}
															</Listbox.Option>
														))}
												</Listbox.Options>
											</Transition>
										</div>
									</Listbox>
								</div>

								<div className=" md:col-span-2">
									<label htmlFor="returnDate">{t("returnDate")}</label>
									<input
										type="datetime-local"
										name="returnDate"
										id="returnDate"
										className="h-10 w-full rounded border bg-gray-50 px-4"
										defaultValue={returnDate}
										onChange={e => setReturnDate(e.target.value)}
										required
										placeholder={t("returnDate")!}
									/>
								</div>
							</>
						)}
						<div className=" md:col-span-2">
							<label htmlFor="travelDate">{t("travelDate")}</label>
							<input
								type="datetime-local"
								name="travelDate"
								id="travelDate"
								className="h-10 w-full rounded border bg-gray-50 px-4"
								defaultValue={travelDate}
								onChange={e => setTravelDate(e.target.value)}
								required
								placeholder={t("travelDate")!}
							/>
						</div>
					</div>
				</div>

				<div>
					{!!price && (
						<div className="my-3 w-full">
							<p className="text-lg text-green-500">
								{t("totalPrice", { total: price })}
							</p>
						</div>
					)}

					<div className="mt-6">
						<div className="pt-8">
							{!orderId && (
								<ButtonPrimary loading={loading} onClick={() => createTicket()}>
									{t("confirmTicket")}
								</ButtonPrimary>
							)}
							{!!orderId && (
								<ButtonPrimary
									loading={loading}
									onClick={() => createPayments()}
								>
									{t("confirmPay")}
								</ButtonPrimary>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};
	// if (!!iframe) return <></>;

	return (
		<div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
			<main className="container mb-24 mt-11 flex flex-col-reverse lg:mb-32 lg:flex-row">
				<div className="w-full lg:w-3/5 lg:pr-10 xl:w-2/3 ">{renderMain()}</div>
			</main>
			<PaymentDetailsModal
				iframe={iframe}
				isOpenProp={isOpen}
				onCloseModal={() => setIsOpen(false)}
			/>
			<AddAddress
				isOpenProp={isAddressOpen}
				onCloseModal={() => setIsAddressOpen(false)}
			/>
		</div>
	);
};

export default CheckOutPrivatePage;
