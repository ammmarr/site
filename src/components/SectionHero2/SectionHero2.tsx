import React, { FC } from "react";
import imagePng from "images/hero-right-3.png";
import HeroRealEstateSearchForm from "components/HeroSearchForm/HeroRealEstateSearchForm";

export interface SectionHero2Props {
	className?: string;
	children?: React.ReactNode;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
	return (
		<div
			className={`nc-SectionHero2 relative ${className}`}
			data-nc-id="SectionHero2"
		>
			<div className="absolute inset-y-0 right-0 w-5/6 flex-grow xl:w-3/4">
				<img
					className="absolute inset-0 h-full w-full object-cover"
					src={imagePng}
					alt="hero"
				/>
			</div>
			<div className="relative py-14 lg:py-20">
				<div className="relative inline-flex">
					<div className="absolute inset-y-0 right-20 w-screen bg-primary-500 md:right-52"></div>
					<div className="relative inline-flex max-w-3xl flex-shrink-0 flex-col items-start space-y-8 py-16 text-white sm:space-y-10 sm:py-20 lg:py-24">
						{children ? (
							children
						) : (
							<h2 className="text-4xl font-semibold !leading-[110%] md:text-5xl xl:text-7xl">
								Find Your Best <br /> Smart Real Estate
							</h2>
						)}
					</div>
				</div>
				<div className="hidden w-full lg:mt-20 lg:block">
					<HeroRealEstateSearchForm />
				</div>
			</div>
		</div>
	);
};

export default SectionHero2;
