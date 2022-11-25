import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { FC } from 'react';
import { getUserId } from '../../hooks/authhook';
import { enrollClass, EnrollClassPayload } from '../../services/class-enrollment.service';
import styles from "./SolicitarClaseComponent.module.scss";


interface SolicitarClaseComponentProps {
  open?: boolean,
  handleClose?: Function,
  clase?: any,
}

const SolicitarClaseComponent: FC<SolicitarClaseComponentProps> = (props: any) => { 

  const handleSend = async () =>{
      try {
        const payload: EnrollClassPayload = {
          id_class: props?.clase?.id,
          id_student: getUserId(),
          status: 'Solicitada',
          timeslot: state.timeslot,
          message: state.message
        }
        const response = await enrollClass(payload)
        if(response.data.error){
          setOpenAlert(true)
          setMessage(response.data.error);
        } else {
        props.handleClose();

        }
        setState({...state, timeslot: '', message: ''})
      } catch (error) {
        
      }
    }

  const [state, setState] = React.useState({
    timeslot: '',
    message: ''
  });

  const changeTimeslot = (event) => {
    setState({...state,
      timeslot: event.currentTarget.value
    })
  }

  const changeMessage = (event) => {
    setState({...state,
      message: event.currentTarget.value
    })
  }

  const [message, setMessage] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  


  return (
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
        Para solicitar la inscripcion a la clase {props?.clase?.nombre} debe llenar la siguiente informacion:
        <br />
        <TextField className={styles.modalField} id="outlined-basic" label="Telefono de Contacto" variant="outlined" name='phone'/>
        <br />
        <TextField className={styles.modalField} id="outlined-basic" label="Mail de Contacto" variant="outlined" name='mail'/>
        <br />
        <TextField className={styles.modalField} value={state.timeslot} id="outlined-basic" label="Horario de Contacto" variant="outlined" name='timeslot' onChange={changeTimeslot}/>
        <br />
        <TextField className={styles.modalField} value={state.message }id="outlined-basic" label="Mensaje" variant="outlined" name='message' onChange={changeMessage}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSend()}>Enviar</Button>
          <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  </Dialog>
)};

export default SolicitarClaseComponent;
