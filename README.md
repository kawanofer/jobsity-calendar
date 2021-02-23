# Jobsity - Front-end Javascript Challenge

## Description

This project is designed to test your knowledge of front-end web technologies and assess your ability to create front-end UI products with attention to details, cross-browser compatibility, standards, and reusability.

### Mandatory Features

- [x] Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.
- [x] Display reminders on the calendar view in the correct time order.
- [x] Allow the user to select color when creating a reminder and display it appropriately.
- [x] Ability to edit reminders – including changing text, city, day, time and color.
- [x] Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
- [ ] Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

### Bonus (Optional)

- [ ] Expand the calendar to support more than the current month.
- [x] Properly handle overflow when multiple reminders appear on the same date.
- [x] Functionality to delete one or ALL the reminders for a specific day

### Considerations

- [x] Redux (or any other state manager) structure of the calendar.
- [x] The project is totally focused on the front-end; please ignore the back-end.
- [x] Keep your code versioned with Git.
- [x] Feel free to use small helper libraries for: (*UI Elements.* *Date/Time handling.*)
- [x] You must create the calendar component yourself. Do not use calendar libraries like FullCalendar or Bootstrap Calendar.
- [ ] If you use an external API, make sure to provide working API keys.

------------

### DEV - OBSERVATIONS
- Weather forecast api ([openweathermap](https://openweathermap.org/)) didn't returned the days correctly, the prop [dt] was suposed to be the date but is not, so I took the first element of the city selected and displayed the weather.
- Weather forecast api_key I'll send by email to Diana.
- Form validation I use react-hook-form and yup.
------------

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
