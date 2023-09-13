import NextPrev from "shared/NextPrev/NextPrev";
import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	fontClass?: string;
	desc?: ReactNode;
	hasNextPrev?: boolean;
	isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
	children,
	desc = "Watch the video to know more about cable car. ",
	className = "mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50",
	isCenter = false,
	hasNextPrev = false,
	...args
}) => {
	return (
		<div
			className={`nc-Section-Heading relative flex flex-col justify-between sm:flex-row sm:items-end ${className}`}
		>
			<div
				className={
					isCenter ? "mx-auto mb-4 w-full max-w-2xl text-center" : "max-w-2xl"
				}
			>
				<h2 className={`text-3xl font-semibold md:text-4xl`} {...args}>
					{children || `Section Heading`}
				</h2>
				{desc && (
					<span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-4">
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
