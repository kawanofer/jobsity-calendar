import React from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Container } from "./styles";

function Loader(props) {
	return (
		<Container active={props.active}>
			<CircularProgress className="progress" size="100px" />
		</Container>
	);
}

Loader.propTypes = {
	active: PropTypes.bool,
};

export default Loader;
