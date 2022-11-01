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
import styles from "./GridComponent.module.scss";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { isLoggedIn } from '../../hooks/authhook';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { filterClass, FilterClassPayload } from '../../services/class.service';

interface DataGridDemoProps {
  filters?: any
}


const  GridComponent: FC<DataGridDemoProps> = (props: any) => {


  React.useEffect(() => {
    getRows()
  }, [])
  
  
  let navigate = useNavigate();

  const inscribirMateria = React.useCallback(
    (row: any) => () => {
      if(isLoggedIn()){
        setMateria(row.name)
        handleClickOpenSolicitud()
      } else {
        navigate("/login"); 
      }
    },
    [],
  );

  const verComentario = React.useCallback(
    (row: any) => () => {
      setMateria(row.name)
      setProfesor({
        nombre: row.professor,
        experiencia: row.professorExperience ? row.professorExperience : null
      });
      setComentarios(row.comments)
      handleClickOpenComentarios()
    },
    [],
  );
  
  const columns = [
    {
      field: 'professor',
      headerName: 'Profesor',
      width: 150,
      cellClassName: styles.professorCell,
    },
    {
      field: 'name',
      headerName: 'Materia',
      width: 150,
    },
    {
      field: 'duration',
      headerName: 'Duracion',
      width: 110,
    },
    {
      field: 'cost',
      headerName: 'Costo',
      type: 'number',
      width: 75,
    },
    {
      field: 'rating',
      headerName: 'Calificacion',
      type: 'number',
      width: 120,
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      width: 70,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<CommentIcon />} onClick={verComentario(params.row)} label="Ver Comentarios" />,
        <GridActionsCellItem icon={<AddIcon />} onClick={inscribirMateria(params.row)} label="Inscribir Materia" />,
      ]
    },
  ];

  const [rows, setRows] = React.useState([]);

  const cellClickHandler = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
    if (params.field === "professor") {
      setProfesor({
        nombre: params.row.professor,
        experiencia: params.row.professorExperience
      });
      setMateria(params.row.name)
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

  const [selectedMateria, setMateria] = React.useState<any>();

  const getRows = async () => {
    try {
      const payload: FilterClassPayload = {
        name: props?.filters?.materia?.label,
        type: props?.filters?.tipoDeClase?.label,
        frequency: props?.filters?.frecuencia?.label,
        rating: parseInt(props?.filters?.calificacion?.label)
      }
      const response = await filterClass(payload);
      setRows(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.GridComponent}>
      <Box sx={{ height: 600, width: "95%", border:1, borderRadius: 3, borderColor: '#000000', bgcolor: '#0a40c9e1', boxShadow: 20, 
      my: 0, mx: "auto" , padding: 2}} >
        <DataGridPro
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onCellClick={cellClickHandler}
          sx={{border:1, borderColor: '#002967', bgcolor: '#ffffff' }}
          initialState={{
            pinnedColumns: { right: ['actions'] },
          }}
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
    </div>
  );
}

export default GridComponent;