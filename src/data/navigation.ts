import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

export const NAVIGATION_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: "/",
		name: "home",
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: "/about",
		name: "about",
	},
	{
		id: ncNanoId(),
		href: "/contact",
		name: "contact",
	},
];
