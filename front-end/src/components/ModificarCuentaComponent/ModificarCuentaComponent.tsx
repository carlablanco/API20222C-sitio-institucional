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
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

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

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const [studies, setStudies] = React.useState('');
  const handleChangeStudies = (event: SelectChangeEvent) => {
    setStudies(event.target.value as string);
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

      <Grid container spacing={2} sx={{ mt: 1 }}>

      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="DD/MM/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel>Estudios alcanzados</InputLabel>
                    <Select
                      value={studies}
                      label="Estudios Alcanzados"
                      onChange={handleChangeStudies}
                    >

                      <MenuItem value={'Primario Incompleto'}>Primario Incompleto</MenuItem>
                      <MenuItem value={'Primario En Curso'}>Primario En Curso</MenuItem>
                      <MenuItem value={'Primario Terminado'}>Primario Terminado</MenuItem>
                      <MenuItem value={'Secundario Incompleto'}>Secundario Incompleto</MenuItem>
                      <MenuItem value={'Secundario En Curso'}>Secundario En Curso</MenuItem>
                      <MenuItem value={'Secundario Terminado'}>Secundario Terminado</MenuItem>
                      <MenuItem value={'Terciario Incompleto'}>Terciario Incompleto</MenuItem>
                      <MenuItem value={'Terciario En Curso'}>Terciario En Curso</MenuItem>
                      <MenuItem value={'Terciario Terminado'}>Terciario Terminado</MenuItem>
                      <MenuItem value={'Universitario Incompleto'}>Universitario Incompleto</MenuItem>
                      <MenuItem value={'Universitario En Curso'}>Universitario En Curso</MenuItem>
                      <MenuItem value={'Universitario Terminado'}>Universitario Terminado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
        </Grid>

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

          <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cambiar Datos
              </Button>
        </Box>

      </Container>
      <FooterComponent></FooterComponent>
    </div>


  );
}
