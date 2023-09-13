import { Popover, Transition } from "@headlessui/react";
import Input from "shared/Input/Input";
import React, { Fragment } from "react";

const SearchDropdown = () => {
	const inputRef = React.createRef<HTMLInputElement>();

	return (
		<React.Fragment>
			<Popover className="relative">
				{({ open }) => {
					if (open) {
						setTimeout(() => {
							inputRef.current?.focus();
						}, 100);
					}

					return (
						<>
							<Popover.Button className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-[28px]">
								<i className="las la-search"></i>
							</Popover.Button>

							<Transition
								show={open}
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel
									static
									className="absolute right-0 z-10 mt-3 w-screen max-w-sm"
								>
									<form action="" method="POST">
										<Input
											ref={inputRef}
											type="search"
											placeholder="Type and press enter"
										/>
										<input type="submit" hidden value="" />
									</form>
								</Popover.Panel>
							</Transition>
						</>
					);
				}}
			</Popover>
		</React.Fragment>
	);
};

export default SearchDropdown;
