import { UserResponse } from "../../models/UserResponse";
import FormComponent from "../FormComponent/FormComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";
import FooterComponent from "../FooterComponent/FooterComponent.lazy";
import styles from "./HomeComponent.module.scss";


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function Home(){
  const user: UserResponse = JSON.parse(sessionStorage.getItem('usuario')) as any as UserResponse;

  const GuestorAlumnoView = () => {
    return (
      <><h2 className={styles.title}>
      ¡No postergues mas tu futuro! 
    </h2>
    <h3 className={styles.subtitle}>
      Clases nuevas todos los dias
    </h3>
    <FormComponent></FormComponent></>
    );
  }

  const tiers = [
    {
      title: '1. Buscá tu clase',
      description: [
        'Utilizá el buscador de clases de arriba para elegir la clase que más te guste.'
      ],
    },
    {
      title: '2. Inscribite',
      description: [
        'Inscribite a la clase que elegiste, llenando el form con tus datos requeridos:',
        'Tu teléfono, tu email, un horario de preferencia y un comentario para el profesor.'
      ]
    },
    {
      title: '3. Coordiná',
      description: [
        'Ponete en contacto con el profe, y listo!'
      ],
    },
  ];


    return(
      <div>
      <NavbarComponent></NavbarComponent>
      {(!user || user?.type == 'student') && GuestorAlumnoView()}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 4 }}>
        <Typography
          component="h3"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          ¿Cómo comienzo?
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
        Aprendé cómo inscribirte a tu primera clase con el siguiente tutorial:
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                    {tier.description.map((line) => (
                      <Typography

            
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <FooterComponent></FooterComponent>
      </div>
    )
}

export default Home;