import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import convertNumbThousand from "utils/convertNumbThousand";

export interface CardCategory3Props {
	className?: string;
	taxonomy: TaxonomyType;
}

const CardCategory3: FC<CardCategory3Props> = ({
	className = "",
	taxonomy,
}) => {
	const { title, href = "/", image } = taxonomy;
	return (
		<Link
			to={href}
			className={`nc-CardCategory3 flex flex-col ${className}`}
			data-nc-id="CardCategory3"
		>
			<div
				className={`group aspect-w-5 aspect-h-4 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl sm:aspect-h-7`}
			>
				<NcImage
					src={image}
					className="h-full w-full rounded-2xl object-cover"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
			<div className="mt-4 truncate">
				<h2
					className={`truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg`}
				>
					{title}
				</h2>
				<span
					className={`mt-2 block text-sm text-neutral-6000 dark:text-neutral-400`}
				>
					{/* {convertNumbThousand(count || 0)} properties */}
				</span>
			</div>
		</Link>
	);
};

export default CardCategory3;
