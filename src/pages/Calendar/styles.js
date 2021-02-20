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
		background-color: #2c3e50;
		text-transform: capitalize;
		letter-spacing: 1px;
		text-align: center;
		color: #fff;
		padding: 8px;
		border: 1px solid #fff;
	}
`;

export const Days = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

export const Box = styled.div`
	width: 150px;
	height: 150px;
	border: 1px solid #ccc;
	padding: 8px;
	/* margin: 1px; */

	color: ${({ type }) => (type === "current" ? "#2c3e50" : "#ccc")};

	background-color: ${({ today, date, index }) => {
		// console.log(index);
		// if(index === 0 || ((index - 7) === 0))
		// {
		// 	console.log(index);
		// }
		return today === date ? "rgba(52, 152, 219, 0.7)" : "#fff";
	}};

	.boxHeader {
		display: flex;
		justify-content: space-between;
	}

	.boxBody {
		overflow-y: auto;
	}

	.boxAddButton {
		color: #2c3e50;
		cursor: pointer;

		:hover {
			color: #7f8c8d;
		}
	}
`;
// #95a5a6
// #bdc3c7
// #ecf0f1

export const Event = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 25px;

	font-size: 12px;
	border-radius: 3px;
	margin: 1px 0;
	padding: 4px 6px;

	cursor: pointer;
	color: #fff;
	background-color: ${({ color }) => color};
`;
