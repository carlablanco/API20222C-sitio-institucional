import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridCellParams, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import { Experiencia, Profesor } from '../../models/Profesor';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export default function DataGridDemo() {

  const inscribirMateria = React.useCallback(
    (rowMateria: any) => () => {
      console.log(rowMateria);
    },
    [],
  );

  const verComentario = React.useCallback(
    (rowComentario: any) => () => {
      console.log(rowComentario);
    },
    [],
  );

  const columns = [
    {
      field: 'nombreProfesor',
      headerName: 'Profesor',
      width: 150,
    },
    {
      field: 'materia',
      headerName: 'Materia',
      width: 150,
    },
    {
      field: 'duracion',
      headerName: 'Duracion',
      width: 110,
    },
    {
      field: 'costo',
      headerName: 'Costo',
      type: 'number',
      width: 75,
    },
    {
      field: 'calificacion',
      headerName: 'Calificacion',
      type: 'number',
      width: 120,
    },
    {
      field: 'comentarios',
      headerName: 'Comentarios',
      type:'actions',
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<CommentIcon />} onClick={verComentario(params.row)} label="Ver Comentarios" />,
      ]
    },
    {
      field: 'inscribirse',
      headerName: 'Inscribirse',
      type:'actions',
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<AddIcon />} onClick={inscribirMateria(params.row)} label="Inscribir Materia" />,
      ]
    },
  ];
  
  const rows = [
    {
      id: 1, 
      nombreProfesor: 'Jhon',
      experienciaProfesor: [
        {
          descripcion: 'Licenciado en Educacion', 
          anios: 3
        },
        {
          descripcion: 'Licenciado en Matematica', anios: 5
        }
      ],
      materia: 'Matematica', 
      duracion: 'Mensual', 
      costo: 1000, 
      comentarios: 'Ver Comentarios', 
      calificacion: 4
    },
    {
      id: 2, nombreProfesor: 'Maria', experienciaProfesor: [{
        descripcion: 'Licenciado en Educacion', anios: 3
      }, {
        descripcion: 'Licenciado en Fisica', anios: 5
      }], materia: 'Fisica', duracion: 'Cuatrimestral', costo: 2000, comentarios: 'Ver Comentarios', calificacion: 3
    },

    { id: 3, nombreProfesor: 'Julian', experienciaProfesor: [{
      descripcion: 'Licenciado en Educacion', anios: 3
    }, {
      descripcion: 'Licenciado en Programacion', anios: 5
    }], materia: 'Programacion', duracion: 'Anual', costo: 10000, comentarios: 'Ver Comentarios', calificacion: 5 },
  ];

  const cellClickHandler = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
    if(params.field === "nombreProfesor"){
      setProfesor({
        nombre: params.row.nombreProfesor,
        experiencia: params.row.experienciaProfesor
      });
      console.log(selectedProfesor)
      handleClickOpen();
    }
  }

  const [open, setOpen] = React.useState(false);
  const [selectedProfesor, setProfesor] = React.useState<Profesor>({
    nombre: '',
    experiencia:[
      {
        descripcion: '',
        anios: 0
      }
    ]
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onCellClick={cellClickHandler}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectedProfesor.nombre}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {selectedProfesor.experiencia.map((experiencia: Experiencia, i) => {
                  return <ul className='lista-modal-profesor' key={i}>
                            <li>Descripcion: {experiencia.descripcion}</li>
                            <li>Años de experiencia: {experiencia.anios}</li>
                        </ul>
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}