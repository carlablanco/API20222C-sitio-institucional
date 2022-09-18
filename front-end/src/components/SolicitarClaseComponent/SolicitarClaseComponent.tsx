import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { FC } from 'react';
import styles from './SolicitarClaseComponent.module.scss';

interface SolicitarClaseComponentProps {
  open?: boolean,
  handleClose?: Function,
  clase?: string
}

const SolicitarClaseComponent: FC<SolicitarClaseComponentProps> = (props: any) => (
  <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Solicitud de Inscripcion
        </DialogTitle>
        <DialogContent>
        Para solicitar la inscripcion a la clase {props.clase} debe llenar la siguiente informacion:
        <br />
        <TextField id="outlined-basic" label="Telefono de Contacto" variant="outlined" />
        <br />
        <TextField id="outlined-basic" label="Mail de Contacto" variant="outlined" />
        <br />
        <TextField id="outlined-basic" label="Horario de Contacto" variant="outlined" />
        <br />
        <TextField id="outlined-basic" label="Mensaje" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Enviar</Button>
          <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
  </Dialog>
);

export default SolicitarClaseComponent;
