import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { Comentario } from '../../models/Comentario';
import { Experiencia, Profesor } from '../../models/Profesor';
import ComentariosComponent from '../ComentariosComponent/ComentariosComponent';
import styles from './ComentariosListProfesorComponent.module.scss';

interface ComentariosListProfesorComponentProps {
  open?: boolean,
  handleClose?: Function,
  comentarios?: Array<Comentario>,
  clase?: string,
  
}

const ComentariosListProfesorComponent: FC<ComentariosListProfesorComponentProps> = (props: any) => (
  <Dialog fullWidth={true}
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" sx={{textAlign: "center"}}>
      Comentarios de {props.clase}
    </DialogTitle>
    <DialogContent >
      {props?.comentarios?.map((comentario: Comentario, i: any) => {
        return <ComentariosComponent  key={i} comentario={comentario.comentario} usuario={comentario.usuario} isProfesor={true}></ComentariosComponent>
      })}
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose}>Cerrar</Button>
    </DialogActions>
  </Dialog>
);

export default ComentariosListProfesorComponent;
