import React, { FC } from "react";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";

export interface CardAuthor2Props
	extends Pick<PostDataType, "date" | "author"> {
	className?: string;
	readingTime?: PostDataType["readingTime"];
	hoverReadingTime?: boolean;
}

const CardAuthor2: FC<CardAuthor2Props> = ({
	className = "",
	author,
	readingTime,
	date,
	hoverReadingTime = false,
}) => {
	const { displayName, href = "/", avatar } = author;
	return (
		<Link
			to={href}
			className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
			data-nc-id="CardAuthor2"
		>
			<Avatar
				sizeClass="h-10 w-10 text-base"
				containerClassName="flex-shrink-0 mr-3"
				radius="rounded-full"
				imgUrl={avatar}
				userName={displayName}
			/>
			<div>
				<h2
					className={`text-sm font-medium text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white`}
				>
					{displayName}
				</h2>
				<span
					className={`mt-1 flex items-center text-xs text-neutral-500 dark:text-neutral-400`}
				>
					<span>{date}</span>
					{readingTime && (
						<>
							<span
								className={`mx-1 hidden transition-opacity lg:inline ${
									hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
								}`}
							>
								·
							</span>
							<span
								className={`hidden transition-opacity lg:inline ${
									hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
								}`}
							>
								{readingTime} min read
							</span>
						</>
					)}
				</span>
			</div>
		</Link>
	);
};

export default CardAuthor2;
