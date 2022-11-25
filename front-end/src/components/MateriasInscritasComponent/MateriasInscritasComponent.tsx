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
import { getName, getUserId } from '../../hooks/authhook';
import ModalCancelarComponent from '../ModalCancelarComponent/ModalCancelarComponent';
import { findEnrollments } from '../../services/class-enrollment.service';
import { getProfessorExperience } from '../../services/experience.service';


export default function DataGridDemo() {

  React.useEffect(() => {
    getRows()
  }, [])

  const [rows, setRows] = React.useState([]);

  
  const getRows = async () => {
    try {
      let response = await findEnrollments(getUserId());
      response.data = await response.data.map(async row => {
        const professor = await getProfessorName(row?.class_student?.professor);
        return {
          id: row?.id,
          class: row?.class_student?.name,
          professor: professor.data[0].user.name + ' ' + professor.data[0].user.surname,
          createdAt: new Date(row?.createdAt),
          status: row?.status,
          id_class: row?.id_class
        }
      });
      Promise.all(response.data).then((data) =>{
        console.log(data)
        setRows(data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getProfessorName = async(user_id) => {
    return await getProfessorExperience({user_id});
  }
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
    return row.status !== 'Aceptada'  && row.status !== 'Finalizada';
  }

  const deshabilitarCancelar = (row: any) => {
    return row.status === 'Cancelada' || row.status === 'Finalizada';
  }

  const columns = [
    {
      field: 'class',
      headerName: 'Clase',
      width: 150,
    },
    {
      field: 'professor',
      headerName: 'Profesor',
      width: 120,
    },
    {
      field: 'createdAt',
      headerName: 'Fecha de Inscripcion',
      width: 200,
      type:'date'
    },
    {
      field: 'status',
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
