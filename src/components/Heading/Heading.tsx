import React, { HTMLAttributes, ReactNode } from "react";
import NextPrev from "shared/NextPrev/NextPrev";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	fontClass?: string;
	desc?: ReactNode;
	hasNextPrev?: boolean;
	isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
	children,
	desc = "Popular places to stay that Telefreik  recommends for you",
	className = "mb-12 lg:mb-16 text-neutral-900 dark:text-neutral-50",
	isCenter = false,
	hasNextPrev = false,
	...args
}) => {
	return (
		<div
			id="#how-it-work"
			className={`nc-Section-Heading relative flex flex-col justify-between sm:flex-row sm:items-end ${className}`}
		>
			<div
				className={
					isCenter ? "mx-auto w-full max-w-2xl text-center" : "max-w-2xl"
				}
			>
				<h2 className={`mb-4 text-3xl font-semibold md:text-4xl`} {...args}>
					{children}
				</h2>
				{desc && (
					<span className="mt-2 block text-base font-normal text-[#69696A] dark:text-neutral-400 sm:text-xl md:mt-3">
						{desc}
					</span>
				)}
			</div>
			{hasNextPrev && !isCenter && (
				<div className="mt-4 flex flex-shrink-0 justify-end sm:ml-2 sm:mt-0">
					<NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
				</div>
			)}
		</div>
	);
};

export default Heading;
