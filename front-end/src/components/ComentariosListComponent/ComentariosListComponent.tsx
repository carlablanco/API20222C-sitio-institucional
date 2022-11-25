import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { Comentario } from '../../models/Comentario';
import { Experiencia, Profesor } from '../../models/Profesor';
import ComentariosComponent from '../ComentariosComponent/ComentariosComponent';
import styles from './ComentariosListComponent.module.scss';

interface ComentariosListComponentProps {
  selectedProfesor?: Profesor,
  open?: boolean,
  handleClose?: Function,
  comentarios?: Array<Comentario>,
  materia?: string,
  profesor?: Profesor
}

const ComentariosListComponent: FC<ComentariosListComponentProps> = (props: any) => (
  <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Comentarios de {props.materia} con {props.profesor?.nombre}
        </DialogTitle>
        <DialogContent>
              { props?.comentarios?.length > 0 && props?.comentarios?.map((comentario: Comentario, i: any) => {
                  return <ComentariosComponent key={i} comentario={comentario.comentario} usuario={comentario.usuario} isProfesor={false}></ComentariosComponent>
              })}
              { props?.comentarios?.length === 0 && 
                <p>Aùn no hay comentarios para esta clase</p>
              }
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
  </Dialog>
);

export default ComentariosListComponent;
