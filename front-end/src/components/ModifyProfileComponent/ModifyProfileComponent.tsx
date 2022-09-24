import React, { FC } from 'react';
import styles from './ModifyProfileComponent.module.scss';
import { Avatar, IconButton, Link } from '@mui/material';
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
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getName, getType, isLoggedIn, getEmail } from "../../hooks/authhook";

interface ModifyProfileComponentProps { }


export default function ModifyProfileComponent() {
  
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

  const inputChange = (e,  index, key) => {
    const userDataHelper = [...userData];
    userDataHelper[index][key] = e.target.value;
    setUserData(userDataHelper);
  }

//TODO - DESCUBRIR PORQUE BORRA VISUALEMENTE EL ULTIMO ELEMENTO CUANDO LOGICAMENTE BORRA EL SELECCIONADO
  const deleteExperience = (index) => {
    const userDataHelper = [ ...userData ];
    userDataHelper.splice(index, 1);
    setUserData(userDataHelper);
  };

  const addExperience = () => {
    const userDataHelper = [ ...userData ];
    userDataHelper.push(newEntry);
    setUserData(userDataHelper);
  }
//TODO - DESCUBRIR PORQUE BORRA VISUALEMENTE EL ULTIMO ELEMENTO CUANDO LOGICAMENTE BORRA EL SELECCIONADO
  const deleteStudies = (index) => {
    const userDataHelper = [ ...userData ];
    userDataHelper.splice(index, 1);
    setUserData(userDataHelper);
  };

  const addStudies = () => {
    const userDataHelper = [ ...userData ];
    userDataHelper.push(newEntry);
    setUserData(userDataHelper);
  }

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const [editing, setEditing] = React.useState(false);


  const mockProfesor = [{
      titulo: 'Experiencia 1',
      experiencia: '2 Años'
    },
    {
      titulo: 'Experiencia 2',
      experiencia: '1 Año'
    },
    {
      titulo: 'Experiencia 3',
      experiencia: '6 Meses'
    }]

  const mockAlumno = [{
      tipo: 'Secundario',
      estado: 'Finalizado'
    },
    {
      tipo: 'Universitario',
      estado: 'En Curso'
    }]

  const [userData, setUserData] = React.useState(getType() === 'professor' ? mockProfesor : mockAlumno as any);

  const newEntry = getType() === 'professor' ? {
    titulo: '',
    experiencia: ''
  } : {
    tipo: '',
    estado: ''
  };




  const DatosProfesor = () => {
    return (
      <>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={10}>
            <Typography component="h1" variant="h5" >
              Datos Profesor
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton disabled={!editing} onClick={addExperience}><AddIcon></AddIcon></IconButton>
          </Grid>
        </Grid>


        <Grid container spacing={2} sx={{ mt: 1 }}>
          {userData?.map((experiencia, i) => {
            return (
              <Grid container spacing={2} key={i} item xs={12}>
                <Grid item xs={5}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Titulo"
                    value={experiencia.titulo}
                    disabled={!editing}
                    onInput={(event) => inputChange(event, i, 'titulo')}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Experiencia"
                    value={experiencia.experiencia}
                    disabled={!editing}
                    onInput={(event) => inputChange(event, i, 'experiencia')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton disabled={!editing} onClick={() => deleteExperience(i)}><ClearIcon></ClearIcon></IconButton>
                </Grid>
              </Grid>
            )
          })}
        </Grid>

      </>
    );
  }

  const DatosAlumno = () => {
    return (
      <>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={10}>
            <Typography component="h1" variant="h5" >
              Datos Alumno
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton disabled={!editing} onClick={addStudies}><AddIcon></AddIcon></IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <Stack spacing={3}>
                <DesktopDatePicker
                  disabled={!editing}
                  label="Fecha de Nacimiento"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          {
            userData?.map((estudio, i) => {
              return (
                <Grid container spacing={2} key={i} item xs={12} >
                  <Grid item xs={5}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Titulo Obtenido"
                      value={estudio.tipo}
                      disabled={!editing}
                      onInput={(event) => inputChange(event, i, 'tipo')}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl disabled={!editing} required fullWidth>
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={estudio.estado}
                        label="Estado"
                        onChange={(event) => inputChange(event, i, 'estado')}
                      >
                        <MenuItem value={'Finalizado'}>Finalizado</MenuItem>
                        <MenuItem value={'En Curso'}>En Curso</MenuItem>
                        <MenuItem value={'Abandonado'}>Abandonado</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton disabled={!editing} onClick={() => deleteStudies(i)}><ClearIcon></ClearIcon></IconButton>
                  </Grid>

                </Grid>
              )
            })
          }

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
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={10}>
              <Typography component="h1" variant="h5" >
                Cambia los datos de tu cuenta
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={toggleEditing}><EditIcon></EditIcon></IconButton>
            </Grid>
          </Grid>


          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Nombre"
                defaultValue={getName()}
                disabled={!editing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Correo"
                defaultValue={getEmail()}
                disabled={!editing}
              />
            </Grid>

            <Grid item xs={12}>
              {getType() == 'professor' && DatosProfesor()}
              {getType() == 'student' && DatosAlumno()}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!editing}
          >
            Cambiar Datos
          </Button>
        </Box>

      </Container>
      <FooterComponent></FooterComponent>
    </div>


  );
}
