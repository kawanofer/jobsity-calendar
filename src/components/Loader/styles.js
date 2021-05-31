import styled from "styled-components";

export const Container = styled.div`
	background-color: "rgba(0, 0, 0, 0.4)";
	bottom: 0;
	display: ${({ active }) => (active === true ? "block" : "none")};
	left: 0;
	position: "fixed";
	right: 0;
	top: 0;
	z-index: 5000;

	.progress {
		color: #fff;
		left: 50%;
		overflow: hidden;
		position: fixed;
		text-align: center;
		top: 50%;
		z-index: 9999;
	}
`;
