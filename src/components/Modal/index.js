import React, { useEffect, useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { toUpper, snakeCase, isString, forEach, orderBy } from "lodash";
import * as moment from "moment";
//
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	Button,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";

import * as Styles from "./styles";

function Modal({ open, setOpen }) {
	//
	return (
		<>
			<Dialog
				open={open}
				fullWidth
				maxWidth="lg"
				onClose={setOpen(false)}
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
			>
				<DialogTitle id="alert-dialog-title" className="align-title">
					<Grid container spacing={2}>
						<Grid item md={10} xs={10}>
							<Styles.TitleDialog>EVENT</Styles.TitleDialog>
						</Grid>
						<Grid item md={2} xs={2}>
							<span
								onClick={setOpen(false)}
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

				<DialogContent>
					<Styles.FormBox>
						<Grid container spacing={1}>
							<Grid item md={4} xs={12}>
								<div className="formTitle">Usuário:</div>
							</Grid>

							<Grid item md={2} xs={12}>
								<div className="formTitle">Nº da viagem:</div>
							</Grid>

							<Grid item md={2} xs={12}>
								<div className="formTitle">
									Nº da ordem elevação:
								</div>
							</Grid>

							<Grid item md={2} xs={12}>
								<div className="formTitle">
									Data/hora inicio:
								</div>
							</Grid>

							<Grid item md={2} xs={12}>
								<div className="formTitle">Data/hora fim:</div>
							</Grid>
						</Grid>
					</Styles.FormBox>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="default">
						Cancel
					</Button>
					<Button autoFocus color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default Modal;
