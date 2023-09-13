import { cancelTripApi, createPayment } from "api";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "shared/Button/Button";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import PaymentDetailsModal from "shared/payment";
import { showApiErrorMessages } from "utils";
import miniBus from "images/miniBus.jpg";
import bus from "images/bus.gif";

const BusCard: FC<any> = ({
	className = "",
	data,
	travelFrom,
	cityTo,
	travel,
	date,
	city,
	cancelButton,
	payButton,
	orderId = "",
}) => {
	const [iframe, setIframe] = useState<null | string>(null);
	let [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const { t } = useTranslation();

	const createPayments = async () => {
		if (!!orderId) {
			await createPayment(orderId)
				.then(res => {
					if (res?.data?.data?.url) {
						setIframe(res?.data?.data?.url);
						setIsOpen(true);
					}
					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
				});
		} else {
			toast.error(t("notFound"));
			setLoading(false);
		}
	};
	const cancelTrip = async () => {
		if (!!orderId) {
			await cancelTripApi(orderId)
				.then((res: any) => {
					if (res?.data?.data?.url) {
						setIframe(res?.data?.data?.url);
						setIsOpen(true);
						window.location.reload();
					}
					window.location.reload();

					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
				});
		} else {
			toast.error(t("notFound"));
			setLoading(false);
		}
	};
	return (
		<div
			className={`nc-FlightCardgroup relative space-y-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white
     p-4 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 ${className}`}
			data-nc-id="FlightCard"
		>
			<div className={` relative  ${className}`} data-nc-id="FlightCard">
				<div className="flex  flex-col  items-start gap-4 space-y-6 sm:space-y-0">
					{/* LOGO IMG */}
					<div className="w-24 flex-shrink-0 lg:w-36">
						{data?.gateway_id.includes("WEBUS") && (
							<img src={miniBus} className="w-24" alt="" />
						)}
						{!data?.gateway_id.includes("WEBUS") && (
							<img src={bus} className="w-24" alt="" />
						)}
					</div>

					{/* FOR MOBILE RESPONSIVE */}
					<div className="block space-y-1">
						<div className="flex font-semibold">
							<div>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{city}
								</span>
							</div>

							<span className="flex w-12  justify-center  ltr:rotate-180">
								<i className=" las   la-long-arrow-alt-right text-2xl"></i>
							</span>
							<div>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{!!travelFrom && travelFrom}
								</span>
							</div>
						</div>
					</div>

					{/* TIME - NAME */}

					{/* PRICE */}
					<div className="flex w-full flex-1 flex-col items-start  gap-4 whitespace-nowrap md:justify-end ">
						<div>
							<div></div>
							<span className="text-slate-400-6000 text-xl font-semibold">
								{t("travelDate")}
							</span>{" "}
							<span className="text-slate-400-6000 text-xl font-semibold">
								{data?.date}
							</span>
						</div>
						<div>
							<span className="text-slate-400-6000 text-xl font-semibold">
								{t("statusTrip", {
									status: t(data?.status ?? data?.status_code),
								})}
							</span>
						</div>
						<div>
							<span className="text-slate-400-6000 text-xl font-semibold">
								{t("companyTrip", {
									name: data?.gateway_id,
								})}
							</span>
						</div>
						<div>
							<span className="text-xl font-semibold text-secondary-6000">
								{t("tripCost", { price: data?.total })}
							</span>
						</div>
						<div className="flex w-full  justify-between">
							{data?.can_be_cancel ? (
								<Button
									className="rounded-full bg-red-500 py-2 px-4 font-bold text-white outline-none ring-0 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-transparent"
									onClick={cancelTrip}
								>
									{t("Cancel")}
								</Button>
							) : (
								""
							)}
							{data?.payment_data?.status_code === "pending" &&
							(data?.status?.toLowerCase() !== "canceled" ||
								data?.status_code?.toLowerCase() !== "canceled") ? (
								<ButtonPrimary
									loading={loading}
									onClick={() => createPayments()}
								>
									{t("confirmPay")}
								</ButtonPrimary>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
			{isOpen && (
				<PaymentDetailsModal
					iframe={iframe}
					isOpenProp={isOpen}
					onCloseModal={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
};

export default BusCard;
