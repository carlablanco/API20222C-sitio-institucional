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
import { changePassword, ChangePasswordPayload } from '../../services/register';
import * as qs from 'query-string';


interface ModificarCuentaComponentProps { }

export default function ChangePasswordComponent(props: any) {
  // Obtiene el usuario del sessionStorage
  const user: UserResponse = JSON.parse(sessionStorage.getItem('usuario')) as any as UserResponse;

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    try {
      event.preventDefault();
      const token = qs.parse(window.location.search).token as string;
      console.log(token);
      const data = new FormData(event.currentTarget);
      const payload: ChangePasswordPayload = {
        token: token,
        newPassword: data.get('newPassword').toString()
      };
      const response = await changePassword(payload);

    } catch (error) {
      console.log(error);
    }

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
                name='newPassword'
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
