import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
	differenceBy,
	toUpper,
	isEmpty,
	filter,
	truncate,
	clone,
} from "lodash";

import { Tooltip } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

import {
	ScrollHeader,
	Container,
	Calendar,
	Header,
	Month,
	WeekDays,
	Days,
	Box,
	Reminder,
} from "./styles";

import ModalReminders from "../../components/ModalReminders";
import ModalConfirmation from "../../components/ModalConfirmation";
import Loader from "../../components/Loader";

import { requestReminderData, storeReminderData } from "../../store/modules/reminder/actions";

export default function PageCalendar() {
	const dispatch = useDispatch();
	//
	const [loading, setLoading] = useState(true);
	const [remindersData, setRemindersData] = useState([]);
	const [selectedData, setSelectedData] = useState([]);
	const [open, setOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const [calendarDays, setCalendarDays] = useState([]);
	const [today, setToday] = useState(moment().format("L"));
	const [firstWeekDayOfMonth, setFirstWeekDayOfMonth] = useState(
		moment(moment().clone().startOf("month").format("L")).day()
	);
	const [locale, setLocale] = useState(moment()._locale);
	const [endOfMonth, setEndOfMonth] = useState(
		moment().clone().endOf("month").format("DD")
	);
	//
	const remindersDataRedux = useSelector(
		(state) => state.reminder.remindersData
	);
	//
	useEffect(() => {
		if (!isEmpty(remindersDataRedux)) {
			setRemindersData(
				clone(remindersDataRedux)?.sort(
					(a, b) => new Date(a.fullDate) - new Date(b.fullDate)
				)
			);
		}
	}, [remindersDataRedux]);
	//
	// WHEN INITIALIZE, CALL FUNC TO GET REMINDERS FROM "backend" localStorage.
	useEffect(() => {
		GetRemindersDataFromStorage();
	}, []);
	//
	// GENERATE DAYS OF CALENDAR WHEN REMINDERS CHANGE.
	useEffect(() => {
		GenerateCalendar();
	}, [remindersData]);
	//
	// GET REMINDERS FROM "backend"
	const GetRemindersDataFromStorage = () => {
		dispatch(requestReminderData());
	};
	//
	// GENERATE CALENDAR 'INSERTING' REMINDERS IN EVERY DAY.
	const GenerateCalendar = () => {
		const days = [];
		const lastDayofPreviousMonth = moment()
			.subtract(1, "months")
			.endOf("month")
			.format("DD");

		// GET DAYS OF PREVIOUS MONTH, IF NEED.
		const start = Number(lastDayofPreviousMonth) - firstWeekDayOfMonth;
		for (let a = start; a < lastDayofPreviousMonth; a++) {
			const prevMonth = moment()
				.subtract(1, "months")
				.set("date", a + 1);
			days.push({
				type: "prev",
				day: prevMonth.get("date"),
				date: prevMonth.format("L"),
				reminders: filter(remindersData, [
					"date",
					prevMonth.format("L"),
				]),
			});
		}
		//
		// GET DAYS OF CURRENT MONTH.
		for (let a = 1; a <= endOfMonth; a++) {
			const currentMonth = moment().set("date", a);
			days.push({
				type: "current",
				day: currentMonth.get("date"),
				date: currentMonth.format("L"),
				reminders: filter(remindersData, [
					"date",
					currentMonth.format("L"),
				]),
			});
		}
		//
		// INCREMENT REST OF CALENDAR
		const daysLength = days.length;
		if (daysLength > 21 && daysLength < 28) {
			for (let a = 1; a <= 28 - daysLength; a++) {
				const nextMonth = moment().add(1, "months").set("date", a);
				days.push({
					type: "next",
					day: nextMonth.get("date"),
					date: nextMonth.format("L"),
					reminders: filter(remindersData, [
						"date",
						nextMonth.format("L"),
					]),
				});
			}
		}
		//
		// INCREMENT REST OF CALENDAR
		if (daysLength > 28 && daysLength < 35) {
			for (let a = 1; a <= 35 - daysLength; a++) {
				const nextMonth = moment().add(1, "months").set("date", a);
				days.push({
					type: "next",
					day: nextMonth.get("date"),
					date: nextMonth.format("L"),
					reminders: filter(remindersData, [
						"date",
						nextMonth.format("L"),
					]),
				});
			}
		}
		setCalendarDays(days);
		setLoading(false);
	};
	//
	// OPEN MODAL TO ADD OR EDIT REMINDER
	const handleReminder = (item) => {
		setSelectedData(item);
		setOpen(true);
	};
	//
	// 'DELETE' REMINDER FROM 'backend', AFTER MODAL CONFIRMATION
	const handleDelete = () => {
		setLoading(true);
		const dif = differenceBy(remindersData, selectedData.reminders, "id");
		dispatch(storeReminderData(dif));
		//window.localStorage.setItem("jobsityCalendar", JSON.stringify(dif));
		setOpenDelete(false);
		GetRemindersDataFromStorage();
	};
	//
	// OPEN MODAL TO CONFIRM WHEN DELETE ALL REMINDERS FROM THAT DAY
	const handleOpenDelete = (item) => {
		setSelectedData(item);
		setOpenDelete(true);
	};
	//
	return (
		<Container>
			<Loader active={loading} />
			<div className="pageTitle">Jobsity - Calendar</div>
			<div className="pageSubTitle">Front-end Javascript Challenge</div>
			<Calendar>
				<>
					<Header>
						<Month>{toUpper(moment().format("MMMM"))}</Month>
						<WeekDays>
							{!isEmpty(locale) &&
								locale._weekdays.map((item) => {
									return (
										<div className="cell" key={item}>
											{item}
										</div>
									);
								})}
						</WeekDays>
					</Header>
					<Days>
						{!isEmpty(calendarDays) &&
							calendarDays.map((item, index) => {
								return (
									<Box
										key={item.date}
										type={item.type}
										index={index}
										today={today}
										date={item.date}
									>
										<div>
											<div className="boxHeader">
												<div style={{ flexGrow: "1" }}>
													{item.day}
												</div>

												{item.reminders.length > 0 && (
													<Tooltip
														title="Delete all reminders"
														arrow
														placement="right"
													>
														<Delete
															className="boxIconButton"
															fontSize="small"
															onClick={() =>
																handleOpenDelete(
																	item
																)
															}
														/>
													</Tooltip>
												)}

												<Tooltip
													title="Add new reminder"
													arrow
													placement="right"
												>
													<Add
														className="boxIconButton"
														fontSize="small"
														onClick={() =>
															handleReminder(item)
														}
													/>
												</Tooltip>
											</div>
											<ScrollHeader>
												{!isEmpty(item.reminders) &&
													item.reminders.map(
														(reminder) => {
															return (
																<Tooltip
																	key={Math.random()}
																	title={
																		reminder.title
																	}
																	arrow
																	placement="right"
																>
																	<Reminder
																		color={
																			reminder?.color
																		}
																		onClick={() =>
																			handleReminder(
																				reminder
																			)
																		}
																	>
																		{truncate(
																			reminder.title,
																			{
																				length: 20,
																			}
																		)}
																	</Reminder>
																</Tooltip>
															);
														}
													)}
											</ScrollHeader>
										</div>
									</Box>
								);
							})}
					</Days>
				</>
			</Calendar>
			{/*
				Modal to create/edit a reminder
			*/}
			<ModalReminders
				open={open}
				setOpen={setOpen}
				remindersData={remindersData}
				setRemindersData={setRemindersData}
				selectedData={selectedData}
				setSelectedData={setSelectedData}
				GetRemindersDataFromStorage={GetRemindersDataFromStorage}
			/>
			{/*
				Modal to confirm if the user want to delete all reminders from that day
			*/}
			<ModalConfirmation
				open={openDelete}
				subtitle="Are you sure you want to permanently delete these reminders?"
				title="Delete all reminders"
				handleCancel={() => setOpenDelete(false)}
				handleClose={() => setOpenDelete(false)}
				buttonCancelTitle="No"
				buttonConfirmTitle="Yes"
				onConfirm={handleDelete}
			/>
		</Container>
	);
}
