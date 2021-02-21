import React from "react";

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Grid,
	Button,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

// import { Container } from './styles';

export default function ModalConfirmation({
	open,
	handleCancel,
	handleClose,
	size = "700px",
	title = "Modal title",
	subtitle = "Modal subtitle",
	buttonCancelTitle = "Cancel",
	buttonConfirmTitle = "OK",
	onConfirm,
}) {
	return (
		<Dialog
			open={open}
			fullWidth
			size={size}
			onClose={handleClose}
			aria-labelledby="modal-confirmation-title"
			aria-describedby="modal-confirmation-description"
		>
			<DialogTitle id="alert-dialog-title" className="align-title">
				<Grid container spacing={2}>
					<Grid item md={10} xs={10}>
						{title}
					</Grid>
					<Grid item md={2} xs={2}>
						<span
							onClick={handleClose}
							title="Fechar"
							style={{
								float: "right",
								cursor: "pointer",
								color: "#9F9F9F",
								marginLeft: "10px",
							}}
						>
							<Close fontSize="small" />
						</span>
					</Grid>
				</Grid>
			</DialogTitle>

			<DialogContent dividers>
				<DialogContentText>{subtitle}</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button variant="outlined" onClick={handleCancel}>
					{buttonCancelTitle}
				</Button>
				<Button
					variant="contained"
					color="primary"
					style={{ minWidth: 150 }}
					onClick={onConfirm}
				>
					{buttonConfirmTitle}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
