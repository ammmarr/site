import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import SocialsShare from "shared/SocialsShare/SocialsShare";
import { DEMO_POSTS } from "data/posts";

export interface Card12Props {
	className?: string;
	post?: PostDataType;
}

const Card12: FC<Card12Props> = ({
	className = "h-full",
	post = DEMO_POSTS[0],
}) => {
	const { title, href, featuredImage, desc, postType } = post;

	return (
		<div
			className={`nc-Card12 group relative flex flex-col ${className}`}
			data-nc-id="Card12"
		>
			<Link
				to={href}
				className="aspect-w-4 aspect-h-3 relative block h-0 w-full flex-shrink-0 flex-grow overflow-hidden rounded-3xl"
			>
				<NcImage
					containerClassName="absolute inset-0"
					src={featuredImage}
					alt={title}
				/>
				<span>
					<PostTypeFeaturedIcon
						className="absolute bottom-2 left-2"
						postType={postType}
						wrapSize="w-8 h-8"
						iconSize="w-4 h-4"
					/>
				</span>
			</Link>

			<SocialsShare className="absolute right-4 top-4 z-[-1] hidden gap-[5px] opacity-0 transition-all duration-300 group-hover:z-10 group-hover:opacity-100 md:grid" />

			<div className=" mt-8 flex flex-col pr-10">
				<h2
					className={`nc-card-title block text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100 sm:text-2xl`}
				>
					<Link to={href} className="line-clamp-2" title={title}>
						{title}
					</Link>
				</h2>
				<span className="mt-4 hidden text-neutral-500 dark:text-neutral-400 sm:block">
					<span className="line-clamp-2"> {desc}</span>
				</span>
				<PostCardMeta className="mt-5" meta={post} />
			</div>
		</div>
	);
};

export default Card12;
