import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import ButtonSubmit from "./ButtonSubmit";
import { FC } from "react";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PriceRangeInput from "./PriceRangeInput";

export interface RealEstateSearchFormProps {
	haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";

const RealEstateSearchForm: FC<RealEstateSearchFormProps> = ({
	haveDefaultValue = false,
}) => {
	const [locationInputValue, setLocationInputValue] = useState("");

	//
	useEffect(() => {
		if (haveDefaultValue) {
			setLocationInputValue(defaultLocationValue);
		}
	}, []);
	//

	const renderForm = () => {
		return (
			<form className="relative flex w-full flex-col divide-y divide-neutral-200 rounded-3xl bg-white shadow-xl dark:divide-neutral-700 dark:bg-neutral-800 dark:shadow-2xl lg:flex-row lg:items-center lg:divide-y-0 lg:rounded-full xl:mt-8">
				<LocationInput
					defaultValue={locationInputValue}
					onChange={e => setLocationInputValue(e)}
				/>

				<PropertyTypeSelect />
				<PriceRangeInput />
				{/* BUTTON SUBMIT OF FORM */}
				<div className="px-4 py-4 lg:py-0">
					<ButtonSubmit href="/listing-real-estate" />
				</div>
			</form>
		);
	};

	return renderForm();
};

export default RealEstateSearchForm;
