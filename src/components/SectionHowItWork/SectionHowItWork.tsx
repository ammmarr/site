import Heading from "components/Heading/Heading";
import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import HIW1img from "images/HIW1.png";
import HIW2img from "images/HIW2.png";
import HIW3img from "images/HIW3.png";
import VectorImg from "images/VectorHIW.svg";
import { useTranslation } from "react-i18next";

export interface SectionHowItWorkProps {
	className?: string;
	data?: {
		id: number;
		title: string;
		desc: string;
		img: string;
		imgDark?: string;
	}[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
	{
		id: 1,
		img: HIW1img,
		title: "bookRelax",
		desc: "bookDesc",
	},
	{
		id: 2,
		img: HIW2img,
		title: "smartCheckList",
		desc: "checklistDesc",
	},
	{
		id: 3,
		img: HIW3img,
		title: "saveMore",
		desc: "advancedSetting",
	},
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
	className = "",
	data = DEMO_DATA,
}) => {
	const { t } = useTranslation();
	return (
		<div
			className={`nc-SectionHowItWork  ${className}`}
			data-nc-id="SectionHowItWork"
		>
			<Heading isCenter desc={t("keepCalm")}>
				{t("howIt")}
			</Heading>
			<div className="relative mt-20 grid gap-20 md:grid-cols-3">
				<img
					className="absolute inset-x-0 top-10 hidden md:block"
					src={VectorImg}
					alt=""
				/>
				{data.map(item => (
					<div
						key={item.id}
						className="relative mx-auto flex max-w-xs flex-col items-center"
					>
						{item.imgDark ? (
							<>
								<NcImage
									containerClassName="dark:hidden block mb-8 max-w-[200px] mx-auto"
									src={item.img}
								/>
								<NcImage
									containerClassName="hidden dark:block mb-8 max-w-[200px] mx-auto"
									src={item.imgDark}
								/>
							</>
						) : (
							<NcImage
								containerClassName="mb-8 max-w-[200px] mx-auto"
								src={item.img}
							/>
						)}
						<div className="mt-auto text-center">
							<h3 className="text-xl font-semibold">{t(item.title)}</h3>
							<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
								{t(item.desc)}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SectionHowItWork;
