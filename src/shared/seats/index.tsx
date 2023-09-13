import React, {
	FC,
	Fragment,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import ButtonClose from "shared/ButtonClose/ButtonClose";

export interface NcModalProps {
	contentExtraClass?: string;
	contentPaddingClass?: string;
	isOpenProp?: boolean;
	onCloseModal?: () => void;
}

const SeatsDetailsModal: FC<NcModalProps> = ({
	contentExtraClass = "max-w-screen-xl  h-96 lg:h-[600px]",
	contentPaddingClass = "py-4 px-6 md:py-5",
	isOpenProp,
	onCloseModal,
}) => {
	let [isOpen, setIsOpen] = useState(!!isOpenProp);
	const { t } = useTranslation();

	function closeModal() {
		if (typeof isOpenProp !== "boolean") {
			setIsOpen(false);
		}
		onCloseModal && onCloseModal();
	}

	useEffect(() => {
		setIsOpen(!!isOpenProp);
	}, [isOpenProp]);

	return (
		<div className="nc-NcModal h-96">
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-1 text-center md:px-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-75"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-75"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-75"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-75"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div
								className={`my-5 inline-block w-full transform overflow-hidden rounded-2xl border border-black border-opacity-5 bg-white text-left align-middle text-neutral-900 shadow-xl transition-all dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:my-8 ${contentExtraClass}`}
							>
								<div className="movie-container">
									<label>{t("selectSeats")}</label>

									<ul className="showcase">
										<li>
											<div className="seat"></div>
											<small>{t("availableSeat")}</small>
										</li>
										<li>
											<div className="seat selected"></div>
											<small>{t("ownSelect")}</small>
										</li>
										<li>
											<div className="seat occupied"></div>
											<small>{t("notAvailable")}</small>
										</li>
									</ul>

									<div className="container">
										<div className="screen"></div>

										<div className="row">
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
										</div>
										<div className="row">
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat occupied"></div>
											<div className="seat occupied"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
										</div>
										<div className="row">
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat occupied"></div>
											<div className="seat occupied"></div>
										</div>
										<div className="row">
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
										</div>
										<div className="row">
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat occupied"></div>
											<div className="seat occupied"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
										</div>
										<div className="row">
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat"></div>
											<div className="seat occupied"></div>
											<div className="seat occupied"></div>
											<div className="seat occupied"></div>
											<div className="seat"></div>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default SeatsDetailsModal;
