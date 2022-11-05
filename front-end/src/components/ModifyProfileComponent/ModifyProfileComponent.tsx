import React, { FC, useRef, useState } from 'react';
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
import { getName, getType, isLoggedIn, getEmail, getPhone, getUserId } from "../../hooks/authhook";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-number-input/style.css';
import { createProfessorExperience, deleteProfessorExperience, getProfessorExperience, modifyProfessorExperience } from '../../services/experience.service';
import { createStudentStudies, getStudentStudies, modifyStudentStudies } from '../../services/studies.sevice';

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
    userDataHelper[index].modified = true
    setUserData(userDataHelper);
  }


  const addExperience = () => {
    const userDataHelper = [ ...userData ];
    userDataHelper.push(newEntry);
    setUserData(userDataHelper);
  }
  const deleteEntry = async (index) => {
    const userDataHelper = [ ...userData ];
    const indexId = userDataHelper[index].id;
    userDataHelper.splice(index, 1);
    setUserData(userDataHelper);
    if(getType() === 'professor'){
      await deleteProfessorExperience(indexId)
    }
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

  const [userData, setUserData] = React.useState([] as any || '' );

  const stateRef = useRef([]);
  stateRef.current = userData as any;

  const newEntry = getType() === 'professor' ? {
    id: null,
    type: '',
    years: ''
  } : {
    id: null,
    title: '',
    status: ''
  };

  React.useEffect(() => {
    if (getType() === 'professor') {
      getExperience()
    } else {
      getStudies()
    }
  }, [])

  const getExperience = async () => {
    try {
      const response = await getProfessorExperience({"user_id": getUserId()});
      response.data = response.data.map((element) => {
        return {...element,
                modified: false
              }
      });
      setUserData(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getStudies = async () => {
    try {
      const response = await getStudentStudies({"user_id": getUserId()});
      response.data = response.data.map((element) => {
        return {...element,
                modified: false
              }
      });
      setUserData(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  
  const guardarCambios = React.useCallback(
    () => () => {
      if(getType() === 'professor'){
        uploadExperience().then(() => {
          window.location.reload();
         });
      } else{
        uploadStudies().then(() => {
          window.location.reload();
         });
      }
    },
    [],
  );

  const uploadExperience = async () => {
    try {
      if(stateRef?.current){
        stateRef['current'].forEach( async (element) => {
         try {
          if(!element.id){
            const response = await createProfessorExperience({
              user_id: getUserId(),
              type: element.type,
              years: element.years
             });
          } else if(element.modified){
            const response = await modifyProfessorExperience({
              user_id: getUserId(),
              id: element.id,
              type: element.type,
              years: element.years
             });
          }
         } catch (error) {
          console.log(error);
         }
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  
  const uploadStudies = async () => {
    try {
      if(stateRef?.current){
        stateRef['current'].forEach( async (element) => {
         try {
          if(!element.id){
            const response = await createStudentStudies({
              user_id: getUserId(),
              title: element.title,
              status: element.status
             });
          } else if(element.modified){
            const response = await modifyStudentStudies({
              user_id: getUserId(),
              id: element.id,
              title: element.title,
              status: element.status
             });
          }
         } catch (error) {
          console.log(error);
         }
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  



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
                    value={experiencia.type}
                    disabled={!editing}
                    onInput={(event) => inputChange(event, i, 'type')}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Experiencia"
                    value={experiencia.years}
                    disabled={!editing}
                    onInput={(event) => inputChange(event, i, 'years')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton disabled={!editing} onClick={() => deleteEntry(i)}><ClearIcon></ClearIcon></IconButton>
                </Grid>
              </Grid>
            )
          })}
        </Grid>

      </>
    );
  }

  const [phoneValue, phoneSetValue] = useState();

  const setPhoneValue = (event) => {
    phoneSetValue(event)
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
              <Stack spacing={3}>
              <PhoneInput
                  inputClass={styles.formControl}
                  disabled={!editing}
                  placeholder="Numero de telefono"
                  specialLabel="Numero de telefono"
                  country={'ar'}
                  value={getPhone()}
                  onChange={setPhoneValue}
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
                      value={estudio.title}
                      disabled={!editing}
                      onInput={(event) => inputChange(event, i, 'title')}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl disabled={!editing} required fullWidth>
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={estudio.status}
                        label="Estado"
                        onChange={(event) => inputChange(event, i, 'status')}
                      >
                        <MenuItem value={'Finalizado'}>Finalizado</MenuItem>
                        <MenuItem value={'En Curso'}>En Curso</MenuItem>
                        <MenuItem value={'Abandonado'}>Abandonado</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton disabled={!editing} onClick={() => deleteEntry(i)}><ClearIcon></ClearIcon></IconButton>
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
    <div className={styles.ModifyProfileComponent}>
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
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Correo"
                defaultValue={getEmail()}
                disabled={true}
              />
            </Grid>

            <Grid item xs={12}>
              {getType() === 'professor' && DatosProfesor()}
              {getType() === 'student' && DatosAlumno()}
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!editing}
            onClick={guardarCambios()}
          >
            Cambiar Datos
          </Button>
        </Box>

      </Container>
      <FooterComponent></FooterComponent>
    </div>


  );
}
