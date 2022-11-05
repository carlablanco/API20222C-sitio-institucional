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
import { getProfessorExperience } from '../../services/experience.service';

interface DataGridDemoProps {
  filters?: any
}


const  GridComponent: FC<DataGridDemoProps> = (props: any) => {


  React.useEffect(() => {
    getRows()
  }, [])

  const [rows, setRows] = React.useState([]);
  
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
  
  let navigate = useNavigate();

  const inscribirMateria = React.useCallback(
    (row: any) => () => {
      if(isLoggedIn()){
        setMateria({nombre: row.name, id: row.id})
        handleClickOpenSolicitud()
      } else {
        navigate("/login"); 
      }
    },
    [],
  );

  const verComentario = React.useCallback(
    (row: any) => () => {
      setMateria({nombre: row.name, id: row.id})
      setProfesor({
        id: row.professor_fk,
        nombre: row.professor,
        experiencia: row.professorExperience ? row.professorExperience : null
      });
      const comentarios: Array<Comentario> = row.comments.map((comment): Comentario => {
        return {
          id: comment.id,
          usuario: comment.student.name + ' ' + comment.student.surname,
          comentario: comment.content
        }
      })
      setComentarios(comentarios);
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


  const cellClickHandler = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
    if (params.field === "professor") {
      setMateria({nombre: params.row.name, id: params.row.id})
      console.log(selectedProfesor)
      handleClickOpenProfesor();
    }
  }

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

  const [openProfesor, setOpenProfesor] = React.useState(false);
  const [selectedProfesor, setProfesor] = React.useState<Profesor>({
    id: null,
    nombre: '',
    experiencia: [
      {
        descripcion: '',
        anios: 0
      }
    ]
  });


  const handleClickOpenProfesor = async () => {
    try{
      const professor = await getProfessorExperience({'user_id': selectedProfesor.id});
      setProfesor({
        id: professor.data[0].user.id,
        nombre: professor.data[0].user.name + ' ' + professor.data[0].user.surname,
        experiencia: professor.data
      });
      setOpenProfesor(true);
    } catch(error){
      console.log(error)
    }
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
          materia={selectedMateria?.nombre}
          profesor={selectedProfesor} />
        <SolicitarClaseComponent open={openSolicitud} handleClose={handleCloseSolicitud} clase={selectedMateria} ></SolicitarClaseComponent>
      </Box>
    </div>
  );
}

export default GridComponent;