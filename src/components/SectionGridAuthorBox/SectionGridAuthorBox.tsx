import CardAuthorBox from "components/CardAuthorBox/CardAuthorBox";
import CardAuthorBox2 from "components/CardAuthorBox2/CardAuthorBox2";
import Heading from "components/Heading/Heading";
import { AuthorType } from "data/types";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface SectionGridAuthorBoxProps {
	className?: string;
	authors?: AuthorType[];
	boxCard?: "box1" | "box2";
	gridClassName?: string;
}

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
	className = "",
	authors = "",
	boxCard = "box1",
	gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
}) => {
	return (
		<div
			className={`nc-SectionGridAuthorBox relative ${className}`}
			data-nc-id="SectionGridAuthorBox"
		>
			<Heading desc="Rating based on customer reviews" isCenter>
				Top 10 author of the month
			</Heading>
			<div className={`grid gap-6 md:gap-8 ${gridClassName}`}></div>
			<div className="mt-16 flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-5">
				<ButtonSecondary>Show me more </ButtonSecondary>
				<ButtonPrimary>Become a host</ButtonPrimary>
			</div>
		</div>
	);
};

export default SectionGridAuthorBox;
