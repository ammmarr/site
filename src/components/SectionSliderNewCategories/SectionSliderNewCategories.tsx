import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { TaxonomyType } from "data/types";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import NextPrev from "shared/NextPrev/NextPrev";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import useNcId from "hooks/useNcId";
import swvel from "images/cash/785-7850609_exit-swvl-egypt-logo.png";
import paymob from "images/cash/paymob.png";
import skyScanner from "images/cash/2022-Skyscanner-Logo.png";
import gobus from "images/cash/Go_bus_logo.png";
import bluebus from "images/cash/Logo-bluebus-blue-hd.png";
import webus from "images/cash/webus.png";
import abmaritime from "images/cash/abmaritime.png";

import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getPartners } from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import CardHome from "components/CardHome/CardHome";
export interface SectionSliderNewCategoriesProps {
	className?: string;
	itemClassName?: string;
	heading?: string;
	subHeading?: string;
	categories?: TaxonomyType[];
	categoryCardType?: "card3" | "card4" | "card5" | "home";
	itemPerRow?: 4 | 5;
	sliderStyle?: "style1" | "style2" | "home";
	uniqueClassName: string;
	desc?: string;
	titleDescription?: string;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
	heading = "Heading of sections",
	subHeading = "",
	className = "",
	itemClassName = "",
	itemPerRow = 5,
	categoryCardType = "card3",
	sliderStyle = "style1",
	uniqueClassName,
	titleDescription = "",
}) => {
	const UNIQUE_CLASS =
		"SectionSliderNewCategories__" + uniqueClassName + useNcId();
	const { t, i18n } = useTranslation();
	const [categories, setCategories] = useState<any>([]);
	// const categories: any[] = [
	// {
	//   id: "1",
	//   name: t("paymob"),
	//   desc: t("facilitatingPayments"),
	//   thumbnail: paymob,
	// },
	//   {
	//     id: "2",
	//     name: t("swvel"),
	//     desc: t("swvelDsc"),
	//     thumbnail: swvel,
	//   },
	//   {
	//     id: "3",
	//     name: t("skyScanner"),
	//     desc: t("skyScannerDesc"),
	//     thumbnail: skyScanner,
	//   },
	//   {
	//     id: "4",
	//     name: t("gobus"),
	//     desc: t("gobusDesc"),
	//     thumbnail: gobus,
	//   },
	//   {
	//     id: "5",
	//     name: t("bluebus"),
	//     desc: t("bluebusDesc"),
	//     thumbnail: bluebus,
	//   },
	//   {
	//     id: "6",
	//     name: t("webus"),
	//     desc: t("weBusDesc"),
	//     thumbnail: webus,
	//   },
	//   {
	//     id: "7",
	//     name: t("abmaritime"),
	//     desc: t("abmaritimeDesc"),
	//     thumbnail: abmaritime,
	//   },
	// ];

	// const { data, isLoading } = useQuery(["getPartners"], () => getPartners(), {
	//   keepPreviousData: true,
	//   onSuccess: (response) => {
	//     if (response?.data?.data.length) {
	//       setCategories(response?.data?.data);
	//     }
	//   },
	//   onError: (errors: any) => {
	//     if (Object.keys(errors.response.data.errors)?.length) {
	//       showApiErrorMessages(errors.response.data.errors);
	//     } else {
	//       toast.error(errors.response.data.message);
	//     }
	//   },
	// });
	const getPartnersData = async () => {
		await getPartners().then(response => {
			if (response?.data?.data.length) {
				setCategories(response?.data?.data);
			}
		});
	};
	useEffect(() => {
		getPartnersData();
	}, [i18n.language]);

	const MY_GLIDEJS = useMemo(() => {
		return new Glide(`.${UNIQUE_CLASS}`, {
		  perView: itemPerRow,
		  gap: 32,
		  bound: true,
		  direction: i18n.language === "en"? "ltr" : "rtl",
	  
		  breakpoints: {
			1280: {
			  perView: itemPerRow - 1,
			},
			1024: {
			  gap: 20,
			  perView: itemPerRow - 1,
			},
			768: {
			  gap: 20,
			  perView: 1,
			},
			640: {
			  gap: 20,
			  perView: 1,
			},
			500: {
			  gap: 20,
			  perView: 1,
			},
		  },
		});
	  }, [UNIQUE_CLASS, categories, i18n.language, i18n]);

	useEffect(() => {
		setTimeout(() => {
			MY_GLIDEJS.mount();
		}, 100);
	}, [
		MY_GLIDEJS,
		UNIQUE_CLASS,
		i18n,
		i18n.language,
		JSON.stringify(categories),
	]);

	const renderCard = useCallback(
		(item: TaxonomyType, index: number) => {
			switch (categoryCardType) {
				case "card3":
					return <CardCategory3 taxonomy={item} />;
				case "card4":
					return <CardCategory4 taxonomy={item} />;
				case "card5":
					return <CardCategory5 taxonomy={item} />;
				case "home":
					return <CardHome taxonomy={item} />;
				default:
					return <CardCategory3 taxonomy={item} />;
			}
		},
		[categories],
	);

	return (
		<div className={`nc-SectionSliderNewCategories ${className}`}>
			<div className={`${UNIQUE_CLASS} glide flow-root`}>
				<Heading
					desc={subHeading}
					hasNextPrev={sliderStyle === "style1"}
					isCenter={sliderStyle === "home"}
				>
					{heading}
				</Heading>
				{categories?.length > 0 && (
					<div className="glide__track">
						<ul className="glide__slides ">
							{categories.map((item: any, index: number) => (
								<li
									key={item?.sort}
									className={` ${itemClassName} w-full m-[10px]`}
									// style={{ width: "150px", margin:"10px" }}
								>
									{renderCard(item, index)}
								</li>
							))}
						</ul>
					</div>
				)}
				{sliderStyle === "style2" && (
					<NextPrev className="mt-16 justify-center" />
				)}
				{sliderStyle === "home" && (
					<NextPrev className="mt-16 justify-between" />
				)}
			</div>
		</div>
	);
};

export default SectionSliderNewCategories;
