import { Box } from '@mui/material';
import React, { FC } from 'react';
import styles from './ComentariosComponent.module.scss';
import BlockIcon from '@mui/icons-material/Block';
import BloquearComentariosComponent from '../BloquearComentariosComponent/BloquearComentariosComponent';


interface ComentariosComponentProps {
  id?: number,
  comentario?: string,
  usuario?:string,
  isProfesor?: boolean,
  mail?: string,
  deleteComment?: Function
}


const ComentariosComponent: FC<ComentariosComponentProps> = (props) => { 
  const abrirModalBloquear = React.useCallback(
    () => () => {
      handleClickOpenBloquear()
    },
    [],
  );

  const [openBloquear, setOpenBloquear] = React.useState(false);

  const handleClickOpenBloquear = () => {
    setOpenBloquear(true);
  };

  const handleCloseBloquear = (isDelete = false) => {
    if(isDelete){
      props.deleteComment(props.id)
    }
    setOpenBloquear(false);
  };

  return(
  <Box sx={{borderStyle: "dashed", borderColor: "#00000086" , my: 1, mx: "auto" , padding: 2}}>
    <div className={styles.title}> 
      {props.usuario}
    </div>
    <div className={styles.subtitle}> 
      {props.comentario}
    </div>
    {props.isProfesor && 
      <BlockIcon sx={{mx:1 , my: 1}} onClick={abrirModalBloquear()}></BlockIcon>
    }
    <BloquearComentariosComponent usuario={props.usuario} comentario={props.comentario} id={props.id} mail={props.mail} open={openBloquear} handleClose={handleCloseBloquear}></BloquearComentariosComponent>
  </Box>
)};

export default ComentariosComponent;
