import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";
import FooterComponent from "../FooterComponent/FooterComponent.lazy";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, SxProps, Theme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// TODO @carlablanco implementar duracion de las clases

const theme = createTheme();

export default function PublicarClaseComponent() {
  const [tipoClase, setTipoClase] = React.useState('');

  const handleChangeTipoClase = (event: SelectChangeEvent) => {
    setTipoClase(event.target.value as string);
  }

  const [frecuencia, setFrecuencia] = React.useState('');
  const handleChangeFrecuencia = (event: SelectChangeEvent) => {
    setFrecuencia(event.target.value as string);
  }

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      materia: data.get('materia'),
    });
  }

  const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
            <Box sx={{ height: "auto", width: "fit-content", border:1, borderRadius: 3, borderColor: '#000000', boxShadow: 20, 
        my: 0, mx: "auto" , padding: 2 }}>

              <Typography component="h1" variant="h5" >
                Publicar una clase
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Materia"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Descripción corta"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel  id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                      value={tipoClase}
                      label="Tipo de Clase"
                      onChange={handleChangeTipoClase}
                    >
                      <MenuItem value={'Individual'}>Individual</MenuItem>
                      <MenuItem value={'Grupal'}>Grupal</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel>Frecuencia</InputLabel>
                    <Select
                      value={frecuencia}
                      label="Frecuencia de la Clase"
                      onChange={handleChangeFrecuencia}
                    >
                      <MenuItem value={'Unica'}>Unica</MenuItem>
                      <MenuItem value={'Semanal'}>Semanal</MenuItem>
                      <MenuItem value={'Mensual'}>Mensual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>


                <Grid item xs={12}>
                  <TextField
                  required
                    id="outlined-number"
                    label="Costo"
                    type= "number"
                    //TODO @carlablanco: le podes poner negativos si usas copy paste, solucionar
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      inputProps: { min: 0 }
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Publicar
              </Button>
            </Box>

          </Box>
          <FooterComponent></FooterComponent>
        </Container>
      </ThemeProvider>
    </div>
  );
}
