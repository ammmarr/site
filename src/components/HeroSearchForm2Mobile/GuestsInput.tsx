import React, { useEffect, useState } from "react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export interface GuestsObject {
	guestAdults?: number;
	guestChildren?: number;
	guestInfants?: number;
}
export interface GuestsInputProps {
	defaultValue: GuestsObject;
	onChange?: (data: GuestsObject) => void;
	className?: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
	defaultValue,
	onChange,
	className = "",
}) => {
	const { t } = useTranslation();
	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
		defaultValue.guestAdults || 0,
	);
	const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
		defaultValue.guestChildren || 0,
	);
	const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(
		defaultValue.guestInfants || 0,
	);

	useEffect(() => {
		setGuestAdultsInputValue(defaultValue.guestAdults || 0);
	}, [defaultValue.guestAdults]);
	useEffect(() => {
		setGuestChildrenInputValue(defaultValue.guestChildren || 0);
	}, [defaultValue.guestChildren]);
	useEffect(() => {
		setGuestInfantsInputValue(defaultValue.guestInfants || 0);
	}, [defaultValue.guestInfants]);

	const handleChangeData = (value: number, type: keyof GuestsObject) => {
		let newValue = {
			guestAdults: guestAdultsInputValue,
			guestChildren: guestChildrenInputValue,
			guestInfants: guestInfantsInputValue,
		};
		if (type === "guestAdults") {
			setGuestAdultsInputValue(value);
			newValue.guestAdults = value;
		}
		if (type === "guestChildren") {
			setGuestChildrenInputValue(value);
			newValue.guestChildren = value;
		}
		if (type === "guestInfants") {
			setGuestInfantsInputValue(value);
			newValue.guestInfants = value;
		}
		onChange && onChange(newValue);
	};

	return (
		<div className={`relative flex flex-col p-5 ${className}`}>
			<span className="mb-5 block text-xl font-semibold sm:text-2xl">
				{t("whoComing")}
			</span>
			<NcInputNumber
				className="w-full"
				defaultValue={guestAdultsInputValue}
				onChange={value => handleChangeData(value, "guestAdults")}
				max={20}
				label={`${t("adults")}`}
				desc={`${t("adultsAge")}`}
			/>
			{/* <NcInputNumber
        className="w-full mt-6"
        defaultValue={guestChildrenInputValue}
        onChange={(value) => handleChangeData(value, "guestChildren")}
        max={20}
        label={`${t("children")}`}
        desc={`${t("childrenAge")}`}
      />

      <NcInputNumber
        className="w-full mt-6"
        defaultValue={guestInfantsInputValue}
        onChange={(value) => handleChangeData(value, "guestInfants")}
        max={20}
        label={`${t("infants")}`}
        desc={`${t("infantsAge")}`}
      /> */}
		</div>
	);
};

export default GuestsInput;
