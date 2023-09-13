import { AppContext } from "components/context/AppContext";
import React, { FC, ReactNode, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface SectionHeroProps {
	className?: string;
	rightImg: string;
	heading: ReactNode;
	subHeading: string;
	btnText: string;
}

const SectionHero: FC<SectionHeroProps> = ({
	className = "",
	rightImg,
	heading,
	subHeading,
	btnText,
}) => {
	const { token } = useContext(AppContext);
	return (
		<div
			className={`nc-SectionHero flex  flex-col lg:justify-center ${className}  w-[99vw] h-[667px] bg-gradient-to-r from-[#242932] to-[#2B356E] sm:justify-center max-sm:justify-center `}
			data-nc-id="SectionHero"
		>
			
			<div className=" flex lg:justify-around sm:justify-between max-sm:justify-between lg:mt-20  lg:flex-row items-center align-middle  text-center sm:flex-col-reverse  max-sm:flex-col-reverse  sm:m-0 max-sm:m-0 ">
				<div className="w-[50vw] lg:ml-80 max-md:mx-auto max-sm:mx-auto-28 m-auto p-8 sm:p-3  max-sm:p-3 max-sm:w-full ">
					<h2 className="flex text-center   w-full  lg:text-[24px] font-semibold !leading-tight text-white max-sm:text-[16px] ">
						{heading}
					</h2>
					<span className=" flex justify-start text-base lg:text-[20px] text-left  text-white max-sm:text-[12px]">
						{subHeading}
					</span>
					{!!btnText && !token && (
						<ButtonPrimary href="/login">{btnText}</ButtonPrimary>
					)}
				</div >
				<div className="  lg:w-[100vw] max-sm:w-[600px] ">
					<img className=" object-fit" src={rightImg} alt="" />
				</div>
				
			</div>
		</div>
	);
};

export default SectionHero;
