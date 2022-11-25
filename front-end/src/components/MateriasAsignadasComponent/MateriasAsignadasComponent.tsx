import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
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
import styles from "./MateriasAsignadasComponent.module.scss";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { getName, getUserId } from '../../hooks/authhook';
import { deleteClass, filterClass, FilterClassPayload, updateClass, UpdateClassPayload } from '../../services/class.service';

export default function MateriasAsignadasComponent() {

  React.useEffect(() => {
    getRows()
  }, [])

  const [rows, setRows] = React.useState([]);

  const getRows = async () => {
    try {
      const payload: FilterClassPayload = {
        professor: getUserId()
      }
      const response = await filterClass(payload);
      setRows(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
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
      setComentarios(row.comments);
      handleClickOpenComentarios();
    },
    [],
  );
  

  const publicarClase = React.useCallback(
    (row: any) => async () => {
      try {
        const params: UpdateClassPayload = {
          id: row.id,
          status: 'Publicada'
        }
        const response = await updateClass(params);
        getRows();
        abrirExitoPublicar();
      } catch (error) {
      }
    },
    [],
  );

  const despublicarClase = React.useCallback(
    (row: any) => async () => {
      try {
        const params: UpdateClassPayload = {
          id: row.id,
          status: 'No publicada'
        }
        const response = await updateClass(params);
        getRows();
        abrirExitoDespublicar();
      } catch (error) {
      }
    },
    [],
  );

  const eliminarClase = React.useCallback(
    (row: any) => async () => {
      try {
        const response = await deleteClass(row.id);
        window.location.reload();
        abrirExitoEliminar();
      } catch (error) {
        abrirExitoEliminar();
      }
    },
    [],
  );

  const columns: GridColumns  = [
    {
      field: 'name',
      headerName: 'Materia',
      width: 150,
      editable: true
    },
    {
      field: 'duration',
      headerName: 'Duracion',
      width: 110,
      editable: true
    },
    {
      field: 'frequency',
      headerName: 'Frecuencia',
      width: 150,
      editable: true
    },
    {
      field: 'cost',
      headerName: 'Costo',
      width: 150,
      editable: true,
      type: 'number'
    },
    {
      field: 'status',
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
      field: 'visibilidad',
      headerName: 'Visibilidad',
      type: 'actions',
      width: 110,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem disabled={params.row.status !== 'No publicada' || params.row.status === 'Eliminada'} icon={<VisibilityIcon />} onClick={publicarClase(params.row)} label="Publicar Clase" />,
        <GridActionsCellItem disabled={params.row.status !== 'Publicada' || params.row.status === 'Eliminada'} icon={<VisibilityOffIcon />} onClick={despublicarClase(params.row)} label="Despublicar Clase" />,
        <GridActionsCellItem disabled={params.row.status === 'Eliminada'} icon={<DeleteIcon />} onClick={eliminarClase(params.row)} label="Eliminar Clase" />,
      ]
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
    comentario: '',
    id: null
  }]);


  const handleClickOpenComentarios = () => {
    setOpenComentarios(true);
  };

  const handleCloseComentarios = () => {
    setOpenComentarios(false);
  };

  const editStopHandler = async (newRow, oldRow) => {
    try {
      if(oldRow !== newRow){
        const payload: UpdateClassPayload = {
          id: newRow.id,
          name: newRow.name,
          duration: newRow.duration,
          frequency: newRow.frequency,
          status: newRow.status,
          type: newRow.type,
          cost: newRow.cost,
        }
        const response = await updateClass(payload);
        setOpenExitoGuardar(true);
        return newRow
      }
    } catch (error) {
      return oldRow
    }
  }
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <h4 className={styles.profesor}>Profesor: {getName()}</h4>
      <div className={styles.div}>
        <Box sx={{ height: 600, width: "95%", border:1, borderRadius: 3, borderColor: '#000000', bgcolor: '#0a40c9e1', boxShadow: 20, 
        my: 0, mx: "auto" , padding: 2 }}>
          <DataGridPro
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{border:1, borderColor: '#002967', bgcolor: '#ffffff' }}
            initialState={{
              pinnedColumns: { right: ['visibilidad'] },
            }}
            processRowUpdate={editStopHandler}
          />
        </Box>
      </div>
      <SolicitudesComponent row={selectedRow} open={openSolicitudes} handleClose={handleCloseSolicitudes}></SolicitudesComponent>
      <ComentariosListProfesorComponent clase={selectedRow.name} open={openComentarios} handleClose={handleCloseComentarios} comentarios={selectedComentarios}></ComentariosListProfesorComponent>
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
