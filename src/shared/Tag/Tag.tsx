import { TaxonomyType } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface TagProps {
	className?: string;
	tag: TaxonomyType;
	hideCount?: boolean;
}

const Tag: FC<TagProps> = ({ className = "", tag, hideCount = false }) => {
	return (
		<Link
			className={`nc-Tag inline-block rounded-lg border border-neutral-100 bg-white py-2 px-3 text-sm text-neutral-6000 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-6000 md:py-2.5 md:px-4 ${className}`}
			data-nc-id="Tag"
			to={tag.href}
		>
			{`${tag.name}`}
			{!hideCount && (
				<span className="text-xs font-normal"> ({tag.count})</span>
			)}
		</Link>
	);
};

export default Tag;
