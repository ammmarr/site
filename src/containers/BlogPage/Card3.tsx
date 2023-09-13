import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";

export interface Card3Props {
	className?: string;
	post: PostDataType;
}

const Card3: FC<Card3Props> = ({ className = "h-full", post }) => {
	const { title, href, featuredImage, desc, categories, postType } = post;

	return (
		<div
			className={`nc-Card3 group relative flex flex-col-reverse rounded-[40px] sm:flex-row sm:items-center ${className}`}
			data-nc-id="Card3"
		>
			<div className="flex flex-grow flex-col">
				<div className="mb-4 space-y-5">
					<CategoryBadgeList categories={categories} />
					<div>
						<h2
							className={`nc-card-title block text-xl font-semibold text-neutral-900 dark:text-neutral-100`}
						>
							<Link to={href} className="line-clamp-2" title={title}>
								{title}
							</Link>
						</h2>
						<div className="hidden sm:mt-2 sm:block">
							<span className="text-base text-neutral-500 line-clamp-1 dark:text-neutral-400">
								{desc}
							</span>
						</div>
					</div>

					<PostCardMeta meta={{ ...post }} />
				</div>
			</div>

			<div
				className={`mb-5 block flex-shrink-0 overflow-hidden rounded-3xl sm:ml-6 sm:mb-0 sm:w-56`}
			>
				<Link
					to={href}
					className={`aspect-h-9 aspect-w-16 block h-0 w-full sm:aspect-h-16 `}
				>
					<NcImage
						containerClassName="absolute inset-0"
						src={featuredImage}
						alt={title}
					/>
					<span>
						<PostTypeFeaturedIcon
							className="absolute left-2 bottom-2"
							postType={postType}
							wrapSize="w-8 h-8"
							iconSize="w-4 h-4"
						/>
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Card3;
