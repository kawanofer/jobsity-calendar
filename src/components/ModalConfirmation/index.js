import React from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

export default function ModalConfirmation({
	buttonCancelTitle = "Cancel",
	buttonConfirmTitle = "OK",
	handleCancel,
	handleClose,
	onConfirm,
	open,
	size = "700px",
	subtitle = "Modal subtitle",
	title = "Modal title",
}) {
	return (
		<Dialog
			aria-describedby="modal-confirmation-description"
			aria-labelledby="modal-confirmation-title"
			fullWidth
			onClose={handleClose}
			open={open}
			size={size}
		>
			<DialogTitle className="align-title" id="alert-dialog-title">
				<Grid container spacing={2}>
					<Grid item md={10} xs={10}>
						{title}
					</Grid>
					<Grid item md={2} xs={2}>
						<span
							onClick={handleClose}
							style={{
								color: "#9F9F9F",
								cursor: "pointer",
								float: "right",
								marginLeft: "10px",
							}}
							title="Fechar"
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
				<Button onClick={handleCancel} variant="outlined">
					{buttonCancelTitle}
				</Button>
				<Button
					color="primary"
					onClick={onConfirm}
					style={{ minWidth: 150 }}
					variant="contained"
				>
					{buttonConfirmTitle}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
