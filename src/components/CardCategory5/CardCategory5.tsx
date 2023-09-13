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
				className={`group aspect-w-4 aspect-h-3 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl`}
			>
				<NcImage
					src={image}
					className="h-full w-full rounded-2xl object-cover"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
			<div className="mt-4 truncate px-3">
				<h2
					className={`truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg`}
				>
					{title}
				</h2>
				<span
					className={`mt-2 block text-sm text-neutral-6000 dark:text-neutral-400`}
				>
					{description}
				</span>
			</div>
		</div>
	);
};

export default CardCategory5;
