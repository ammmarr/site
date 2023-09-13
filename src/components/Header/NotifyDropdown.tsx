import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import Avatar from "shared/Avatar/Avatar";

const solutions = [
	{
		name: "Eden Tuan",
		description: "Measure actions your users take",
		time: "3 minutes ago",
		href: "##",
	},
	{
		name: "Leo Messi",
		description: "Create your own targeted content",
		time: "1 minute ago",
		href: "##",
	},
	{
		name: "Leo Kante",
		description: "Keep track of your growth",
		time: "3 minutes ago",
		href: "##",
	},
];

interface Props {
	className?: string;
}

const NotifyDropdown: FC<Props> = ({ className = "" }) => {
	return (
		<div className={className}>
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							className={` ${
								open ? "" : "text-opacity-90"
							} group relative inline-flex items-center rounded-full p-3 text-base font-medium hover:bg-gray-100 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:hover:bg-neutral-800`}
						>
							<span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500"></span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute -right-28 z-10 mt-3 w-screen max-w-xs px-4 sm:right-0 sm:max-w-sm sm:px-0">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800">
										<h3 className="text-xl font-semibold">Notifications</h3>
										{solutions.map((item, index) => (
											<a
												key={index}
												href={item.href}
												className="relative -m-3 flex rounded-lg p-2 pr-8 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
											>
												<Avatar sizeClass="w-8 h-8 sm:w-12 sm:h-12" />
												<div className="ml-3 space-y-1 sm:ml-4">
													<p className="text-sm font-medium text-gray-900 dark:text-gray-200">
														{item.name}
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
														{item.description}
													</p>
													<p className="text-xs text-gray-400 dark:text-gray-400">
														{item.time}
													</p>
												</div>
												<span className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-blue-500"></span>
											</a>
										))}
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
};

export default NotifyDropdown;
