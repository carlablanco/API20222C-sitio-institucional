import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Footer from '../FooterComponent/FooterComponent';
import SolicitudesComponent from '../SolicitudesComponent/SolicitudesComponent';
import axios from 'axios';
import { Snackbar, Alert, Button } from '@mui/material';
import ComentariosListProfesorComponent from '../ComentariosListProfesorComponent/ComentariosListProfesorComponent';
import { Comentario } from '../../models/Comentario';


export default function MateriasAsignadasComponent() {
  const abrirModalSolicitudes = React.useCallback(
    (row: any) => () => {
      setSelectedRow(row);
      handleClickOpenSolicitudes();
    },
    [],
  );

  const abrirModalComentarios = React.useCallback(
    (row: any) => () => {
      setSelectedRow(row);
      setComentarios(row.comentarios);
      handleClickOpenComentarios();
    },
    [],
  );

  const guardarCambios = React.useCallback(
    () => async () => {
      try {
        const response = await axios.post('localhost:5000/guardarClasesProfesor');
        abrirExitoGuardar();
      } catch (error) {
        abrirExitoGuardar();
      }
    },
    [],
  );
  

  const publicarClase = React.useCallback(
    (row: any) => async () => {
      try {
        const params = {
          row
        }
        const response = await axios.post('localhost:5000/publicarClase', params);
        abrirExitoPublicar();
      } catch (error) {
        abrirExitoPublicar();
      }
    },
    [],
  );

  const despublicarClase = React.useCallback(
    (row: any) => async () => {
      try {
        const params = {
          row
        }
        const response = await axios.post('localhost:5000/despublicarClase', params);
        abrirExitoDespublicar();
      } catch (error) {
        abrirExitoDespublicar();
      }
    },
    [],
  );

  const eliminarClase = React.useCallback(
    (row: any) => async () => {
      try {
        const params = {
          row
        }
        const response = await axios.post('localhost:5000/eliminarClase', params);
        abrirExitoEliminar();
      } catch (error) {
        abrirExitoEliminar();
      }
    },
    [],
  );

  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: true
    },
    {
      field: 'materia',
      headerName: 'Materia',
      width: 150,
      editable: true
    },
    {
      field: 'duracion',
      headerName: 'Duracion',
      width: 110,
      editable: true
    },
    {
      field: 'frecuencia',
      headerName: 'Frecuencia',
      width: 150,
      editable: true
    },
    {
      field: 'costo',
      headerName: 'Costo',
      width: 150,
      editable: true,
      type: 'number'
    },
    {
      field: 'estadoPublicacion',
      headerName: 'Estado de Publicacion',
      width: 170,
    },
    {
      field: 'solicitudes',
      headerName: 'Solicitudes de Inscripcion',
      type: 'actions',
      width: 200,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<AnnouncementIcon />} onClick={abrirModalSolicitudes(params.row)} label="Ver Solicitudes de Inscripcion" />,
      ]
    },
    {
      field: 'comentar',
      headerName: 'Comentarios',
      type: 'actions',
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<AddCommentIcon />} onClick={abrirModalComentarios(params.row)} label="Ver Comentarios" />,
      ]
    },
    {
      field: 'publicar',
      headerName: 'Publicar/Despublicar',
      type: 'actions',
      width: 175,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem disabled={params.row.estadoPublicacion !== 'Despublicada' || params.row.estadoPublicacion === 'Eliminada'} icon={<VisibilityIcon />} onClick={publicarClase(params.row)} label="Publicar Clase" />,
        <GridActionsCellItem disabled={params.row.estadoPublicacion !== 'Publicada' || params.row.estadoPublicacion === 'Eliminada'} icon={<VisibilityOffIcon />} onClick={despublicarClase(params.row)} label="Despublicar Clase" />,
      ]
    },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      type: 'actions',
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem disabled={params.row.estadoPublicacion === 'Eliminada'} icon={<DeleteIcon />} onClick={eliminarClase(params.row)} label="Eliminar Clase" />,
      ]
    },
  ];

  const rows = [
    {
      id: 1,
      nombre: 'Clase 1',
      materia: 'Matematica',
      duracion: '3 Meses',
      frecuencia: 'Semanal',
      estadoPublicacion: 'Publicada',
      costo: 1000,
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
      id: 2,
      nombre: 'Clase 2',
      materia: 'Fisica',
      duracion: '3 Meses',
      frecuencia: 'Semanal',
      estadoPublicacion: 'Despublicada',
      costo: 1500,
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
      id: 3,
      nombre: 'Clase 3',
      materia: 'Programacion',
      duracion: '1 Semana',
      frecuencia: 'Diaria',
      estadoPublicacion: 'Eliminada',
      costo: 4000,
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
      id: 4,
      nombre: 'Clase 4',
      materia: 'Matematica',
      duracion: '1 Año',
      frecuencia: 'Mensual',
      estadoPublicacion: 'Despublicada',
      costo: 6000,
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
  ];

  const [openExitoGuardar, setOpenExitoGuardar] = React.useState(false);

  const abrirExitoGuardar = () => {
    setOpenExitoGuardar(true);
  };

  const handleCloseExitoGuardar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenExitoGuardar(false);
  };

  const [openSolicitudes, setOpenSolicitudes] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({materia: '', profesor: ''} as any);



  const handleClickOpenSolicitudes = () => {
    setOpenSolicitudes(true);
  };

  const handleCloseSolicitudes = () => {
    setOpenSolicitudes(false);
  };

  const [openExitoPublicar, setOpenExitoPublicar] = React.useState(false);

  const abrirExitoPublicar = () => {
    setOpenExitoPublicar(true);
  };

  const handleCloseExitoPublicar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenExitoPublicar(false);
  };

  const [openExitoDespublicar, setOpenExitoDespublicar] = React.useState(false);

  const abrirExitoDespublicar = () => {
    setOpenExitoDespublicar(true);
  };

  const handleCloseExitoDespublicar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenExitoDespublicar(false);
  };

  const [openExitoEliminar, setOpenExitoEliminar] = React.useState(false);

  const abrirExitoEliminar = () => {
    setOpenExitoEliminar(true);
  };

  const handleCloseExitoEliminar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenExitoEliminar(false);
  };

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

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <Button onClick={guardarCambios()}>Guardar</Button>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <SolicitudesComponent row={selectedRow} open={openSolicitudes} handleClose={handleCloseSolicitudes}></SolicitudesComponent>
      <ComentariosListProfesorComponent clase={selectedRow.clase} open={openComentarios} handleClose={handleCloseComentarios} comentarios={selectedComentarios}></ComentariosListProfesorComponent>
      <Snackbar open={openExitoPublicar} autoHideDuration={6000} onClose={handleCloseExitoPublicar}>
        <Alert onClose={handleCloseExitoPublicar} severity="success" sx={{ width: '100%' }}>
          Clase publicada con exito!
        </Alert>
      </Snackbar>
      <Snackbar open={openExitoDespublicar} autoHideDuration={6000} onClose={handleCloseExitoDespublicar}>
        <Alert onClose={handleCloseExitoDespublicar} severity="success" sx={{ width: '100%' }}>
          Clase despublicada con exito!
        </Alert>
      </Snackbar>
      <Snackbar open={openExitoEliminar} autoHideDuration={6000} onClose={handleCloseExitoEliminar}>
        <Alert onClose={handleCloseExitoEliminar} severity="success" sx={{ width: '100%' }}>
          Clase eliminada con exito!
        </Alert>
      </Snackbar>
      <Snackbar open={openExitoGuardar} autoHideDuration={6000} onClose={handleCloseExitoGuardar}>
        <Alert onClose={handleCloseExitoGuardar} severity="success" sx={{ width: '100%' }}>
          Cambios guardados exitosamente!
        </Alert>
      </Snackbar>
      <Footer></Footer>
    </div>
  );
}
