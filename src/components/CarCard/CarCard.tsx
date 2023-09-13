import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import { useTranslation } from "react-i18next";
import CarImage from "../../images/car_circle.gif";
export interface CarCardProps {
	className?: string;
	size?: "default" | "small";
	travelFrom?: any;
	travel?: any;
	data?: any;
	date?: any;
	cityTo?: any;
	city?: any;
}

const CarCard: FC<CarCardProps> = ({
	size = "default",
	className = "",
	data,
	date,
}) => {
	const { t } = useTranslation();

	const renderSliderGallery = () => {
		return (
			<div className="relative w-full overflow-hidden rounded-2xl">
				<div className="aspect-w-16 aspect-h-9">
					<NcImage
						containerClassName="flex items-center justify-center"
						className="w-full"
						src={data?.bus?.featured_image}
					/>
				</div>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={size === "default" ? "space-y-4  p-5" : "space-y-2  p-3"}>
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<h2
							className={`  capitalize ${
								size === "default"
									? "text-xl font-semibold"
									: "text-base font-medium"
							}`}
						>
							<span className="line-clamp-1">{data?.company_name}</span>
						</h2>
					</div>
					<div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
						<span className="">
							{" "}
							{t("seats", { number: data?.bus?.seats_number })}
						</span>
						<span>-</span>
						<span className="">{data?.bus?.model} </span>
						<span>-</span>
						<span className="">{data?.bus?.name} </span>
						<span>-</span>
						<span className="">{data?.bus?.color} </span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
				<div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{size === "default" && (
							<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
								{t("pricePrivate", { cost: data?.price })}
							</span>
						)}
					</span>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`nc-CarCard group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-shadow will-change-transform hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
			data-nc-id="CarCard"
		>
			<Link
				to={`/checkout-private/?${date}/${data?.id}`}
				className="flex flex-col"
			>
				{renderSliderGallery()}
				{renderContent()}
			</Link>
		</div>
	);
};

export default CarCard;
