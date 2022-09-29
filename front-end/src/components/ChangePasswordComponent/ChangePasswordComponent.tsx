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
import Button from '@mui/material/Button';

interface ModificarCuentaComponentProps { }

export default function ChangePasswordComponent() {
  // Obtiene el usuario del sessionStorage
  const user: UserResponse = JSON.parse(sessionStorage.getItem('usuario')) as any as UserResponse;

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      newPassword: data.get('newPassword'),
    });
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
            border: 1,
            padding: 2,
            boxShadow: 20,
          }}
        >

          <Typography component="h1" variant="h5" >
            Cambiá tu contraseña
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                required
                label="Nueva contraseña"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Repetí tu contraseña"
              />
            </Grid>

          </Grid>

          <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cambiar contraseña
              </Button>

        </Box>

      </Container>
      <FooterComponent></FooterComponent>
    </div>


  );
}
