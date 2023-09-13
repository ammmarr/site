import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import { useTranslation } from "react-i18next";
import { cancelTripApi, createPayment } from "api";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import Button from "shared/Button/Button";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import PaymentDetailsModal from "shared/payment";
import i18n from "i18n";

export interface CarCardProps {
	className?: string;
	size?: "default" | "small";
	travelFrom?: any;
	travel?: any;
	data?: any;
	date?: any;
	cityTo?: any;
	city?: any;
	cancelButton?: boolean;
	payButton?: boolean;
	orderId?: string | number;
}

const CarCardProfile: FC<CarCardProps> = ({
	size = "default",
	className = "",
	data,
	date,
	cancelButton = false,
	payButton = false,
	orderId = "",
}) => {
	const [iframe, setIframe] = useState<null | string>(null);
	let [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const { t } = useTranslation();
	const createPayments = async () => {
		if (!!data.id) {
			await createPayment(data.id)
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
		if (!!data.id) {
			await cancelTripApi(data.id)
				.then((res: any) => {
					if (res?.data?.data?.url) {
						setIframe(res?.data?.data?.url);
						setIsOpen(true);
					}
					setLoading(false);
					window.location.reload();
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
	const renderSliderGallery = () => {
		return (
			<div className="relative w-full overflow-hidden rounded-2xl">
				<div className="aspect-w-16 aspect-h-9 ">
					<NcImage
						containerClassName="flex items-center justify-center"
						className="w-full"
						src={data?.bus?.images}
					/>
				</div>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={size === "default" ? "space-y-4  p-5" : "space-y-2  p-3"}>
				<div className="space-y-2">
					<div className="flex items-center space-x-2">
						<h2
							className={`  capitalize ${
								size === "default"
									? "text-xl font-semibold"
									: "text-base font-medium"
							}`}
						>
							<span className="line-clamp-1">{data?.company_name}</span>
						</h2>
					</div>
					<div className="block space-y-1">
						<div className="flex font-semibold">
							<div>
								<span className="text-slate-400-6000 mt-0.5 flex items-center text-sm font-normal">
									{i18n.language === "en"
										? data?.to_location?.name_en
										: data?.to_location?.name_ar}
								</span>
							</div>

							<span className="flex w-12 justify-center  ltr:rotate-180">
								<i className=" las la-long-arrow-alt-right text-2xl"></i>
							</span>
							<div>
								<span className="text-slate-400-6000 mt-0.5 flex items-center text-sm font-normal">
									{i18n.language === "en"
										? data?.from_location?.name_en
										: data?.from_location?.name_ar}
								</span>
							</div>
						</div>
					</div>
					<div>
						<span className="text-lg font-medium text-neutral-500 dark:text-neutral-400">
							{t("statusTrip", {
								status: t(data?.status ?? data?.status_code),
							})}
						</span>
					</div>
					<div className="text-neutral-500 dark:text-neutral-400 ">
						{t("dateTrip", { date: data?.date ?? "" })}
					</div>

					<div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
						<span className="">
							{" "}
							{t("seats", { number: data?.bus?.seats_number })}
						</span>
						<span>-</span>
						<span className="">{data?.bus?.model} </span>
						<span>-</span>
						<span className="">{data?.bus?.name} </span>
						<span>-</span>
						<span className="">{data?.bus?.color} </span>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{size === "default" && (
							<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
								{t("cost", { total: data?.total })}
							</span>
						)}
					</span>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`nc-CarCard group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-shadow will-change-transform hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
			data-nc-id="CarCard"
		>
			<div className="flex flex-col">
				{renderSliderGallery()}
				{renderContent()}
				<div className="m-3 flex justify-between">
					{data?.can_be_cancel ? (
						<Button
							className="rounded-full bg-red-500 py-2 px-4 font-bold text-white outline-none ring-0 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-transparent"
							onClick={cancelTrip}
						>
							{t("Cancel")}
						</Button>
					) : null}
					{data?.payment_status_code === "pending" &&
					(data?.status?.toLowerCase() !== "canceled" ||
						data?.status_code?.toLowerCase() !== "canceled") ? (
						<ButtonPrimary loading={loading} onClick={() => createPayments()}>
							{t("confirmPay")}
						</ButtonPrimary>
					) : null}
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

export default CarCardProfile;
