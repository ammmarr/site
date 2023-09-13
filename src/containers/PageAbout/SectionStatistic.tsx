import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import { useTranslation } from "react-i18next";

export interface Statistic {
	id: string;
	heading: string;
	subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
	{
		id: "1",
		heading: "120k",
		subHeading: "downloadHeading",
	},
	{
		id: "2",
		heading: "100,000",
		subHeading: "registeredHeading",
	},
	{
		id: "3",
		heading: "15+",
		subHeading: "partnersHeading",
	},
];

export interface SectionStatisticProps {
	className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	return (
		<div className={`nc-SectionStatistic relative ${className}`}>
			<Heading desc={t("statisticDesc")}>🚀{t("statisticHeader")}</Heading>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
				{FOUNDER_DEMO.map(item => (
					<div
						key={item.id}
						className="rounded-2xl bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-800"
					>
						<h3 className="text-2xl font-semibold leading-none text-neutral-900 dark:text-neutral-200 md:text-3xl">
							{item.heading}
						</h3>
						<span className="mt-3 block text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
							{t(`${item.subHeading}`)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default SectionStatistic;
