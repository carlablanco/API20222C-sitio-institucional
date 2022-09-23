import { UserResponse } from "../../models/UserResponse";
import FormComponent from "../FormComponent/FormComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";
import FooterComponent from "../FooterComponent/FooterComponent.lazy";
import styles from "./HomeComponent.module.scss";
import InformationCardsComponent from "../InformationCardComponent/InformationCardsComponent";

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
      ¡No postergues más tu futuro! 
    </h2>
    <h3 className={styles.subtitle}>
      Clases nuevas todos los días
    </h3>
    <FormComponent></FormComponent>
    <InformationCardsComponent></InformationCardsComponent>
    </>
    );
  }

  const ProfessorView = () => {
    return (
      <>{/* Esto deberia mostrarse en la vista profesor, y la que es por defecto tiene que ser igual a la del alumno */}
      <h1 className={styles.title}>¡Se parte de nosotros!</h1>
      <h3 className={styles.subtitle}>- Puedes dictar tus clases con la modalidad que mas te interese.</h3>
      <h3 className={styles.subtitle}>- Puedes tener cientos de alumnos interesados en tu conocimiento.</h3>
      <h3 className={styles.subtitle}>- Brinda tus experiencias y sabidurias con los demas.</h3>
      <h6 className={styles.subtitle}>Todo ello en Culture Tour, ¿Qué estas esperando?</h6>
      <h4 className={styles.titletem}>Ejemplos de tematicas mas solicitadas por nuestros alumnos</h4>
      <InformationCardsComponent></InformationCardsComponent>
    </>
    );
  }

if (!user || user.type == 'student') {

  var tiers = [
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

}

else {
  var tiers = [
    {
      title: '1. Empezá',
      description: [
        'Dirigite a la sección “Publicar Clase”'
      ],
    },
    {
      title: '2. Completá',
      description: [
        'Rellena el formulario con los datos requeridos'
      ]
    },
    {
      title: '3. Publicá',
      description: [
        'Finalmente confirmá la informacion, clickeá en “Publicar” y listo!'
      ]
    }
  ];
}


    return(
      <div>
      <NavbarComponent></NavbarComponent> 
      
      
      {(!user || user?.type == 'student') && GuestorAlumnoView()}
      {(user?.type == 'professor') && ProfessorView()}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 4 }}>
        <Typography
          component="h3"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx = {{mt: 3}}
        >
          ¿Estás listo?
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
      </div >
    )
}

export default Home;