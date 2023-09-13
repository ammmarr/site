import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";

export interface SocialsListProps {
	className?: string;
	itemClass?: string;
	socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
	{
		name: "Facebook",
		icon: "lab la-facebook-square",
		href: "https://www.facebook.com/TeleFreik",
	},
	{
		name: "Twitter",
		icon: "lab la-twitter",
		href: "https://twitter.com/TeleFreik",
	},
	{
		name: "Instagram",
		icon: "lab la-instagram",
		href: "https://www.instagram.com/telefreik",
	},
];

const SocialsList: FC<SocialsListProps> = ({
	className = "",
	itemClass = "block",
	socials = socialsDemo,
}) => {
	return (
		<nav
			className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
			data-nc-id="SocialsList"
		>
			{socials.map((item, i) => (
				<a
					key={i}
					className={`rtl:mx-2 ${itemClass} `}
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
					title={item.name}
				>
					<i className={item.icon}></i>
				</a>
			))}
		</nav>
	);
};

export default SocialsList;
