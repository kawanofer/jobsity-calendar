import React, { useEffect, useState, useMemo, useContext } from "react";
import moment from "moment";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
//
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	Button,
	TextField,
	Select,
	MenuItem,
	FormHelperText,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

import * as Styles from "./styles";

export default function Modal({
	open,
	setOpen,
	eventsData,
	setEventsData,
	selectedData,
	setSelectedData,
	GetEventsDataFromStorage,
}) {
	const [colors, setColors] = useState([
		{ name: "Turquoise", hex: "#1abc9c" },
		{ name: "Orange", hex: "#f39c12" },
		{ name: "Amethyst", hex: "#9b59b6" },
		{ name: "Alizarin", hex: "#e74c3c" },
		{ name: "Wet Asphalt", hex: "#34495e" },
	]);
	//
	const schema = Yup.object().shape({
		fieldTitle: Yup.string()
			.max(30, "max char of 30")
			.required(" required")
			.typeError(" required"),
		fieldDate: Yup.date().required(" required").typeError(" required"),
		fieldTime: Yup.string().required().typeError(" required"),
		fieldCity: Yup.string().required(" required").typeError(" required"),
		fieldColor: Yup.string(),
	});
	const {
		register,
		control,
		handleSubmit,
		watch,
		errors,
		setValue,
		reset,
	} = useForm({
		defaultValues: {
			fieldTitle: "",
			fieldDate: null,
			fieldTime: "",
			fieldCity: "",
			fieldColor: "",
		},
		validationSchema: schema,
	});
	//
	useEffect(() => {
		console.log("selectedData: ", selectedData);
		if (!isEmpty(selectedData)) {
			const date = moment(selectedData.date).format("DD/MM/YYYY");
			setValue("fieldDate", date);
		}
	}, [selectedData]);
	// console.log("errors: ", errors);
	//
	const onSubmit = (data, e) => {
		const {
			fieldTitle,
			fieldDate,
			fieldTime,
			fieldCity,
			fieldColor,
		} = data;
		//
		let events = eventsData;
		const obj = {
			title: fieldTitle,
			date: moment(fieldDate).format("L"),
			fullDate: moment(fieldDate)
				.utc(false)
				.set("hour", fieldTime.split(":")[0])
				.set("minute", fieldTime.split(":")[1]),
			time: fieldTime,
			city: fieldCity,
			color: fieldColor,
		};
		events.push(obj);
		setEventsData(events);
		//
		window.localStorage.setItem("jobsityCalendar", JSON.stringify(events));
		toast.success("Event saved");
		handleClear();
	};
	//
	const handleClear = () => {
		reset({
			fieldTitle: "",
			fieldDate: null,
			fieldTime: "",
			fieldCity: "",
			fieldColor: "",
		});
		setOpen(false);
		setSelectedData([]);
		// Reload events
		GetEventsDataFromStorage();
	};
	//
	return (
		<>
			<Dialog
				open={open}
				fullWidth
				maxWidth="sm"
				onClose={() => setOpen(false)}
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
			>
				<DialogTitle id="alert-dialog-title" className="align-title">
					<Grid container spacing={2}>
						<Grid item md={10} xs={10}>
							{!isEmpty(selectedData) &&
							selectedData?.events?.length === 0
								? "New Event"
								: "Edit Event"}
						</Grid>
						<Grid item md={2} xs={2}>
							<span
								onClick={() => setOpen(false)}
								title="Fechar"
								style={{
									float: "right",
									cursor: "pointer",
									color: "#9F9F9F",
									marginLeft: "10px",
								}}
							>
								<Close fontSize="small" />
							</span>
						</Grid>
					</Grid>
				</DialogTitle>

				<DialogContent dividers>
					<Styles.Container>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<div className="formTitle">Title</div>
									<TextField
										fullWidth
										id="fieldTitle"
										name="fieldTitle"
										label=""
										type="text"
										inputRef={register}
										error={errors.fieldTitle}
										helperText={
											errors.fieldTitle &&
											errors.fieldTitle.message
										}
									/>
								</Grid>

								<Grid item md={8} xs={12}>
									<div className="formTitle">Date:</div>
									<TextField
										fullWidth
										type="date"
										id="fieldDate"
										name="fieldDate"
										label=""
										inputRef={register}
										error={errors.fieldDate}
										helperText={
											errors.fieldDate &&
											errors.fieldDate.message
										}
									/>
								</Grid>
								<Grid item md={4} xs={12}>
									<div className="formTitle">Hour:</div>
									<TextField
										fullWidth
										type="time"
										id="fieldTime"
										name="fieldTime"
										label=""
										inputRef={register}
										error={errors.fieldTime}
										helperText={
											errors.fieldTime &&
											errors.fieldTime.message
										}
									/>
								</Grid>

								<Grid item md={6} xs={12}>
									<div className="formTitle">City:</div>
									<TextField
										fullWidth
										id="fieldCity"
										name="fieldCity"
										label=""
										type="text"
										inputRef={register}
										error={errors.fieldCity}
										helperText={
											errors.fieldCity &&
											errors.fieldCity.message
										}
									/>
								</Grid>

								<Grid item md={6} xs={12}>
									<div className="formTitle">Color:</div>
									<Controller
										as={
											<Select fullWidth>
												<MenuItem value={null}>
													Select Color
												</MenuItem>
												{colors.map((item, index) => [
													<MenuItem
														key={index}
														value={item.hex}
													>
														{item.name}
													</MenuItem>,
												])}
											</Select>
										}
										name="fieldColor"
										control={control}
										defaultValue=""
									/>
								</Grid>
							</Grid>

							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-end",
									margin: "16px 0",
								}}
							>
								<Button
									onClick={() => setOpen(false)}
									variant="contained"
									color="default"
								>
									Cancel
								</Button>
								<Button
									style={{ marginLeft: "8px" }}
									variant="contained"
									color="primary"
									type="submit"
								>
									Save
								</Button>
							</div>
						</form>
					</Styles.Container>
				</DialogContent>
			</Dialog>
		</>
	);
}
