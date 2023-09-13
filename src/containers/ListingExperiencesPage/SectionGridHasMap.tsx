import React, { FC, useState } from "react";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import GoogleMapReact from "google-map-react";
import { DEMO_EXPERIENCES_LISTINGS } from "data/listings";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import ExperiencesCardH from "components/ExperiencesCardH/ExperiencesCardH";

const DEMO_EXPERIENCES = DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 12);

export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
	const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
	const [showFullMapFixed, setShowFullMapFixed] = useState(false);

	return (
		<div>
			<div className="relative flex min-h-screen">
				{/* CARDSSSS */}
				<div className="min-h-screen w-full flex-shrink-0 xl:w-[780px] xl:px-8 2xl:w-[880px] ">
					<Heading2
						heading="Experiences in Tokyo"
						subHeading={
							<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
								233 experiences
								<span className="mx-2">·</span>
								Aug 12 - 18
								<span className="mx-2">·</span>2 Guests
							</span>
						}
					/>
					<div className="mb-8 lg:mb-11">
						<TabFilters />
					</div>
					<div className="grid grid-cols-1 gap-8">
						{DEMO_EXPERIENCES.map(item => (
							<div
								key={item.id}
								onMouseEnter={() => setCurrentHoverID(_ => item.id)}
								onMouseLeave={() => setCurrentHoverID(_ => -1)}
							>
								<ExperiencesCardH data={item} />
							</div>
						))}
					</div>
					<div className="mt-16 flex items-center justify-center">
						<Pagination />
					</div>
				</div>

				<div
					className="fixed bottom-8 left-1/2 z-30 flex -translate-x-1/2 transform cursor-pointer items-center justify-center space-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm  text-white shadow-2xl xl:hidden"
					onClick={() => setShowFullMapFixed(true)}
				>
					<i className="las la-map text-lg"></i>
					<span>Show map</span>
				</div>

				{/* MAPPPPP */}
				<div
					className={`xl:static xl:block xl:flex-grow ${
						showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
					}`}
				>
					{showFullMapFixed && (
						<ButtonClose
							onClick={() => setShowFullMapFixed(false)}
							className="absolute left-3 top-3 z-50 h-10 w-10 rounded-xl bg-white shadow-lg"
						/>
					)}

					<div className="fixed top-0 left-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
						<div className="absolute bottom-5 left-3 z-10 min-w-max transform rounded-2xl bg-white py-2 px-4 shadow-xl lg:bottom-auto lg:top-2.5 lg:left-1/2 lg:-translate-x-1/2">
							<Checkbox
								className="text-xs text-neutral-800 xl:text-sm"
								name="xx"
								label="Search as I move the map"
							/>
						</div>
						{/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}

						<GoogleMapReact
							bootstrapURLKeys={{
								key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
							}}
							yesIWantToUseGoogleMapApiInternals
							defaultZoom={12}
							defaultCenter={DEMO_EXPERIENCES[0].map}
						>
							{DEMO_EXPERIENCES.map(item => (
								<AnyReactComponent
									isSelected={currentHoverID === item.id}
									key={item.id}
									lat={item.map.lat}
									lng={item.map.lng}
									experiences={item}
								/>
							))}
						</GoogleMapReact>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectionGridHasMap;
