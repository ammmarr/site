import React, { FC } from "react";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";

export interface Card3SmallProps {
	className?: string;
	post: PostDataType;
}

const Card3Small: FC<Card3SmallProps> = ({ className = "h-full", post }) => {
	const { title, href, featuredImage } = post;

	return (
		<div
			className={`nc-Card3Small relative flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between ${className}`}
			data-nc-id="Card3Small"
		>
			<Link to={href} className=" absolute inset-0" title={title}></Link>
			<div className="relative space-y-2">
				<PostCardMeta meta={{ ...post }} />
				<h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
					<Link to={href} className=" line-clamp-2" title={title}>
						{title}
					</Link>
				</h2>
			</div>

			<Link
				to={href}
				title={title}
				className={`group relative mb-5 block flex-shrink-0 overflow-hidden rounded-lg sm:ml-4 sm:mb-0 sm:w-20`}
			>
				<div className={`aspect-w-16 aspect-h-9 h-0 w-full sm:aspect-h-16`}>
					<NcImage
						containerClassName="absolute inset-0"
						className="nc-will-change-transform h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
						src={featuredImage}
						title={title}
					/>
				</div>
			</Link>
		</div>
	);
};

export default Card3Small;
