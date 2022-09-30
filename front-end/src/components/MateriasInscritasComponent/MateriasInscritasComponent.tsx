import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridCellParams, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ClearIcon from '@mui/icons-material/Clear';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import Footer from '../FooterComponent/FooterComponent';
import ModalComentarComponent from '../ModalComentarComponent/ModalComentarComponent';
import styles from "./MateriasInscritasComponent.module.scss";
import { getName } from '../../hooks/authhook';
import ModalCancelarComponent from '../ModalCancelarComponent/ModalCancelarComponent';


export default function DataGridDemo() {
  
  const abrirModalComentarios = React.useCallback(
    (row: any) => () => {
      setSelectedRow(row);
      handleClickOpenComentarios()
    },
    [],
  );

  const abrirModalCancelar = React.useCallback(
    (row: any) => () => {
      setSelectedRow(row);
      handleClickOpenCancelar()
    },
    [],
  );

  const deshabilitarComentario = (row: any) => {
    return row.estado !== 'Aceptada'  && row.estado !== 'Finalizada';
  }

  const deshabilitarCancelar = (row: any) => {
    return row.estado === 'Cancelada' || row.estado === 'Finalizada';
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
      width: 120,
    },
    {
      field: 'fechaInscripcion',
      headerName: 'Fecha de Inscripcion',
      width: 200,
      type:'date'
    },
    {
      field: 'estado',
      headerName: 'Estado',
      type: 'singleSelect',
      width: 100,
    },
    {
      field: 'comentar',
      headerName: '',
      type: 'actions',
      width: 70,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem disabled={deshabilitarComentario(params.row)} icon={<AddCommentIcon />} onClick={abrirModalComentarios(params.row)} label="Ver Comentarios" />,
        <GridActionsCellItem disabled={deshabilitarCancelar(params.row)} icon={< ClearIcon/>} onClick={abrirModalCancelar(params.row)} label="Cancelar Inscripcion" />,

      ],
      resizable: false
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

  const [openCancelar, setOpenCancelar] = React.useState(false);

  const handleClickOpenCancelar = () => {
    setOpenCancelar(true);
  };

  const handleCloseCancelar = () => {
    setOpenCancelar(false);
  };
  return (
    <div>
    <NavbarComponent></NavbarComponent>
    <div>
      <h4 className={styles.alumno}>Alumno: {getName()}</h4>
    </div>
    <Box sx={{ height: 600, width: '95%', border:1, borderRadius: 3, borderColor: '#000000', bgcolor: '#0a40c9e1', boxShadow: 20, 
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
          pinnedColumns: { right: ['comentar'] },
        }}
      />
    </Box>
    <ModalComentarComponent row={selectedRow} open={openComentarios} handleClose={handleCloseComentarios}></ModalComentarComponent>
    <ModalCancelarComponent row={selectedRow} open={openCancelar} handleClose={handleCloseCancelar}></ModalCancelarComponent>
    <Footer></Footer>
    </div>
  );
}
