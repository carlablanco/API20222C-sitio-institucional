import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridCellParams, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import { Profesor } from '../../models/Profesor';
import ProfesorInfoComponent from '../ProfesorInfoComponent/ProfesorInfoComponent';
import ComentariosListComponent from '../ComentariosListComponent/ComentariosListComponent';
import { Comentario } from '../../models/Comentario';
import SolicitarClaseComponent from '../SolicitarClaseComponent/SolicitarClaseComponent';


export default function DataGridDemo() {

  const inscribirMateria = React.useCallback(
    (row: any) => () => {
      setMateria(row.materia)
      handleClickOpenSolicitud()
    },
    [],
  );

  const verComentario = React.useCallback(
    (row: any) => () => {
      setMateria(row.materia)
      setProfesor({
        nombre: row.nombreProfesor,
        experiencia: row.experienciaProfesor
      });
      setComentarios(row.comentarios)
      handleClickOpenComentarios()
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
      type: 'actions',
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<CommentIcon />} onClick={verComentario(params.row)} label="Ver Comentarios" />,
      ]
    },
    {
      field: 'inscribirse',
      headerName: 'Inscribirse',
      type: 'actions',
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
      calificacion: 4,
      comentarios: [{
        usuario: 'Sergio',
        comentario: 'Excelente',
      },
      {
        usuario: 'Dylan',
        comentario: 'Buenisimo',
      },
      {
        usuario: 'Carla',
        comentario: 'Una capa',
      }]
    },
    {
      id: 2, nombreProfesor: 'Maria', experienciaProfesor: [{
        descripcion: 'Licenciado en Educacion', anios: 3
      }, {
        descripcion: 'Licenciado en Fisica', anios: 5
      }], materia: 'Fisica', duracion: 'Cuatrimestral', costo: 2000, comentarios: [{
        usuario: 'Sergio',
        comentario: 'Excelente',
      },
      {
        usuario: 'Dylan',
        comentario: 'Buenisimo',
      },
      {
        usuario: 'Carla',
        comentario: 'Una capa',
      }], calificacion: 3
    },

    {
      id: 3, nombreProfesor: 'Julian', experienciaProfesor: [{
        descripcion: 'Licenciado en Educacion', anios: 3
      }, {
        descripcion: 'Licenciado en Programacion', anios: 5
      }], materia: 'Programacion', duracion: 'Anual', costo: 10000,
      comentarios: [{
        usuario: 'Sergio',
        comentario: 'Excelente',
      },
      {
        usuario: 'Dylan',
        comentario: 'Buenisimo',
      },
      {
        usuario: 'Carla',
        comentario: 'Una capa',
      }], calificacion: 5
    },
  ];

  const cellClickHandler = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
    if (params.field === "nombreProfesor") {
      setProfesor({
        nombre: params.row.nombreProfesor,
        experiencia: params.row.experienciaProfesor
      });
      setMateria(params.row.materia)
      console.log(selectedProfesor)
      handleClickOpenProfesor();
    }
  }

  const [openComentarios, setOpenComentarios] = React.useState(false);
  const [selectedComentarios, setComentarios] = React.useState<Array<Comentario>>([{
    usuario: '',
    comentario: ''
  }]);


  const handleClickOpenComentarios = () => {
    setOpenComentarios(true);
  };

  const handleCloseComentarios = () => {
    setOpenComentarios(false);
  };

  const [openProfesor, setOpenProfesor] = React.useState(false);
  const [selectedProfesor, setProfesor] = React.useState<Profesor>({
    nombre: '',
    experiencia: [
      {
        descripcion: '',
        anios: 0
      }
    ]
  });


  const handleClickOpenProfesor = () => {
    setOpenProfesor(true);
  };

  const handleCloseProfesor = () => {
    setOpenProfesor(false);
  };

  const [openSolicitud, setOpenSolicitud] = React.useState(false);


  const handleClickOpenSolicitud = () => {
    setOpenSolicitud(true);
  };

  const handleCloseSolicitud = () => {
    setOpenSolicitud(false);
  };

  const [selectedMateria, setMateria] = React.useState<any>()

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
      <ProfesorInfoComponent open={openProfesor} selectedProfesor={selectedProfesor} handleClose={handleCloseProfesor} />
      <ComentariosListComponent
        open={openComentarios}
        comentarios={selectedComentarios}
        handleClose={handleCloseComentarios}
        materia={selectedMateria}
        profesor={selectedProfesor} />
      <SolicitarClaseComponent open={openSolicitud} handleClose={handleCloseSolicitud} clase={selectedMateria}></SolicitarClaseComponent>
    </Box>
  );
}