import styled from "styled-components";
//
export const Container = styled.div`
	width: 100%;
	max-width: 1180px;
	height: 100vh;

	padding: 0 30px;
	margin: 32px auto;

	display: flex;
	flex-direction: column;
	align-items: center;

	.pageTitle {
		font-size: 2.8rem;
	}

	.pageSubTitle {
		font-size: 1.2rem;
		margin-bottom: 30px;
	}
`;

export const Calendar = styled.div`
	display: flex;
	flex-direction: column;

	padding: 8px;

	font-size: 1.2em;
	font-weight: bold;
`;

export const WeekDays = styled.div`
	display: flex;
	flex-direction: row;

	.cell {
		align-items: center;
		width: 150px;
		background-color: #0984e3;
		text-transform: capitalize;
		letter-spacing: 1px;
		text-align: center;
		color: #fff;
		padding: 8px;
		margin: 0 1px;
	}
`;

export const Days = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.cell {
		width: 150px;
		height: 150px;
		border: 1px solid #ccc;

		padding: 8px;
		margin: 1px;
		color: #4d3755;
		background-color: #fff;

		cursor: pointer;
	}
`;
