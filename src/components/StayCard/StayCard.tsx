import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";

export interface StayCardProps {
	className?: string;
	data?: StayDataType;
	size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard: FC<StayCardProps> = ({
	size = "default",
	className = "",
	data = DEMO_DATA,
}) => {
	const {
		galleryImgs,
		listingCategory,
		address,
		title,
		bedrooms,
		href,
		like,
		saleOff,
		isAds,
		price,
		reviewStart,
		reviewCount,
		id,
	} = data;

	const renderSliderGallery = () => {
		return (
			<div className="relative w-full">
				<GallerySlider
					uniqueID={`StayCard_${id}`}
					ratioClass="aspect-w-4 aspect-h-3 "
					galleryImgs={galleryImgs}
					href={href}
				/>
				<BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
				{saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={size === "default" ? "space-y-4 p-4" : "space-y-2 p-3"}>
				<div className="space-y-2">
					<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{listingCategory.name} · {bedrooms} beds
					</span>
					<div className="flex items-center space-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2
							className={` font-medium capitalize ${
								size === "default" ? "text-lg" : "text-base"
							}`}
						>
							<span className="line-clamp-1">{title}</span>
						</h2>
					</div>
					<div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
						{size === "default" && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						)}
						<span className="">{address}</span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
				<div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{price}
						{` `}
						{size === "default" && (
							<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
								/night
							</span>
						)}
					</span>
					{!!reviewStart && (
						<StartRating reviewCount={reviewCount} point={reviewStart} />
					)}
				</div>
			</div>
		);
	};

	return (
		<div
			className={`nc-StayCard group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-shadow will-change-transform hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
			data-nc-id="StayCard"
		>
			{renderSliderGallery()}
			<Link to={href}>{renderContent()}</Link>
		</div>
	);
};

export default StayCard;
