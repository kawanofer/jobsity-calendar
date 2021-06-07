import React, { useEffect, useState, useMemo } from "react";
import * as Yup from "yup";
import * as uuid from "uuid";
import PropTypes from "prop-types";
import moment from "moment";
import { isEmpty, remove } from "lodash";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
//
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormHelperText,
	Grid,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

import * as Styles from "./styles";

import { storeReminderData } from "../../store/modules/reminder/actions";

function ModalReminder({
	GetRemindersDataFromStorage,
	open = false,
	remindersData,
	selectedData,
	setOpen,
	setRemindersData,
	setSelectedData,
}) {
	const dispatch = useDispatch();
	const [weatherData, setWeatherData] = useState([]);
	const [colors] = useState([
		{ name: "Turquoise", hex: "#1abc9c" },
		{ name: "Orange", hex: "#f39c12" },
		{ name: "Amethyst", hex: "#9b59b6" },
		{ name: "Alizarin", hex: "#e74c3c" },
		{ name: "Wet Asphalt", hex: "#34495e" },
	]);
	//
	// FORM SCHEMA VALIDATIONS
	const schema = Yup.object().shape({
		title: Yup.string()
			.max(30, "limit of 30 chars")
			.required("is required"),
		date: Yup.date().required().typeError("is required"),
		time: Yup.string().required("is required"),
		city: Yup.string().required("is required"),
		color: Yup.string(),
	});
	const { register, control, handleSubmit, watch, errors, setValue, reset } =
		useForm({
			defaultValues: {
				city: "",
				color: "",
				date: "",
				time: "",
				title: "",
			},
			validationSchema: schema,
		});
	const values = useMemo(() => watch({ nest: true }), [watch]);
	//
	// WHEN CITY CHANGE, THE WEATHER IS CHECKED.
	useEffect(() => {
		if (!isEmpty(values.city)) {
			getWeather(values.city);
		}
	}, [values.city]);
	//
	// POPULATE VALUES ON FORM WHEN MODAL IS OPEN
	useEffect(() => {
		if (!isEmpty(selectedData) && open) {
			setTimeout(() => {
				setValue("city", selectedData?.city ?? "");
				setValue("color", selectedData?.color ?? "");
				setValue(
					"date",
					moment(selectedData.date).format().split("T")[0]
				);
				setValue("time", selectedData?.time ?? "");
				setValue("title", selectedData?.title ?? "");
			}, 500);
		}
	}, [selectedData, open]);
	//
	// SAVE DATA FROM FORM
	const onSubmit = (data) => {
		const { title, date, time, city, color } = data;
		//
		const reminders = remindersData;
		const obj = {
			id: uuid.v4(),
			title,
			date: moment(date).format("L"),
			fullDate: moment(date)
				.utc(false)
				.set("hour", time.split(":")[0])
				.set("minute", time.split(":")[1]),
			time,
			city,
			color,
		};
		//
		if (selectedData?.id) {
			remove(reminders, ["id", selectedData?.id]);
		}
		reminders.push(obj);
		setRemindersData(reminders);
		//
		// CALL REDUX TO SAVE VALUES.
		dispatch(storeReminderData(reminders));
		toast.success("Reminder saved");
		handleClear();
	};
	//
	// WHEN MODAL IS CLOSED, ALL FIELDS ARE CLEARED
	const handleClear = () => {
		reset({
			title: "",
			date: "",
			time: "",
			city: "",
			color: "",
		});
		setOpen(false);
		setWeatherData([]);
		setSelectedData([]);
		// Reload reminders
		GetRemindersDataFromStorage();
	};

	// FUNC TO CALL WEATHER API
	const getWeather = (city) => {
		const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
		const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=16&appid=${apiKey}`;
		fetch(apiUrl)
			.then((response) => response.json())
			.then((result) => {
				if (result.cod === "200") {
					setWeatherData(result?.list[0].weather[0]);
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
	//
	return (
		<Dialog
			aria-describedby="dialog-description"
			aria-labelledby="dialog-title"
			fullWidth
			maxWidth="sm"
			onClose={handleClear}
			open={open}
		>
			<DialogTitle
				className="align-title"
				id="alert-dialog-title"
				style={{ backgroundColor: selectedData?.color }}
			>
				<Grid container spacing={2}>
					<Grid item md={10} xs={10}>
						{!isEmpty(selectedData) &&
						selectedData?.reminders?.length === 0
							? "New Reminder"
							: "Edit Reminder"}
					</Grid>
					<Grid item md={2} xs={2}>
						<span
							onClick={handleClear}
							style={{
								float: "right",
								cursor: "pointer",
								// color: "#9F9F9F",
								marginLeft: "10px",
							}}
							title="Fechar"
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
							<Grid item xs={8}>
								<label className="formTitle">{"Title"}</label>
								<TextField
									data-testid="title"
									fullWidth
									id="title"
									inputRef={register}
									label=""
									name="title"
									type="text"
								/>
								<FormHelperText style={{ color: "#ff0000" }}>
									{errors.title && errors.title.message}
								</FormHelperText>
							</Grid>

							<Grid item md={4} xs={12}>
								<label className="formTitle">{"Color"}</label>
								<Controller
									as={
										<Select error={errors.color} fullWidth>
											<MenuItem value={""}>
												{"Select Color"}
											</MenuItem>
											{colors.map((item) => [
												<MenuItem
													key={item.name}
													value={item.hex}
												>
													{item.name}
												</MenuItem>,
											])}
										</Select>
									}
									control={control}
									defaultValue=""
									name="color"
								/>
							</Grid>

							<Grid item md={8} xs={12}>
								<label className="formTitle">{"Date"}</label>
								<TextField
									fullWidth
									id="date"
									inputRef={register}
									label=""
									name="date"
									type="date"
								/>
								<FormHelperText style={{ color: "#ff0000" }}>
									{errors.date && errors.date.message}
								</FormHelperText>
							</Grid>
							<Grid item md={4} xs={12}>
								<label className="formTitle">{"Hour"}</label>
								<TextField
									fullWidth
									id="time"
									inputRef={register}
									label=""
									name="time"
									type="time"
								/>
								<FormHelperText style={{ color: "#ff0000" }}>
									{errors.time && errors.time.message}
								</FormHelperText>
							</Grid>

							<Grid item md={8} xs={12}>
								<label className="formTitle">{"City"}</label>
								<TextField
									fullWidth
									id="city"
									inputRef={register}
									label=""
									name="city"
									type="text"
								/>
								<FormHelperText style={{ color: "#ff0000" }}>
									{errors.city && errors.city.message}
								</FormHelperText>
							</Grid>
						</Grid>

						<div
							style={{
								alignItems: "center",
								display: "flex",
								justifyContent: "space-between",
								margin: "8px 0",
							}}
						>
							<div>
								{!isEmpty(weatherData) && (
									<div>
										<b>{"Weather forecast:"} </b>{" "}
										{weatherData.main}
									</div>
								)}
							</div>
							{/*  */}
							<div>
								<Button
									onClick={handleClear}
									variant="outlined"
								>
									{"Cancel"}
								</Button>
								<Button
									color="primary"
									data-testid="save"
									style={{ marginLeft: "8px" }}
									type="submit"
									variant="contained"
								>
									{"Save"}
								</Button>
							</div>
						</div>
					</form>
				</Styles.Container>
			</DialogContent>
		</Dialog>
	);
}

ModalReminder.propTypes = {
	GetRemindersDataFromStorage: PropTypes.func,
	open: PropTypes.bool,
	remindersData: PropTypes.array,
	selectedData: PropTypes.object,
	setOpen: PropTypes.func,
	setRemindersData: PropTypes.func,
	setSelectedData: PropTypes.func,
};

export default ModalReminder;
