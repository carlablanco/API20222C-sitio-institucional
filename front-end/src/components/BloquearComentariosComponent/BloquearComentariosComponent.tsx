import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { FC } from 'react';
import styles from './BloquearComentariosComponent.module.scss';

interface BloquearComentariosComponentProps {
  selectedComentario?: any,
  open?: boolean,
  handleClose?: Function,
  usuario?: string,
  comentario?: string
}

const BloquearComentariosComponent: FC<BloquearComentariosComponentProps> = (props: any) => {
  const [razon, setRazon] = React.useState('');
  

  const inputChange = (event) => {
    setRazon(event.currentTarget.value);
  }
  return(
  <Dialog fullWidth={true}
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" sx={{my:1, textAlign:"center"}}>
      Bloquear comentario de {props.usuario}
    </DialogTitle>
    <DialogContent >
      Desea bloquear el siguiente comentario? <br></br><br></br>
      <span className={styles.comentario}>"{props.comentario}"</span> 
      <br></br>
      <TextField sx={{my:1, width:"100%"}}
        id="outlined-multiline-static"
        label="Razon de Bloqueo"
        multiline
        rows={3}
        placeholder="Razon de bloqueo..."
        onChange={inputChange}
      />

    </DialogContent>
    <DialogActions>
      <Button disabled={!razon.length} onClick={props.handleClose}>Bloquear</Button>
      <Button onClick={props.handleClose}>Cancelar</Button>
    </DialogActions>
  </Dialog>
)};

export default BloquearComentariosComponent;
