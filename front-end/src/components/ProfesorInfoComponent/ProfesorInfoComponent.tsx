import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { FC } from 'react';
import { Experiencia, Profesor } from '../../models/Profesor';
import styles from './ProfesorInfoComponent.module.scss';

interface ProfesorInfoComponentProps {
  selectedProfesor?: Profesor,
  open?: boolean,
  handleClose?: Function
}

const ProfesorInfoComponent: FC<ProfesorInfoComponentProps> = (props: any) => (
  <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.selectedProfesor.nombre}
        </DialogTitle>
        <DialogContent>
              {props.selectedProfesor.experiencia.map((experiencia: Experiencia, i: any) => {
                  return <ul className='lista-modal-profesor' key={i}>
                            <li>Descripcion: {experiencia.descripcion}</li>
                            <li>Años de experiencia: {experiencia.anios}</li>
                        </ul>
              })}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
  </Dialog>
);

export default ProfesorInfoComponent;
