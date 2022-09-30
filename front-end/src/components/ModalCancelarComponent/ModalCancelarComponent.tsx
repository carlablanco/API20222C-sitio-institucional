import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { FC } from 'react';
import RatingComponent from '../RatingComponent/RatingComponent';

interface ModalCancelarComponentProps {
  open?: boolean,
  handleClose?: Function,
  row?: any
}

const ModalCancelarComponent: FC<ModalCancelarComponentProps> = (props: any) => (
  <Dialog
        fullWidth={true}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Estas seguro de que desea cancelar {props.row.clase} de {props.row.profesor}?
        </DialogTitle>
        <DialogActions>
        <Button  onClick={props.handleClose} variant="text">Cancelar Inscripcion</Button>
        <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
  </Dialog>
);

export default ModalCancelarComponent;

