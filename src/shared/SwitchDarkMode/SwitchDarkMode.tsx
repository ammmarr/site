import React, { useEffect, useState } from "react";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/outline";
export interface SwitchDarkModeProps {
	className?: string;
}
const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = "" }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			toDark();
		} else {
			toLight();
		}
	}, []);

	const toDark = () => {
		setIsDarkMode(true);
		const root = document.querySelector("html");
		if (!root) return;
		!root.classList.contains("dark") && root.classList.add("dark");
		localStorage.theme = "dark";
	};

	const toLight = () => {
		setIsDarkMode(false);
		const root = document.querySelector("html");
		if (!root) return;
		root.classList.remove("dark");
		localStorage.theme = "light";
	};

	function _toogleDarkMode() {
		if (localStorage.theme === "light") {
			toDark();
		} else {
			toLight();
		}
	}

	return (
		<button
			onClick={_toogleDarkMode}
			className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-3xl ${className}`}
		>
			<span className="sr-only">Enable dark mode</span>
			{isDarkMode ? (
				<MoonIcon className="h-7 w-7" aria-hidden="true" />
			) : (
				<SunIcon className="h-7 w-7" aria-hidden="true" />
			)}
		</button>
	);
};

export default SwitchDarkMode;
