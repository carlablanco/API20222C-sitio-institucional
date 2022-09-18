import { Box } from '@mui/material';
import React, { FC } from 'react';
import styles from './ComentariosComponent.module.scss';
import BlockIcon from '@mui/icons-material/Block';
import BloquearComentariosComponent from '../BloquearComentariosComponent/BloquearComentariosComponent';

interface ComentariosComponentProps {
  comentario?: string,
  usuario?:string,
  isProfesor?: boolean
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

  const handleCloseBloquear = () => {
    setOpenBloquear(false);
  };

  return(
  <Box>
    <div className='usuario-comentario'> 
      {props.usuario}
    </div>
    <div className='texto-comentario'> 
      {props.comentario}
    </div>
    {props.isProfesor && 
      <BlockIcon onClick={abrirModalBloquear()}></BlockIcon>
    }
    <BloquearComentariosComponent usuario={props.usuario} comentario={props.comentario}  open={openBloquear} handleClose={handleCloseBloquear}></BloquearComentariosComponent>
  </Box>
)};

export default ComentariosComponent;
