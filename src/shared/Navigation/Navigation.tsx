import React, { useTransition } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";
import { useTranslation } from "react-i18next";

function Navigation() {
	return (
		<ul className="nc-Navigation relative hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1">
			{NAVIGATION_DEMO.map(item => (
				<NavigationItem key={item.id} menuItem={item} />
			))}
		</ul>
	);
}

export default Navigation;
