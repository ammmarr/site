import React, {
	FC,
	Fragment,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Button from "shared/Button/Button";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";
import { useTranslation } from "react-i18next";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { addAddress, createPayment, getCitiesPrivate } from "api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Select from "shared/Select/Select";
import i18next from "i18next";

export interface NcModalProps {
	renderTrigger?: (openModal: Function) => ReactNode;
	contentExtraClass?: string;
	contentPaddingClass?: string;
	triggerText?: ReactNode;
	isOpenProp?: boolean;
	onCloseModal?: () => void;
}

const AddAddress: FC<any> = props => {
	const {
		contentExtraClass = "max-w-screen-md h-96 lg:h-[600px]",
		contentPaddingClass = " pb-2",
		isOpenProp,
		onCloseModal,
	} = props;
	let [isOpen, setIsOpen] = useState(!!isOpenProp);
	const [loading, setLoading] = useState<boolean>(false);
	const [location, setLocation] = useState({
		lat: 30.033333,
		lng: 31.233334,
	});
	const [name, setName] = useState<string>("");
	const [phonenumber, setPhonenumber] = useState<string>("");
	const [addressName, setAddressName] = useState<string>("");
	const [cities, setCities] = useState<any>([]);
	const [cityName, setCityName] = useState("");
	const [position, setPosition] = useState();

	const navigate = useNavigate();
	const { t } = useTranslation();

	const mapStyles = {
		height: "100%",
		width: "100%",
		marginTop: 0,
	};
	function closeModal() {
		if (typeof isOpenProp !== "boolean") {
			setIsOpen(false);
		}
		onCloseModal && onCloseModal();
	}

	useEffect(() => {
		setIsOpen(!!isOpenProp);
	}, [isOpenProp]);
	const { data } = useQuery(
		["getCities"],
		() => {
			return getCitiesPrivate();
		},
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
			},
		},
	);
	const addAdress = async () => {
		const body = {
			name: addressName,
			phone: phonenumber,
			city_id: cityName,
			map_location: {
				...location,
				address_name: addressName,
			},
		};
		if (!!body) {
			await addAddress(body)
				.then(res => {
					setLoading(false);
					closeModal();
				})
				.catch((err: any) => {
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
	return (
		<div className="nc-NcModal h-96">
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-1 text-center ">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-75"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-75"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-75"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-75"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div
								className={`my-5 inline-block  h-[600px] w-full transform  overflow-hidden rounded-2xl border border-black  border-opacity-5 bg-white align-middle text-neutral-900 shadow-xl transition-all dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:my-8 ${contentExtraClass}`}
							>
								{/* <ButtonClose
                  onClick={closeModal}
                  className="absolute transform -translate-y-1/2 left-2 top-1/2 sm:left-4"
                /> */}
								<div
									className={`${contentPaddingClass} flex flex-col gap-5 pt-10   `}
								>
									<div className="flex w-full justify-between px-2 md:px-7">
										<div className="mx-1 flex w-1/2  flex-col items-start md:w-[48%]">
											<label htmlFor="phoneNumber">{t("phoneNumber")}</label>
											<input
												type="text"
												name="phoneNumber"
												id="phoneNumber"
												className="h-10 w-full rounded border bg-gray-50 px-4"
												defaultValue={phonenumber}
												onChange={e => setPhonenumber(e.target.value)}
												placeholder={t("phoneNumber")!}
											/>
											<label htmlFor="name">{t("name")}</label>
											<input
												type="text"
												name="name"
												id="name"
												className="h-10 w-full rounded border bg-gray-50 px-4"
												defaultValue={addressName}
												onChange={e => setAddressName(e.target.value)}
												placeholder={t("name")!}
											/>
											<label htmlFor="name">{t("locationSearch")}</label>
											<Autocomplete
												className="h-10 w-full rounded border bg-gray-50 px-4"
												options={{
													types: ["(regions)"],
													componentRestrictions: { country: "eg" },
												}}
												language={i18next.language}
												apiKey={process.env.REACT_APP_MAP_KEY!}
												lang={i18next.language}
												onPlaceSelected={(place: any) => {
													setLocation({
														lat: place.geometry.location.lat(),
														lng: place.geometry.location.lng(),
													});
												}}
											/>
										</div>

										<div className="mx-1 flex w-1/2  flex-col items-start md:w-[48%]">
											<label htmlFor="name">{t("cityName")}</label>
											<Select
												className="rounded-sm md:h-10"
												defaultValue={cityName}
												onChange={e => setCityName(e.target.value)}
											>
												<option key={"empty"} value="">
													{""}
												</option>
												{cities?.length > 0 &&
													cities.map((item: any) => {
														return (
															<option key={item?.id} value={item?.id}>
																{i18next.language === "en"
																	? item?.name_en
																	: item?.name_ar}
															</option>
														);
													})}
											</Select>
										</div>
									</div>
									<ButtonPrimary loading={loading} onClick={() => addAdress()}>
										{t("addAddress")}
									</ButtonPrimary>
									<div className="h-fit w-full">
										{/* @ts-ignore */}
										<Map
											google={props.google}
											onClick={(mapProps, map, clickEvent) => {
												setLocation({
													lat: clickEvent.latLng.lat(),
													lng: clickEvent.latLng.lng(),
												});
											}}
											zoom={14}
											style={mapStyles}
											initialCenter={location}
											center={location}
										>
											{/* @ts-ignore */}
											<Marker position={location} />
										</Map>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAP_KEY!,
})(AddAddress);
