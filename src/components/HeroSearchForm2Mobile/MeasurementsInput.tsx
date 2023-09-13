import React, { FC, useEffect, useRef, useState } from "react";
import { RadioGroup, Tab } from "@headlessui/react";
import NcInputNumber from "../NcInputNumber/NcInputNumber";

interface Props {
	fieldClassName?: string;
	onChange?: (value: object) => void;
	defaultMeasurementType: string;
	defaultWeightPlan?: number;
	defaultLength?: number;
	defaultWidth?: number;
	defaultHeight?: number;
}

const MeasurementsInput: FC<Props> = ({
	onChange = value => {},

	defaultMeasurementType = "Imperial",
	defaultWeightPlan = 1,
	defaultLength = 0,
	defaultWidth = 0,
	defaultHeight = 0,
}) => {
	//
	let [measurementType, setMeasurementType] = useState("Imperial"); // Imperial or Metric
	let [weightPlan, setWeightPlan] = useState(1); // 1, 5 or 10 ... lbs or kg
	let [length, setLength] = useState(0); // in or cm
	let [width, setWidth] = useState(0); // in or cm
	let [height, setHeight] = useState(0); // in or cm

	//
	const inputRef = useRef<HTMLInputElement>(null);
	//
	useEffect(() => {
		setWeightPlan(defaultWeightPlan);
	}, [defaultWeightPlan]);
	useEffect(() => {
		setMeasurementType(defaultMeasurementType);
	}, [defaultMeasurementType]);
	useEffect(() => {
		setLength(defaultLength);
	}, [defaultLength]);
	useEffect(() => {
		setWidth(defaultWidth);
	}, [defaultWidth]);
	useEffect(() => {
		setHeight(defaultHeight);
	}, [defaultHeight]);

	const renderTabPanelCommon = () => {
		return (
			<div>
				<RadioGroup
					value={weightPlan}
					onChange={(e: number) => {
						setWeightPlan(e);
						onChange({ measurementType, weightPlan: e, length, width, height });
						if (inputRef.current) {
							inputRef.current.value = "";
						}
					}}
					className="mt-11 grid grid-cols-3 gap-2.5"
				>
					{[1, 5, 10].map((item, index) => {
						return (
							<RadioGroup.Option key={item} value={item}>
								{({ checked }) => (
									<span
										className={`inline-flex h-11 w-full cursor-pointer select-none items-center justify-center rounded-full ${
											checked
												? "border-2 border-black"
												: "border border-neutral-300"
										}`}
									>
										{`${item} ${measurementType === "Imperial" ? "lbs" : "kg"}`}
									</span>
								)}
							</RadioGroup.Option>
						);
					})}
				</RadioGroup>

				<div className="mt-11 space-y-3 divide-y">
					<NcInputNumber
						className="w-full"
						defaultValue={length}
						onChange={value => {
							setLength(value);
							onChange({
								measurementType,
								weightPlan,
								length: value,
								width,
								height,
							});
						}}
						max={10}
						min={1}
					/>
					<NcInputNumber
						className="w-full pt-7"
						defaultValue={width}
						onChange={value => {
							setWidth(value);
							onChange({
								measurementType,
								weightPlan,
								length,
								width: value,
								height,
							});
						}}
						max={10}
						min={1}
					/>
					<NcInputNumber
						className="w-full pt-7"
						defaultValue={height}
						onChange={value => {
							setHeight(value);
							onChange({
								measurementType,
								weightPlan,
								length,
								width,
								height: value,
							});
						}}
						max={10}
						min={1}
					/>
				</div>
			</div>
		);
	};

	const renderPanelContent = () => {
		return (
			<div className=" w-full rounded-xl bg-white p-4 py-5 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] ">
				<div className="mb-8">
					<span className="block text-2xl font-semibold text-black">
						Measurements
					</span>
					<input
						type={"number"}
						className="inputNumberHiddenArrows m-0 mt-1 block border-none p-0 font-light leading-none text-neutral-400 outline-none ring-0 hover:bg-transparent focus:outline-none focus:ring-0"
						placeholder={"Type weight here"}
						ref={inputRef}
					/>
				</div>
				<Tab.Group
					defaultIndex={measurementType === "Metric" ? 1 : 0}
					onChange={index => {
						index
							? setMeasurementType("Metric")
							: setMeasurementType("Imperial");

						onChange({
							measurementType: index ? "Metric" : "Imperial",
							weightPlan,
							length,
							width,
							height,
						});
					}}
				>
					<Tab.List className="flex h-11 rounded-full bg-neutral-100 px-1.5 py-1 text-base font-medium text-black">
						<Tab
							className={({ selected }) =>
								`${
									selected ? "flex-1 rounded-full bg-white shadow-md" : ""
								} flex flex-shrink-0 select-none items-center justify-center px-3.5 leading-none`
							}
						>
							{({ selected }) => (
								<span>Imperial {selected && "(lb, in)"} </span>
							)}
						</Tab>
						<Tab
							className={({ selected }) =>
								`${
									selected ? "flex-1 rounded-full bg-white shadow-md" : ""
								} flex select-none items-center justify-center px-3.5 leading-none`
							}
						>
							{({ selected }) => <span>Metric {selected && "(kg, cm)"}</span>}
						</Tab>
					</Tab.List>

					<Tab.Panel>{renderTabPanelCommon()}</Tab.Panel>
					<Tab.Panel>{renderTabPanelCommon()}</Tab.Panel>
				</Tab.Group>
			</div>
		);
	};

	return <div className="relative flex">{renderPanelContent()}</div>;
};

export default MeasurementsInput;
