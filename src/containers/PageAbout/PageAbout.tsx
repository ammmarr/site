import rightImg from "images/4.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { useTranslation } from "react-i18next";
import { Section2 } from "./section2";

export interface PageAboutProps {
	className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	return (
		<div
			className={`nc-PageAbout relative overflow-hidden ${className} bg-[#DDE2EB]`}
			data-nc-id="PageAbout"
		>
			<Helmet>
				<title>About || Booking</title>
			</Helmet>

			{/* ======== BG GLASS ======== */}
			{/* <BgGlassmorphism /> */}

			<div className="container p-0 m-0 w-[100vw] ">
				<SectionHero
					rightImg={rightImg}
					heading={t("aboutTitle")}
					btnText=""
					subHeading={t("aboutDesc")}
				/>

				{/* <SectionFounder /> */}
				<Section2 />
				{/* <SectionStatistic /> */}

				{/* <SectionSubscribe2 /> */}
			</div>
		</div>
	);
};

export default PageAbout;
