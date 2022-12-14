import styles from './ResetPasswordComponent.module.scss';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, SxProps, Theme, ThemeProvider } from '@mui/material/styles';
import logo from '../../img/logo.png';
import { resetPassword } from '../../services/register';

interface ResetPasswordComponentProps { }

const theme = createTheme();

export default function ResetPassword() {

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email')
    };
    await resetPassword(payload);
    setEmailSent(true);
  };

  const [emailSent, setEmailSent] = React.useState(false)

    return (
      <>
        <div className={styles.logo}>
          <a href="../"><img src={logo} alt="Logo" /></a>
        </div>

        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {!emailSent && <Box
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
                Ingresá tu mail para recuperar tu contraseña.
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField className={styles.box}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enviar correo
                </Button>
              </Box>
            </Box>}

            {
              emailSent && 
              <p>Se envio un correo a la cuenta especificada, revise su bandeja para reestablecer su contraseña</p>
            }

          </Container>
        </ThemeProvider>


      </>
    );
  }
