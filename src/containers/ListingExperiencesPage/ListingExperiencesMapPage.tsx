import React, { FC } from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridHasMap from "./SectionGridHasMap";
import { Helmet } from "react-helmet";

export interface ListingExperiencesMapPageProps {
	className?: string;
}

const ListingExperiencesMapPage: FC<ListingExperiencesMapPageProps> = ({
	className = "",
}) => {
	return (
		<div
			className={`nc-ListingExperiencesMapPage relative ${className}`}
			data-nc-id="ListingExperiencesMapPage"
		>
			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>
			<BgGlassmorphism />

			{/* SECTION HERO */}
			<div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
				<SectionHeroArchivePage
					currentPage="Bus"
					currentTab="Bus"
					trips={[]}
					listingType={
						<>
							<i className="las la-umbrella-beach text-2xl"></i>
							<span className="ml-2.5">1599 Bus</span>
						</>
					}
				/>
			</div>

			{/* SECTION */}
			<div className="container pb-24 lg:pb-28 xl:max-w-none xl:pr-0 2xl:pl-10">
				<SectionGridHasMap />
			</div>

			<div className="container overflow-hidden">
				{/* SECTION 1 */}
				<div className="relative py-16">
					<BackgroundSection />
					<SectionSliderNewCategories
						heading="Explore by types of stays"
						subHeading="Explore houses based on 10 types of stays"
						categoryCardType="card5"
						itemPerRow={5}
						sliderStyle="style2"
						uniqueClassName="ListingExperiencesMapPage"
					/>
				</div>

				{/* SECTION */}
				<SectionSubscribe2 className="py-24 lg:py-28" />

				{/* SECTION */}
				<div className="relative mb-24 py-16 lg:mb-28">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
					<SectionGridAuthorBox />
				</div>
			</div>
		</div>
	);
};

export default ListingExperiencesMapPage;
