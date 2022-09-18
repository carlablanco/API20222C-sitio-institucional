import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { FC } from 'react';
import RatingComponent from '../RatingComponent/RatingComponent';

interface ModalComentarComponentProps {
  open?: boolean,
  handleClose?: Function,
  row?: any
}

const ModalComentarComponent: FC<ModalComentarComponentProps> = (props: any) => (
  <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Comentar {props.row.clase} de {props.row.profesor}
        </DialogTitle>
        <DialogContent>
        <RatingComponent></RatingComponent>
        <TextField
          id="outlined-multiline-static"
          label="comentario"
          multiline
          rows={3}
          placeholder="Comentario..."
        />

        </DialogContent>
        <DialogActions>
        <Button variant="text">Publicar</Button>
          <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
  </Dialog>
);

export default ModalComentarComponent;
