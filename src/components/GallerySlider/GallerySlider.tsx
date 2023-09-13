import Glide from "@glidejs/glide";
import useNcId from "hooks/useNcId";
import React, { FC, useEffect, useMemo } from "react";
import NcImage from "shared/NcImage/NcImage";
import NextPrev from "shared/NextPrev/NextPrev";
import { Link } from "react-router-dom";

export interface GallerySliderProps {
	className?: string;
	galleryImgs: string[];
	ratioClass?: string;
	uniqueID: string;
	href?: string;
}

const GallerySlider: FC<GallerySliderProps> = ({
	className = "",
	galleryImgs,
	ratioClass = "aspect-w-4 aspect-h-3",
	uniqueID = "uniqueID",
	href = "/listing-stay-detail",
}) => {
	const UNIQUE_CLASS = `gallerySlider__${uniqueID}` + useNcId();

	let MY_GLIDEJS = useMemo(() => {
		return new Glide(`.${UNIQUE_CLASS}`, {
			perView: 1,
			gap: 0,
			keyboard: false,
		});
	}, [UNIQUE_CLASS]);

	useEffect(() => {
		setTimeout(() => {
			MY_GLIDEJS.mount();
		}, 10);
	}, [MY_GLIDEJS, UNIQUE_CLASS, galleryImgs]);

	const renderDots = () => {
		return (
			<div
				className="glide__bullets absolute bottom-2 left-1/2 flex -translate-x-1/2 transform items-center justify-center space-x-1.5"
				data-glide-el="controls[nav]"
			>
				{galleryImgs.map((_, i) => (
					<button
						className="glide__bullet h-1.5 w-1.5 rounded-full bg-neutral-300"
						key={i}
						data-glide-dir={`=${i}`}
					/>
				))}
			</div>
		);
	};

	const renderSliderGallery = () => {
		return (
			<div className={`${UNIQUE_CLASS} group relative overflow-hidden`}>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{galleryImgs.map((item, index) => (
							<li key={index} className="glide__slide">
								<Link to={href} className={`block ${ratioClass}`}>
									<NcImage src={item} />
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* DOTS */}
				<div className="absolute inset-x-0 -bottom-4 h-10 bg-gradient-to-t from-neutral-900"></div>
				{renderDots()}

				{/* NAV */}
				<div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 transition-opacity group-hover:opacity-100">
					<NextPrev className="w-full justify-between" btnClassName="w-8 h-8" />
				</div>
			</div>
		);
	};

	return (
		<div className={`nc-GallerySlider ${className}`} data-nc-id="GallerySlider">
			{renderSliderGallery()}
		</div>
	);
};

export default GallerySlider;
