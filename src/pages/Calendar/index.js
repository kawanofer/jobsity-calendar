import React, { useEffect, useState } from "react";
import moment from "moment";
import { isEmpty } from "lodash";

import { Container, Calendar, WeekDays, Days } from "./styles";

import Modal from "../../components/Modal";

export default function PageCalendar() {
	const [open, setOpen] = useState(true);
	const [calendarDays, setCalendarDays] = useState([]);
	const [today, setToday] = useState(moment().format("DD"));
	const [firstWeekDayOfMonth, setFirstWeekDayOfMonth] = useState(
		moment(moment().clone().startOf("month").format("L")).day()
	);
	const [locale, setLocale] = useState(moment()._locale);
	const [endOfMonth, setEndOfMonth] = useState(
		moment().clone().endOf("month").format("DD")
	);
	//
	useEffect(() => {
		console.log(moment());
		console.log("-");
		//
		console.log("today: ", today);
		console.log("first Weekday Of Month: ", firstWeekDayOfMonth);
		console.log("locale: ", locale);
		console.log("end Of Month: ", endOfMonth);
		//
		console.log("-----------------------");
		GenerateCalendar();
	}, []);
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
			days.push({ color: "#aaa", day: a + 1 });
		}
		//
		// GET DAYS OF CURRENT MONTH.
		for (let a = 1; a <= endOfMonth; a++) {
			days.push({ color: "#4d3755", day: a });
		}
		//
		// INCREMENT REST OF CALENDAR
		const daysLength = days.length;
		if (daysLength > 21 && daysLength < 28) {
			for (let a = 1; a <= 28 - daysLength; a++) {
				days.push({ color: "#4d3755", day: a });
			}
		}
		if (daysLength > 28 && daysLength < 35) {
			for (let a = 1; a <= 35 - daysLength; a++) {
				days.push({ color: "#aaa", day: a });
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
							calendarDays.map((item) => {
								return (
									<div
										className="cell"
										style={{ color: item.color }}
										key={Math.random()}
										onClick={() => handleEvent(item)}
									>
										{item.day}
									</div>
								);
							})}
					</Days>
				</>
				<Modal open={open} setOpen={setOpen} />
			</Calendar>


		</Container>
	);
}
