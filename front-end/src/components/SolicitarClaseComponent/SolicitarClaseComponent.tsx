import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { FC } from 'react';
import { getUserId } from '../../hooks/authhook';
import { enrollClass, EnrollClassPayload } from '../../services/class-enrollment.service';

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
        setState({...state, timeslot: '', message: ''})
        props.handleClose()
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
        <TextField id="outlined-basic" label="Telefono de Contacto" variant="outlined" name='phone'/>
        <br />
        <TextField id="outlined-basic" label="Mail de Contacto" variant="outlined" name='mail'/>
        <br />
        <TextField value={state.timeslot} id="outlined-basic" label="Horario de Contacto" variant="outlined" name='timeslot' onChange={changeTimeslot}/>
        <br />
        <TextField value={state.message }id="outlined-basic" label="Mensaje" variant="outlined" name='message' onChange={changeMessage}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSend()}>Enviar</Button>
          <Button onClick={props.handleClose}>Cerrar</Button>
        </DialogActions>
  </Dialog>
)};

export default SolicitarClaseComponent;
