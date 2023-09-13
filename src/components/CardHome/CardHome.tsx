import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import convertNumbThousand from "utils/convertNumbThousand";

export interface CardCategory5Props {
	className?: string;
	taxonomy: TaxonomyType;
}

const CardCategory5: FC<CardCategory5Props> = ({
	className = "",
	taxonomy,
}) => {
	const { description, title, href = "/", image } = taxonomy;
	return (
		<div
			className={`nc-CardCategory5 flex flex-col ${className}`}
			data-nc-id="CardCategory5"
		>
			<div
				className={`group aspect-h-1 aspect-w-2 relative  aspect-1 flex-shrink-0 overflow-hidden rounded-2xl sm:aspect-w-4 sm:aspect-h-3`}
			>
				<NcImage
					src={image}
					className="h-full w-full rounded-2xl object-cover"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
		</div>
	);
};

export default CardCategory5;
