import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { remove, find, isEmpty } from "lodash";
import * as uuid from "uuid";
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
	open = false,
	setOpen,
	remindersData,
	setRemindersData,
	selectedData,
	setSelectedData,
	GetRemindersDataFromStorage,
}) {
	const [weatherData, setWeatherData] = useState([]);
	const [colors, setColors] = useState([
		{ name: "Turquoise", hex: "#1abc9c" },
		{ name: "Orange", hex: "#f39c12" },
		{ name: "Amethyst", hex: "#9b59b6" },
		{ name: "Alizarin", hex: "#e74c3c" },
		{ name: "Wet Asphalt", hex: "#34495e" },
	]);
	//
	const schema = Yup.object().shape({
		title: Yup.string()
			.max(30, "limit of 30 chars")
			.required("is required"),
		date: Yup.date().required().typeError("is required"),
		time: Yup.string().required("is required"),
		city: Yup.string().required("is required"),
		color: Yup.string(),
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
			title: "",
			date: "",
			time: "",
			city: "",
			color: "",
		},
		validationSchema: schema,
	});
	const values = useMemo(() => watch({ nest: true }), [watch]);
	//
	useEffect(() => {
		if (!isEmpty(values.city)) {
			getWeather(values.city);
		}
	}, [values.city]);
	//
	useEffect(() => {
		if (!isEmpty(selectedData) && open) {
			setTimeout(() => {
				setValue("title", selectedData?.title ?? "");
				setValue(
					"date",
					moment(selectedData.date).format().split("T")[0]
				);
				setValue("time", selectedData?.time ?? "");
				setValue("city", selectedData?.city ?? "");
				setValue("color", selectedData?.color ?? "");
			}, 500);
		}
	}, [selectedData, open]);
	// console.log("errors: ", errors);
	//
	const onSubmit = (data, e) => {
		const { title, date, time, city, color } = data;
		//
		let reminders = remindersData;
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
			// EDIT ITEM
			//const edit = find(reminders, ["id", selectedData?.id]);
			remove(reminders, ["id", selectedData?.id]);
		}
		reminders.push(obj);
		setRemindersData(reminders);
		//
		window.localStorage.setItem(
			"jobsityCalendar",
			JSON.stringify(reminders)
		);
		toast.success("Reminder saved");
		handleClear();
	};
	//
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

	const getWeather = (city) => {
		const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
		const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=16&appid=${apiKey}`;
		fetch(apiUrl)
			.then((response) => response.json())
			.then((result) => {
				if (result.cod === 200) {
					console.log("Weather: ", result);
					setWeatherData(result?.list[0].weather[0]);
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
	//
	return (
		<>
			<Dialog
				open={open}
				fullWidth
				maxWidth="sm"
				onClose={handleClear}
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					className="align-title"
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
								title="Fechar"
								style={{
									float: "right",
									cursor: "pointer",
									// color: "#9F9F9F",
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
								<Grid item xs={8}>
									<div className="formTitle">Title</div>
									<TextField
										fullWidth
										id="title"
										name="title"
										label=""
										type="text"
										inputRef={register}
									/>
									<FormHelperText
										style={{ color: "#ff0000" }}
									>
										{errors.title && errors.title.message}
									</FormHelperText>
								</Grid>

								<Grid item md={4} xs={12}>
									<div className="formTitle">Color</div>
									<Controller
										as={
											<Select
												fullWidth
												error={errors.color}
											>
												<MenuItem value={""}>
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
										name="color"
										control={control}
										defaultValue=""
									/>
								</Grid>

								<Grid item md={8} xs={12}>
									<div className="formTitle">Date</div>
									<TextField
										fullWidth
										type="date"
										id="date"
										name="date"
										label=""
										inputRef={register}
									/>
									<FormHelperText
										style={{ color: "#ff0000" }}
									>
										{errors.date && errors.date.message}
									</FormHelperText>
								</Grid>
								<Grid item md={4} xs={12}>
									<div className="formTitle">Hour</div>
									<TextField
										fullWidth
										type="time"
										id="time"
										name="time"
										label=""
										inputRef={register}
									/>
									<FormHelperText
										style={{ color: "#ff0000" }}
									>
										{errors.time && errors.time.message}
									</FormHelperText>
								</Grid>

								<Grid item md={8} xs={12}>
									<div className="formTitle">City</div>
									<TextField
										fullWidth
										id="city"
										name="city"
										label=""
										type="text"
										inputRef={register}
									/>
									<FormHelperText
										style={{ color: "#ff0000" }}
									>
										{errors.city && errors.city.message}
									</FormHelperText>
								</Grid>
							</Grid>

							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									margin: "8px 0",
								}}
							>
								<div>
									{!isEmpty(weatherData) && (
										<div>
											<b>Weather forecast: </b>{" "}
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
							</div>
						</form>
					</Styles.Container>
				</DialogContent>
			</Dialog>
		</>
	);
}
