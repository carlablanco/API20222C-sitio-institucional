import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from "axios";
import { UserResponse } from '../../models/UserResponse';
import styles from './NavbarComponent.module.scss';
import logo from '../../img/logo.png';


export default function ButtonAppBar() {
  // Obtiene el usuario del sessionStorage
  const user: UserResponse = JSON.parse(sessionStorage.getItem('usuario')) as any as UserResponse;
  return (
    <header>
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar className={styles.barra}>
            <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0.1 }}>
              <a href="/"> <img src={logo} alt="Logo" className={styles.logo}/></a>
            </Typography>
            
            <Typography variant="h6" component="div"  sx={{ flexGrow: 0.1 }}>
              <a className={styles.title} href="/">Inicio</a>
            </Typography>
            <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0.1 }}>
            <a className={styles.title} href="/clases">Clases</a>
            </Typography>
            <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0.1 }}>
            <a className={styles.title} href="/inscripciones">Inscripciones</a>
            </Typography>
            <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 1 }}>
            <a className={styles.title} href="/profesores">Profesores </a>
            </Typography>

            <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0 }}>
            <a className={styles.login} href="/login">Ingresa </a>
            </Typography>
            
            <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0 }}>
            <a className={styles.login} href="/register">Registrate </a>
            </Typography>
        
            
          </Toolbar>
        </AppBar>
      </Box>

    </header>
    
  );
}
//<Avatar alt={user?.name} src={user?.picture}></Avatar>
