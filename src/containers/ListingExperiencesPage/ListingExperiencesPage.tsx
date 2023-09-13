import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";

export interface ListingExperiencesPageProps {
	className?: string;
}

const ListingExperiencesPage: FC<ListingExperiencesPageProps> = ({
	className = "",
}) => {
	return (
		<div
			className={`nc-ListingExperiencesPage relative overflow-hidden ${className}`}
			data-nc-id="ListingExperiencesPage"
		>
			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>
			<BgGlassmorphism />

			<div className="container relative">
				{/* SECTION HERO */}
				<SectionHeroArchivePage
					currentPage="Bus"
					currentTab="Bus"
					trips={[]}
					listingType={
						<>
							<i className="las la-umbrella-beach text-2xl"></i>
							<span className="ml-2.5">1599 experiences</span>
						</>
					}
					className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
				/>

				{/* SECTION */}
				<SectionGridFilterCard className="pb-24 lg:pb-28" />

				{/* SECTION */}
				<SectionSubscribe2 className="py-24 lg:py-28" />
			</div>
		</div>
	);
};

export default ListingExperiencesPage;
