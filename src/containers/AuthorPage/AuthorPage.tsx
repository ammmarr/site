import { Tab } from "@headlessui/react";

import React, { FC, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import {
	getAddressList,
	listBus,
	listMaritime,
	listPrivates,
	searchTripsMaritime,
} from "api";
import MarinTimeCard from "components/MarinTimeCard";
import BusCard from "./BusCard";
import MaritimesCard from "./MaritimesCard";
import i18next from "i18next";
import CarCardProfile from "./CarCard";
import Avatar from "react-avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditAddress from "shared/address/Edit";
import moment from "moment";
import Button from "shared/Button/Button";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import AddAddress from "shared/address";

export interface AuthorPageProps {
	className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
	let [categories] = useState(["All", "Finished", "Pending", "Upcoming"]);
	let [topTabs] = useState(["listReservation", "allAddress"]);

	const [bus, setBus] = useState<any>([]);
	const [privates, setPrivates] = useState<any>([]);
	const [maritimes, setMritimes] = useState<any>([]);
	const [allTrips, setAllTrips] = useState<{ type: string; data: any[] }[]>([]);
	const [addressList, setAddressList] = useState<any>([]);
	const [name, setName] = useState("");
	const navigate = useNavigate();
	const [phone, setPhone] = useState("");
	const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
	const [isAddressAddOpen, setIsAddressAddOpen] = useState<boolean>(false);

	const [addressData, setAddressData] = useState<any>({});
	const [finishedTrips, setFinishedTrips] = useState<{}[]>([]);
	const [pendingTrips, setPendingTrips] = useState<{}[]>([]);
	const [upcomingTrips, setUpcomingTrips] = useState<{}[]>([]);
	const location = useLocation();

	useEffect(() => {
		let newFinishedTrips: { type: string; data: any[] }[] = [];
		for (let i = 0; i < allTrips.length; i++) {
			for (let j = 0; j < allTrips[i].data.length; j++) {
				const trip = allTrips[i].data[j];
				const timeDiff = moment().diff(trip.date, "h");
				if (timeDiff > 0) {
					newFinishedTrips.push({ data: trip, type: allTrips[i].type });
				}
			}
		}
		setFinishedTrips(newFinishedTrips);
	}, [allTrips]);

	useEffect(() => {
		let newPendingTrips: { type: string; data: any[] }[] = [];
		for (let i = 0; i < allTrips.length; i++) {
			for (let j = 0; j < allTrips[i].data.length; j++) {
				const trip = allTrips[i].data[j];
				const timeDiff = moment().diff(trip.date, "h");
				if (allTrips[i].type === "Cars") {
					if (trip.payment_status_code === "pending") {
						newPendingTrips.push({ data: trip, type: allTrips[i].type });
					}
				} else {
					if (trip.payment_data.status_code === "pending") {
						newPendingTrips.push({ data: trip, type: allTrips[i].type });
					}
				}
			}
		}
		setPendingTrips(newPendingTrips);
	}, [allTrips]);

	useEffect(() => {
		let newUpcomingTrip: { type: string; data: any[] }[] = [];
		for (let i = 0; i < allTrips.length; i++) {
			for (let j = 0; j < allTrips[i].data.length; j++) {
				const trip = allTrips[i].data[j];
				const timeDiff = moment().diff(trip.date, "h");
				//payment_status_code
				if (allTrips[i].type === "Cars") {
					if (trip.payment_status_code === "success") {
						newUpcomingTrip.push({ data: trip, type: allTrips[i].type });
					}
				} else {
					if (trip.payment_data.status_code === "success") {
						newUpcomingTrip.push({ data: trip, type: allTrips[i].type });
					}
				}
			}
		}
		setUpcomingTrips(newUpcomingTrip);
	}, [allTrips]);

	useEffect(() => {
		const newAllTripsArray = [
			{ type: "Bus", data: [...bus] },
			{ type: "Maritime transport", data: [...maritimes] },
			{ type: "Cars", data: [...privates] },
		];
		setAllTrips(newAllTripsArray);
	}, [bus, privates, maritimes]);
	useEffect(() => {
		sessionStorage.setItem("path", location?.pathname);
	}, [location]);

	useEffect(() => {
		const lName: any = localStorage.getItem("name");
		const lPhone: any = localStorage.getItem("phone");
		const lemail: any = localStorage.getItem("email");
		setName(lName);
		setPhone(lPhone);
	}, []);
	const { t } = useTranslation();
	const { data, isLoading } = useQuery(
		["getTripsMarinTime"],
		() => {
			return listPrivates();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setPrivates([...response?.data?.data]);
				}
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

	const { data: addressListData } = useQuery(
		["addressListData"],
		() => {
			return getAddressList();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setAddressList([...response?.data?.data]);
				}
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
	const { data: busListData } = useQuery(
		["busListData"],
		() => {
			return listBus();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setBus([...response?.data?.data]);
				}
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
	const { data: maritimesListData } = useQuery(
		["maritimeListData"],
		() => {
			return listMaritime();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setMritimes([...response?.data?.data]);
				}
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
	const renderCorrectCard = (tripArray: any[]) => {
		return tripArray?.map(trip => {
			const timeDiff = moment().diff(trip.data.date, "h");
			//const isPayed = trip.data.payment_data.status_code === "pending";
			const orderId = trip.data.gateway_order_id;

			if (trip.type === "Bus") {
				return (
					<BusCard
						key={trip.data.id}
						travelFrom={trip.data?.station_from?.name}
						data={trip.data}
						city={trip.data?.station_to?.name}
						cancelButton={trip?.data?.can_be_cancel}
						payButton={trip?.data?.payment_data?.status_code === "pending"}
						orderId={orderId}
						gateway={trip?.data?.gateway_id}
					/>
				);
			} else if (trip.type === "Maritime transport") {
				return (
					<MaritimesCard
						key={trip.data.id}
						travelFrom={
							i18next.language === "en"
								? trip.data?.from_location?.name_en
								: trip.data?.from_location?.name_ar
						}
						city={
							i18next.language === "en"
								? trip.data?.to_location?.name_en
								: trip.data?.to_location?.name_ar
						}
						data={trip.data}
						cancelButton={timeDiff < -2}
						payButton={trip?.data?.payment_data?.status_code === "pending"}
						orderId={orderId}
					/>
				);
			} else if (trip.type === "Cars") {
				return (
					<CarCardProfile
						key={trip.data.id}
						data={trip.data}
						cancelButton={trip?.data?.can_be_cancel}
						payButton={trip?.data?.payment_status_code === "pending"}
						orderId={orderId}
					/>
				);
			}
		});
	};
	const renderSidebar = () => {
		return (
			<div className=" flex w-full flex-col items-center space-y-6 border-neutral-200 px-0 text-center  dark:border-neutral-700 sm:space-y-7 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				<Avatar name={name} round="100px" size="150" textSizeRatio={1.75} />

				{/* ---- */}
				<div className="flex flex-col items-center space-y-3 text-center">
					<h2 className="text-3xl font-semibold">{name}</h2>
					<p className="text-xl font-semibold">0{phone}</p>
				</div>

				{/* ---- */}
				<div className="">
					<Link
						className={` w-full text-primary-6000 rtl:flex rtl:justify-center   rtl:gap-2  dark:text-neutral-50`}
						to={"/account"}
					>
						{t("editProfile")}
					</Link>
				</div>
			</div>
		);
	};

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap mx-1">
				<Tab.Group>
					<Tab.List className="flex space-x-1 overflow-x-auto">
						{topTabs.map(item => (
							<Tab key={item} as={Fragment}>
								{({ selected }) => (
									<button
										className={`block flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-medium capitalize !leading-none focus:outline-none sm:px-6 sm:py-3 sm:text-base ${
											selected
												? "bg-secondary-900 text-secondary-50 "
												: "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
										} `}
									>
										{t(item)}
									</button>
								)}
							</Tab>
						))}
					</Tab.List>
					<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
					<Tab.Panels>
						<Tab.Panel>
							<div>
								<Tab.Group>
									<Tab.List className="flex space-x-1 overflow-x-auto">
										{categories.map(item => (
											<Tab key={item} as={Fragment}>
												{({ selected }) => (
													<button
														className={`block flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-medium capitalize !leading-none focus:outline-none sm:px-6 sm:py-3 sm:text-base ${
															selected
																? "bg-secondary-900 text-secondary-50 "
																: "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
														} `}
													>
														{t(item)}
													</button>
												)}
											</Tab>
										))}
									</Tab.List>
									<Tab.Panels>
										<Tab.Panel className="">
											<div className="mt-8 grid grid-cols-1 gap-6">
												{allTrips?.length > 0 &&
													allTrips.map((item: any) => {
														if (item.type === "Bus" && item.data.length > 0) {
															return (
																<>
																	<div>{t("Bus")}</div>
																	{item.data.map((stay: any) => {
																		const timeDiff = moment().diff(
																			stay.date,
																			"h",
																		);
																		return (
																			<BusCard
																				key={stay.id}
																				travelFrom={stay?.station_from?.name}
																				data={stay}
																				city={stay?.station_to?.name}
																				cancelButton={timeDiff < -2}
																				payButton={
																					timeDiff < -2 &&
																					stay.payment_data.status_code ===
																						"pending"
																				}
																				orderId={stay.gateway_order_id}
																			/>
																		);
																	})}
																</>
															);
														} else if (
															item.type === "Maritime transport" &&
															item.data.length > 0
														) {
															return (
																<>
																	<div>{t("Maritime transport")}</div>
																	{item.data.map((item: any, index: number) => {
																		const timeDiff = moment().diff(
																			item.date,
																			"h",
																		);
																		return (
																			<MaritimesCard
																				key={item.id}
																				travelFrom={
																					i18next.language === "en"
																						? item?.from_location?.name_en
																						: item?.from_location?.name_ar
																				}
																				city={
																					i18next.language === "en"
																						? item?.to_location?.name_en
																						: item?.to_location?.name_ar
																				}
																				data={item}
																				cancelButton={timeDiff < -2}
																				payButton={
																					timeDiff < -2 &&
																					item.payment_data.status_code ===
																						"pending"
																				}
																				orderId={item.gateway_order_id}
																			/>
																		);
																	})}
																</>
															);
														} else if (
															item.type === "Cars" &&
															item.data.length > 0
														) {
															return (
																<>
																	<div>{t("Cars")}</div>
																	{item.data.map((stay: any) => {
																		const timeDiff = moment().diff(
																			stay.date,
																			"h",
																		);
																		return (
																			<CarCardProfile
																				key={stay.id}
																				data={stay}
																				cancelButton={timeDiff < -2}
																				payButton={
																					timeDiff < -2 &&
																					stay.payment_status_code === "pending"
																				}
																				orderId={stay?.gateway_order_id}
																			/>
																		);
																	})}
																</>
															);
														}
													})}
											</div>
										</Tab.Panel>
										<Tab.Panel className="">
											<div className="mt-8 grid grid-cols-1 gap-6">
												{renderCorrectCard(finishedTrips)}
											</div>
										</Tab.Panel>
										<Tab.Panel className="">
											<div className="mt-8 grid grid-cols-1 gap-6 md:gap-7">
												{renderCorrectCard(pendingTrips)}
											</div>
										</Tab.Panel>
										<Tab.Panel className="">
											<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
												{renderCorrectCard(upcomingTrips)}
											</div>
										</Tab.Panel>
									</Tab.Panels>
								</Tab.Group>
							</div>
						</Tab.Panel>
						<Tab.Panel className="">
							<div className="mt-8 block gap-6 md:gap-7">
								{addressList?.length > 0 &&
									addressList.map((item: any, index: number) => {
										return (
											<div
												className="mb-3  w-full cursor-pointer  rounded-lg border-b border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8"
												onClick={() => {
													setAddressData(item);
													setIsAddressOpen(true);
												}}
												key={item?.name}
											>
												<h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
													{item?.name}
												</h5>
												<div className="flex flex-col items-start gap-4 text-gray-900 dark:text-white">
													<p>
														{i18next.language === "en"
															? item?.city?.name_en
															: item?.city?.name_ar}
													</p>
													<p>{item?.phone}</p>
												</div>
											</div>
										);
									})}
								<ButtonPrimary
									className="col-span-4 mt-6 cursor-pointer  md:mt-2"
									onClick={() => setIsAddressAddOpen(true)}
								>
									{t("addAddress")}
								</ButtonPrimary>
							</div>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<EditAddress
					isOpenProp={isAddressOpen}
					onCloseModal={() => setIsAddressOpen(false)}
					addressData={addressData}
				/>
				<AddAddress
					isOpenProp={isAddressAddOpen}
					onCloseModal={() => setIsAddressAddOpen(false)}
				/>
			</div>
		);
	};

	return (
		<div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
			<Helmet>
				<title>Profile || Telefreik For Booking</title>
			</Helmet>
			<main className="container mt-12 mb-24 flex flex-col lg:mb-32 lg:flex-row">
				<div className="mb-24 block flex-grow lg:mb-0">
					<div className="lg:sticky lg:top-24">{renderSidebar()}</div>
				</div>
				<div className="w-full flex-shrink-0 space-y-8 lg:w-3/5 lg:space-y-10 lg:pl-10 xl:w-2/3">
					{renderSection1()}
				</div>
			</main>
		</div>
	);
};

export default AuthorPage;
