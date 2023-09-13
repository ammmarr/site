import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
	getCities,
	getCitiesMaritime,
	getCitiesPrivate,
	getFlightsLocation,
} from "api";
import i18next from "i18next";
import React, { useState, useEffect, useRef, FC } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Cities } from "types";
import { showApiErrorMessages } from "utils";

interface Props {
	onClick?: () => void;
	onChange?: (value: string) => void;
	className?: string;
	defaultValue?: string;
	headingText?: string;
	type?: string;
	setDropOffInputValue?: any;
	setPickUpInputValue?: any;
}

const LocationInput: FC<Props> = ({
	onChange = () => {},
	className = "",
	defaultValue = "",
	type,
	headingText = "Where to?",
	setDropOffInputValue,
	setPickUpInputValue,
}) => {
	const { t } = useTranslation();
	const [value, setValue] = useState("");
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const [cities, setCities] = useState<Cities[]>([]);
	const [citiesWrapper, setCitiesWrapper] = useState<Cities[]>([]);

	const searchItems = (value: string) => {
		if (!!cities && !!value) {
			const filteredData = cities.filter((item: any) => {
				return Object.values(item)
					.join("")
					.toLowerCase()
					.includes(value.toLowerCase());
			});
			setCities(filteredData);
		} else {
			setCities(citiesWrapper);
		}
	};
	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);
	const searchFlightItems = async (value: string) => {
		if (!!value) {
			await getFlightsLocation(value).then((res: any) => {
				if (res?.data?.data) {
					setCities(res?.data?.data);
				}
			});
		}
	};

	const handleSelectLocation = (item: any) => {
		// DO NOT REMOVE SETTIMEOUT FUNC
		setTimeout(() => {
			const name =
				i18next.language === "en"
					? item?.name_en ?? item?.name
					: item?.name_ar ?? item?.name;
			setValue(name);
			onChange && onChange(item);
		}, 0);
	};
	const { data } = useQuery(
		["getCities"],
		() => {
			if (type === "maritime") {
				return getCitiesMaritime();
			} else if (type === "private") {
				return getCitiesPrivate();
			} else if (type === "flight") {
				return;
			} else {
				return getCities();
			}
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (type === "maritime") {
					const filteredData = response?.data?.data?.filter((item: any) => {
						return Object.values(item).join("").toLowerCase().includes("نويبع");
					});
					const filteredData2 = response?.data?.data?.filter((item: any) => {
						return Object.values(item)
							.join("")
							.toLowerCase()
							.includes("العقبة");
					});
					setDropOffInputValue(filteredData2?.[0]);
					setPickUpInputValue(filteredData?.[0]);
				}
				setCities(response?.data?.data);

				setCitiesWrapper(response?.data?.data);
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

	const renderSearchValues = ({ heading }: { heading: string }) => {
		return (
			<>
				<p className="block text-base font-semibold">
					{heading || `${t("destinations")}`}
				</p>
				<div className="mt-3 h-40 overflow-y-auto">
					{cities?.length > 0 &&
						cities.map((item: any, index) => {
							return (
								<div
									className="mb-1 flex items-center space-x-3 py-2 text-sm"
									onClick={() => handleSelectLocation(item)}
									key={item?.name}
								>
									<MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
									<span className="">
										{i18next.language === "en"
											? item?.name_en ?? item?.name
											: item?.name_ar ?? item?.name}{" "}
									</span>
								</div>
							);
						})}
				</div>
			</>
		);
	};

	return (
		<div className={`${className}`} ref={containerRef}>
			<div className="p-5">
				<span className="block text-xl font-semibold sm:text-2xl">
					{headingText}
				</span>
				<div className="relative mt-5">
					<input
						className={`block w-full truncate rounded-xl border border-neutral-900 bg-transparent px-4 py-3 pr-12 text-base font-bold leading-none placeholder-neutral-500 placeholder:truncate focus:outline-none focus:ring-0 dark:border-neutral-200 dark:placeholder-neutral-300`}
						placeholder={`${t("searchDestinations")}`}
						value={value}
						onChange={e => {
							if (type === "flight") {
								searchFlightItems(e.currentTarget.value);
							} else {
								searchItems(e.currentTarget.value);
							}
							setValue(e.currentTarget.value);
						}}
						ref={inputRef}
					/>
					<span className="absolute right-2.5 top-1/2 -translate-y-1/2">
						<MagnifyingGlassIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-400" />
					</span>
				</div>
				<div className="mt-7">
					{value
						? renderSearchValues({
								heading: `${t("locations")}`,
						  })
						: renderSearchValues({
								heading: `${t("locations")}`,
						  })}
				</div>
			</div>
		</div>
	);
};

export default LocationInput;
