import { DateRage } from "components/HeroSearchForm/StaySearchForm";

const converSelectedDateToString = ({ startDate }: any) => {
	const dateSelectedString = startDate ? `${startDate}` : `${startDate || ""}`;
	return dateSelectedString;
};

export default converSelectedDateToString;
