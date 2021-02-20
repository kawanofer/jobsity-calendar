import React, { useEffect, useState } from "react";
import moment from "moment";
import { isEmpty, filter, truncate } from "lodash";
import { toast } from "react-toastify";

import Tooltip from "@material-ui/core/Tooltip";

import { Container, Calendar, WeekDays, Days, Box, Event } from "./styles";

import Modal from "../../components/Modal";

export default function PageCalendar() {
	const [eventsData, setEventsData] = useState([]);
	const [open, setOpen] = useState(false);
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
	useEffect(() => {
		GetEventsDataFromStorage();
		// console.log(moment());
		// console.log("-");
		// //
		// console.log("first Weekday Of Month: ", firstWeekDayOfMonth);
		// console.log("locale: ", locale);
		// console.log("end Of Month: ", endOfMonth);
		// //
		// console.log("-----------------------");
	}, []);
	//
	useEffect(() => {
		GenerateCalendar();
	}, [eventsData]);
	//
	const GetEventsDataFromStorage = () => {
		const values = JSON.parse(
			window.localStorage.getItem("jobsityCalendar")
		);
		console.log(values);
		setEventsData(values ?? []);
	};
	//
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
				events: filter(eventsData, ["date", prevMonth.format("L")]),
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
				events: filter(eventsData, ["date", currentMonth.format("L")]),
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
					events: filter(eventsData, ["date", nextMonth.format("L")]),
				});
			}
		}
		if (daysLength > 28 && daysLength < 35) {
			for (let a = 1; a <= 35 - daysLength; a++) {
				const nextMonth = moment().add(1, "months").set("date", a);
				days.push({
					type: "next",
					day: nextMonth.get("date"),
					date: nextMonth.format("L"),
					events: filter(eventsData, ["date", nextMonth.format("L")]),
				});
			}
		}
		setCalendarDays(days);
	};
	//
	const handleEvent = (item) => {
		console.log(item);
		setOpen(true);
	};
	//
	return (
		<Container>
			<div className="pageTitle">Jobsity - Calendar</div>
			<div className="pageSubTitle">Front-end Javascript Challenge</div>
			<Calendar>
				<>
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

					<Days>
						{!isEmpty(calendarDays) &&
							calendarDays.map((item, index) => {
								return (
									<Tooltip
										title={
											item.events.length < 5
												? `Total events: ${item.events.length}`
												: `Click to see all events`
										}
										arrow
										placement="top"
									>
										<Box
											key={item.date}
											type={item.type}
											index={index}
											today={today}
											date={item.date}
											onClick={() => handleEvent(item)}
										>
											<div>
												{item.day}
												{!isEmpty(item.events) &&
													item.events.map((event) => {
														return (
															<Tooltip
																title={
																	event.title
																}
																arrow
																placement="right"
															>
																<Event
																	key={Math.random()}
																	color={
																		event.color
																	}
																	title={
																		event.title
																	}
																>
																	{truncate(
																		event.title,
																		{
																			length: 20
																		}
																	)}
																</Event>
															</Tooltip>
														);
													})}
											</div>
										</Box>
									</Tooltip>
								);
							})}
					</Days>
				</>
			</Calendar>
			<Modal
				open={open}
				setOpen={setOpen}
				eventsData={eventsData}
				setEventsData={setEventsData}
			/>
		</Container>
	);
}
