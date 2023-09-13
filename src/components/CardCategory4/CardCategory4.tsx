import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import convertNumbThousand from "utils/convertNumbThousand";

export interface CardCategory4Props {
	className?: string;
	taxonomy: TaxonomyType;
}

const CardCategory4: FC<CardCategory4Props> = ({
	className = "",
	taxonomy,
}) => {
	const { count, name, href = "/", thumbnail, listingType } = taxonomy;

	return (
		<Link
			to={href}
			className={`nc-CardCategory4 flex flex-col ${className}`}
			data-nc-id="CardCategory4"
		>
			<div
				className={`group aspect-w-5 aspect-h-4 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl sm:aspect-h-6`}
			>
				<NcImage
					src={thumbnail}
					className="h-full w-full rounded-2xl object-cover"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
			<div className="mt-4 truncate px-2 text-center">
				<h2
					className={`truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg`}
				>
					{name}
				</h2>
				<span
					className={`mt-2 block text-sm text-neutral-6000 dark:text-neutral-400`}
				>
					{convertNumbThousand(count || 0)}
					{` `}
					{(!listingType || listingType === "stay") && "properties"}
					{listingType === "car" && "cars"}
					{listingType === "experiences" && "experiences"}
				</span>
			</div>
		</Link>
	);
};

export default CardCategory4;
