import React, { useEffect, useState } from "react";
import moment from "moment";
import {
	clone,
	differenceBy,
	filter,
	isEmpty,
	toUpper,
	truncate,
} from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { Tooltip } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

import {
	Box,
	Calendar,
	Container,
	Days,
	Header,
	Month,
	Reminder,
	ScrollHeader,
	WeekDays,
} from "./styles";

import Loader from "../../components/Loader";
import ModalConfirmation from "../../components/ModalConfirmation";
import ModalReminders from "../../components/ModalReminders";

import {
	requestReminderData,
	storeReminderData,
} from "../../store/modules/reminder/actions";

export default function PageCalendar() {
	const dispatch = useDispatch();
	//
	const [loading, setLoading] = useState(true);
	const [remindersData, setRemindersData] = useState([]);
	const [selectedData, setSelectedData] = useState([]);
	const [open, setOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const [calendarDays, setCalendarDays] = useState([]);
	const [today] = useState(moment().format("L"));
	const [weekDays] = useState(7);
	const [firstWeekDayOfMonth] = useState(
		moment(moment().clone().startOf("month").format("L")).day()
	);
	const [locale] = useState(moment()._locale);
	const [endOfMonth] = useState(moment().clone().endOf("month").format("DD"));
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
		// INCREMENT REST OF CALENDAR - 4TH LINE
		const daysLength = days.length;
		if (daysLength > weekDays * 3 && daysLength < weekDays * 4) {
			for (let a = 1; a <= weekDays * 4 - daysLength; a++) {
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
		// INCREMENT REST OF CALENDAR - 5TH LINE
		if (daysLength > weekDays * 4 && daysLength < weekDays * 5) {
			for (let a = 1; a <= weekDays * 5 - daysLength; a++) {
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
			<div className="pageTitle">{"Jobsity - Calendar"}</div>
			<div className="pageSubTitle">
				{"Front-end Javascript Challenge"}
			</div>
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
										date={item.date}
										index={index}
										key={item.date}
										today={today}
										type={item.type}
									>
										<div>
											<div className="boxHeader">
												<div style={{ flexGrow: "1" }}>
													{item.day}
												</div>

												{item.reminders.length > 0 && (
													<Tooltip
														arrow
														placement="right"
														title="Delete all reminders"
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
													arrow
													placement="right"
													title="Add new reminder"
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
																	arrow
																	key={Math.random()}
																	placement="right"
																	title={
																		reminder.title
																	}
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
				GetRemindersDataFromStorage={GetRemindersDataFromStorage}
				open={open}
				remindersData={remindersData}
				selectedData={selectedData}
				setOpen={setOpen}
				setRemindersData={setRemindersData}
				setSelectedData={setSelectedData}
			/>
			{/*
				Modal to confirm if the user want to delete all reminders from that day
			*/}
			<ModalConfirmation
				buttonCancelTitle="No"
				buttonConfirmTitle="Yes"
				handleCancel={() => setOpenDelete(false)}
				handleClose={() => setOpenDelete(false)}
				onConfirm={handleDelete}
				open={openDelete}
				subtitle="Are you sure you want to permanently delete these reminders?"
				title="Delete all reminders"
			/>
		</Container>
	);
}
