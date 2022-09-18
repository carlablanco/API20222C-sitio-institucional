import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import Footer from '../FooterComponent/FooterComponent';
import SolicitudesComponent from '../SolicitudesComponent/SolicitudesComponent';


export default function MateriasAsignadasComponent() {
  const abrirModalComentarios = React.useCallback(
    (row: any) => () => {
      setSelectedRow(row);
      handleClickOpenSolicitudes()
    },
    [],
  );

  const deshabilitarComentario = (row: any) => {
    return row.estado !== 'Activa'  && row.estado !== 'Finalizada'
  }

  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
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
      field: 'frecuencia',
      headerName: 'Frecuencia',
      width: 150,
    },
    {
      field: 'solicitudes',
      headerName: 'Solicitudes de Inscripcion',
      type: 'actions',
      width: 200,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<AnnouncementIcon />} onClick={abrirModalComentarios(params.row)} label="Ver Solicitudes de Inscripcion" />,
      ]
    },
    {
      field: 'comentar',
      headerName: 'Comentarios',
      type: 'actions',
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem disabled={deshabilitarComentario(params.row)} icon={<AddCommentIcon />} onClick={abrirModalComentarios(params.row)} label="Ver Comentarios" />,
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
    },
    {
      id: 2,
      nombre: 'Clase 2',
      materia: 'Fisica',
      duracion: '3 Meses',
      frecuencia: 'Semanal',
    },
    {
      id: 3,
      nombre: 'Clase 3',
      materia: 'Programacion',
      duracion: '1 Semana',
      frecuencia: 'Diaria',
    },
    {
      id: 4,
      nombre: 'Clase 4',
      materia: 'Matematica',
      duracion: '1 Año',
      frecuencia: 'Mensual',
    },
  ];
  const [openSolicitudes, setOpenSolicitudes] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({materia: '', profesor: ''} as any);



  const handleClickOpenSolicitudes = () => {
    setOpenSolicitudes(true);
  };

  const handleCloseComentarios = () => {
    setOpenSolicitudes(false);
  };
  return (
    <div>
    <NavbarComponent></NavbarComponent>
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
    <SolicitudesComponent row={selectedRow} open={openSolicitudes} handleClose={handleCloseComentarios}></SolicitudesComponent>
    <Footer></Footer>
    </div>
  );
}
