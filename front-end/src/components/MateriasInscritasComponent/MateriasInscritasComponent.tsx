import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridCellParams, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import AddCommentIcon from '@mui/icons-material/AddComment';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import Footer from '../FooterComponent/FooterComponent';
import ModalComentarComponent from '../ModalComentarComponent/ModalComentarComponent';


export default function DataGridDemo() {
  const abrirModalComentarios = React.useCallback(
    (row: any) => () => {
      setSelectedRow(row);
      handleClickOpenComentarios()
    },
    [],
  );

  const deshabilitarComentario = (row: any) => {
    return row.estado !== 'Aceptada'  && row.estado !== 'Finalizada';
  }

  const columns = [
    {
      field: 'clase',
      headerName: 'Clase',
      width: 150,
    },
    {
      field: 'profesor',
      headerName: 'Profesor',
      width: 150,
    },
    {
      field: 'fechaInscripcion',
      headerName: 'Fecha de Inscripcion',
      width: 110,
      type:'date'
    },
    {
      field: 'estado',
      headerName: 'Estado',
      type: 'singleSelect',
      width: 150,
    },
    {
      field: 'comentar',
      headerName: 'Comentar',
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
      clase: 'Matematica',
      profesor: 'Julian',
      fechaInscripcion: new Date(),
      estado: 'Aceptada'
    },
    {
      id: 2,
      clase: 'Matematica',
      profesor: 'Julian',
      fechaInscripcion: new Date(),
      estado: 'Cancelada'
    },
    {
      id: 3,
      clase: 'Matematica',
      profesor: 'Julian',
      fechaInscripcion: new Date(),
      estado: 'Finalizada'
    },
    {
      id: 4,
      clase: 'Matematica',
      profesor: 'Julian',
      fechaInscripcion: new Date(),
      estado: 'Solicitada'
    },
  ];
  const [openComentarios, setOpenComentarios] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({materia: '', profesor: ''} as any);



  const handleClickOpenComentarios = () => {
    setOpenComentarios(true);
  };

  const handleCloseComentarios = () => {
    setOpenComentarios(false);
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
    <ModalComentarComponent row={selectedRow} open={openComentarios} handleClose={handleCloseComentarios}></ModalComentarComponent>
    <Footer></Footer>
    </div>
  );
}
