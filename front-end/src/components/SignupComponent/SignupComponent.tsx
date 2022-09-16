import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, SxProps, Theme, ThemeProvider } from '@mui/material/styles';
import { CommonProps } from '@mui/material/OverridableComponent';
import { SystemProps } from '@mui/system';
import styles from './SignupComponent.module.scss';
import logo from '../../img/logo.png';

function Copyright(props: JSX.IntrinsicAttributes & { component: React.ElementType<any>; } & SystemProps<Theme> & { align?: "inherit" | "left" | "center" | "right" | "justify" | undefined; children?: React.ReactNode; classes?: Partial<TypographyClasses> | undefined; gutterBottom?: boolean | undefined; noWrap?: boolean | undefined; paragraph?: boolean | undefined; sx?: SxProps<Theme> | undefined; variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined; variantMapping?: Partial<Record<"button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline", string>> | undefined; } & CommonProps & Omit<any, "children" | keyof CommonProps | ("p" | "color" | "left" | "right" | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft" | "borderColor" | "borderRadius" | "display" | "displayPrint" | "overflow" | "textOverflow" | "visibility" | "whiteSpace" | "flexBasis" | "flexDirection" | "flexWrap" | "justifyContent" | "alignItems" | "alignContent" | "order" | "flex" | "flexGrow" | "flexShrink" | "alignSelf" | "justifyItems" | "justifySelf" | "gap" | "columnGap" | "rowGap" | "gridColumn" | "gridRow" | "gridAutoFlow" | "gridAutoColumns" | "gridAutoRows" | "gridTemplateColumns" | "gridTemplateRows" | "gridTemplateAreas" | "gridArea" | "bgcolor" | "zIndex" | "position" | "top" | "bottom" | "boxShadow" | "width" | "maxWidth" | "minWidth" | "height" | "maxHeight" | "minHeight" | "boxSizing" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "marginX" | "marginY" | "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "paddingX" | "paddingY" | "typography" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textTransform") | "align" | "gutterBottom" | "noWrap" | "paragraph" | "sx" | "variant" | "variantMapping">) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <div className={styles.logo}>
        <a href="../"><img  src={logo} alt="Logo" /></a>
      </div>
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
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField className={styles.box}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField className={styles.box}
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={styles.box}
                    required
                    fullWidth
                    id="email"
                    label="Mail"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField className={styles.box}
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Quiero recibir novedades en mi casilla de correo."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrate
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Ya tenés una cuenta? Conectate
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Ya tenés una cuenta? Conectate
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} component={'symbol'} />
        </Container>
      </ThemeProvider>
    </>
    
  );
}