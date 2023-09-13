import React, { FC } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import { useTranslation } from "react-i18next";

export interface SectionOurFeaturesProps {
	className?: string;
	rightImg?: string;
	type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
	className = "lg:py-14",
	rightImg = rightImgPng,
	type = "type1",
}) => {
	const { t } = useTranslation();
	return (
		<div
			className={`nc-SectionOurFeatures relative flex flex-col items-center ${
				type === "type1"
					? "rtl:gap-3 lg:flex-row "
					: "rtl:gap-3 lg:flex-row-reverse "
			} ${className}`}
			data-nc-id="SectionOurFeatures"
		>
			<div className="flex-grow">
				<NcImage src={rightImg} />
			</div>
			<div
				className={`mt-10 max-w-2xl flex-shrink-0 lg:mt-0 lg:w-2/5 ${
					type === "type1" ? "lg:pl-16" : "lg:pr-16"
				}`}
			>
				<span className="text-sm uppercase tracking-widest text-gray-400">
					{t("bENnefits")}
				</span>
				<h2 className="mt-5 text-4xl font-semibold">{t("happiesCities")}</h2>

				<ul className="mt-16 space-y-10">
					<li className="space-y-4">
						<Badge name={t("quickUse")} />
						<span className="block text-xl font-semibold">{t("quick")}</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							{t("quickAccess")}
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="green" name={t("trips")} />
						<span className="block text-xl font-semibold">
							{t("followTrip")}
						</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							{t("trackingSystem")}
						</span>
					</li>
					<li className="space-y-4">
						<Badge color="red" name={t("secureSimple")} />
						<span className="block text-xl font-semibold">{t("secure")}</span>
						<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
							{t("technologies")}
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SectionOurFeatures;
