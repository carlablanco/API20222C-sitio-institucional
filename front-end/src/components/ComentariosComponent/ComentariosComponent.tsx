import { Box } from '@mui/material';
import React, { FC } from 'react';
import styles from './ComentariosComponent.module.scss';

interface ComentariosComponentProps {
  comentario?: string,
  usuario?:string,
}

const ComentariosComponent: FC<ComentariosComponentProps> = (props) => (
  <Box>
    <div className='usuario-comentario'> 
      {props.usuario}:
    </div>
    <div className='texto-comentario'> 
      {props.comentario}
    </div>
  </Box>
);

export default ComentariosComponent;
