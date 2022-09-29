import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DataGrid, GridCallbackDetails, GridCellParams, MuiEvent, ValueOptions } from '@mui/x-data-grid';
import React, { FC } from 'react';
import RatingComponent from '../RatingComponent/RatingComponent';

interface SolicitudesComponentProps {
  open?: boolean,
  handleClose?: Function,
  row?: any
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const estadoOptions: Array<ValueOptions> = [{
  value: 'Solicitada',
  label: 'Solicitada'
}, {
  value: 'Aceptada',
  label: 'Aceptada'
}, {
  value: 'Finalizada',
  label: 'Finalizada'
}, {
  value: 'Cancelada',
  label: 'Cancelada'
},]

const SolicitudesComponent: FC<SolicitudesComponentProps> = (props: any) => {
  const columns = [
    {
      field: 'alumno',
      headerName: 'Alumno',
      width: 150,
    },
    {
      field: 'telefono',
      headerName: 'Telefono',
      width: 150,
    },
    {
      field: 'mail',
      headerName: 'Mail',
      width: 170,
    },
    {
      field: 'horarioContacto',
      headerName: 'Horario de Contacto',
      width: 175,
    },
    {
      field: 'mensaje',
      headerName: 'Mensaje',
      width: 350,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      type: 'singleSelect',
      width: 120,
      valueOptions: estadoOptions,
      editable: true
    },
  ];

  const rows = [
    {
      id: 1,
      alumno: 'Sergio Garroni',
      telefono: '1122334455',
      mail:'sgarroni@uade.edu.ar',
      horarioContacto: 'de 12hs a 22hs',
      mensaje: 'Hola! Estoy interesado en contratar esta clase',
      estado: 'Solicitada'
    },
    {
      id: 2,
      alumno: 'Dylan Tajes',
      telefono: '1122334455',
      mail:'dtajes@uade.edu.ar',
      horarioContacto: 'de 16hs a 20hs',
      mensaje: 'Hola! Quisiera mas infromacion sobre esta clase',
      estado: 'Aceptada'
    },
    {
      id: 3,
      alumno: 'Carla Blanco',
      telefono: '1122334455',
      mail:'cblanco@uade.edu.ar',
      horarioContacto: 'de 10hs a 18hs',
      mensaje: 'Hola! Necesito inscribir esta clase para obtener conocimientos importantes para mi trabajo',
      estado: 'Finalizada'
    },
    {
      id: 4,
      alumno: 'Nicole Rivas',
      telefono: '1122334455',
      mail:'nrivas@uade.edu.ar',
      horarioContacto: 'de 9hs a 15hs',
      mensaje: 'Hola! Estoy interesada en ver esta clase',
      estado: 'Cancelada'
    },
  ];

  const cellClickHandler = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {

  }
  return (
    <Dialog 
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title" >
        Solicitudes de {props.row.nombre}
      </DialogTitle>
      <DialogContent >
        <DataGrid sx={{ height: 800, width: "100%", border:10 , borderRadius: 3, borderColor: '#0a40c9e1', boxShadow: 20, 
      my: 0, mx: "auto" , padding: 2}}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onCellClick={cellClickHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Guardar</Button>
        <Button onClick={props.handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SolicitudesComponent;
