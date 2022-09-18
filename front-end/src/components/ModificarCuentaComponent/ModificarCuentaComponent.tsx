import React, { FC } from 'react';
import styles from './ModificarCuentaComponent.module.scss';
import { Avatar, Link } from '@mui/material';
import { UserResponse } from '../../models/UserResponse';
import NavbarComponent from '../NavbarComponent/NavbarComponent.lazy';
import FooterComponent from '../FooterComponent/FooterComponent.lazy';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface ModificarCuentaComponentProps { }

export default function PublicarClaseComponent() {
  // Obtiene el usuario del sessionStorage
  const user: UserResponse = JSON.parse(sessionStorage.getItem('usuario')) as any as UserResponse;

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nombre: data.get('nombre'),
      email: data.get('email'),
      telefono: data.get('telefono'),
    });
  }

  const DatosProfesor = () => {
    return (
      <><Typography component="h1" variant="h5" >
        Datos Profesor
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Titulo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Experiencia"
              />
            </Grid>
          </Grid>

      </>
    );
  }

  const DatosAlumno = () => {
    return (
      <><Typography component="h1" variant="h5" >
        Datos Alumno
      </Typography>
      </>
    );
  }

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5" >
            Cambiar los datos de tu cuenta
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Nombre"
                defaultValue={user.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Correo"
                defaultValue={user.email}
              />
            </Grid>

            <Grid item xs={12}>
            {user?.type == 'professor' && DatosProfesor()}
            {user?.type == 'student' && DatosAlumno()}
            </Grid>

          </Grid>

        </Box>

      </Container>
      <FooterComponent></FooterComponent>
    </div>


  );
}
