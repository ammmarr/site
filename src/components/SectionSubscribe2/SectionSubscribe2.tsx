import React, { FC } from "react";
import ButtonCircle from "shared/Button/ButtonCircle";
import rightImg from "images/SVG-subcribe2.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import Input from "shared/Input/Input";

export interface SectionSubscribe2Props {
	className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
	return (
		<div
			className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
			data-nc-id="SectionSubscribe2"
		>
			<div className="mb-10 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
				<h2 className="text-4xl font-semibold">Join our newsletter 🎉</h2>
				<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
					Read and share new perspectives on just about any topic. Everyone’s
					welcome.
				</span>
				<ul className="mt-10 space-y-4">
					<li className="flex items-center space-x-4">
						<Badge name="01" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							Get more discount
						</span>
					</li>
					<li className="flex items-center space-x-4">
						<Badge color="red" name="02" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							Get premium magazines
						</span>
					</li>
				</ul>
				<form className="relative mt-10 max-w-sm">
					<Input
						required
						aria-required
						placeholder="Enter your email"
						type="email"
						rounded="rounded-full"
					/>
					<ButtonCircle
						type="submit"
						className="absolute top-1/2 right-[5px] -translate-y-1/2 transform"
					>
						<i className="las la-arrow-right text-xl"></i>
					</ButtonCircle>
				</form>
			</div>
			<div className="flex-grow">
				<NcImage src={rightImg} />
			</div>
		</div>
	);
};

export default SectionSubscribe2;
