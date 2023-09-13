import ButtonPrimary from "shared/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import I404Png from "images/404.png";

const Page404: React.FC = () => (
	<div className="nc-Page404">
		<Helmet>
			<title>404 || Telefreik For Booking</title>
		</Helmet>
		<div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
			{/* HEADER */}
			<header className="mx-auto max-w-2xl space-y-2 text-center">
				<NcImage src={I404Png} />
				<span className="block text-sm font-medium tracking-wider text-neutral-800 dark:text-neutral-200 sm:text-base">
					THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.{" "}
				</span>
				<div className="pt-8">
					<ButtonPrimary href="/">Return Home Page</ButtonPrimary>
				</div>
			</header>
		</div>
	</div>
);

export default Page404;
