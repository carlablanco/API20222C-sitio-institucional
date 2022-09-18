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
  
  
  

  const LoginButtons = () => {
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 0.01 }} align="right" >
        <a className={styles.login} href="/login">Ingresa </a>
      </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 0.01 }} align="right" >
          <a className={styles.login} href="/register">Registrate </a>
        </Typography></>
    );
  }

  const GuestButtons = () => {
    return (
      <><Typography variant="h6" component="div"   sx={{ flexGrow: 0.1 }} align="left">
        <a className={styles.title} href="/">Inicio</a>
      </Typography>
        <Typography variant="h6" component="div"   sx={{ flexGrow: 1 }} align="left">
          <a className={styles.title} href="/clases">Clases</a>
        </Typography>
       </>
    );
  }

  const AlumnoButtons = () => {
    return (
      <><Typography variant="h6" component="div"  sx={{ flexGrow: 0.1}} align="left">
        <a className={styles.title} href="/">Inicio</a>
      </Typography>
        <Typography variant="h6" component="div"  sx={{ flexGrow: 0.1 }} align="left">
          <a className={styles.title} href="/clases">Clases</a>
        </Typography>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
          <a className={styles.title} href="/inscripciones">Mis Clases </a>
        </Typography></>
    );
  }


  const ProfesorButtons = () => {
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }} align="left">
        <a className={styles.title} href="/">Inicio</a>
      </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }} align="left">
          <a className={styles.title} href="/">Publicar Clase</a>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
          <a className={styles.title} href="/clases-asignadas">Mis Clases </a>
        </Typography></>
    );
  }


  return (

    <header>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar className={styles.barra}>
            <Typography variant="h6" component="div" className={styles.contenedor} sx={{ flexGrow: 0.1 }} align="center">
              <a href="/"> <img src={logo} alt="Logo" className={styles.logo} /></a>
            </Typography>
            {user?.type == 'professor' && ProfesorButtons()}
            {user?.type == 'student' && AlumnoButtons()}
            {!user && GuestButtons()}
            {!user && LoginButtons()}
            {user && <Avatar className={styles.avatar} alt={user?.name} src={user?.picture} ></Avatar>}
          </Toolbar>
        </AppBar>
      </Box>

    </header>

  );
}
//
