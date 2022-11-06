import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { FC } from 'react';
import { getUserId } from '../../hooks/authhook';
import { updateEnrollment } from '../../services/class-enrollment.service';
import RatingComponent from '../RatingComponent/RatingComponent';

interface ModalCancelarComponentProps {
  open?: boolean,
  handleClose?: Function,
  row?: any,
}

const ModalCancelarComponent: FC<ModalCancelarComponentProps> = (props: any) => {
  const handleSend = async () =>{
    try {
      await updateEnrollment({id: props.row.id, status: 'Cancelada'});
      window.location.reload();
      props.handleClose();
    } catch (error) {
      
    }
  }
  return(
  <Dialog
        fullWidth={true}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Estas seguro de que desea cancelar {props.row.class} de {props.row.professor}?
        </DialogTitle>
        <DialogActions>
        <Button onClick={handleSend} variant="text">Cancelar Inscripcion</Button>
        <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
  </Dialog>
)};

export default ModalCancelarComponent;

