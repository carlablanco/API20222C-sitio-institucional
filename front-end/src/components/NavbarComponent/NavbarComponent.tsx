import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Link } from '@mui/material';
import { UserResponse } from '../../models/UserResponse';
import styles from './NavbarComponent.module.scss';
import logo from '../../img/logo.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import KeyIcon from '@mui/icons-material/Key';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { isLoggedIn, getType, getName } from '../../hooks/authhook';

export default function ButtonAppBar() {
  // Obtiene el usuario del sessionStorage
  const user = JSON.parse(sessionStorage.getItem('loggedUser'));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const LoginButtons = () => {
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 0.01 }} align="right" >
        <a className={styles.login} href="/login">Ingresa </a>
      </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 0.01 }} align="right" >
          <a className={styles.login} href="/register">Registrate </a>
        </Typography></>
    );
  }

  const GuestButtons = () => {
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }} align="left">
        <a className={styles.title} href="/">Inicio</a>
      </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
          <a className={styles.title} href="/classes">Clases</a>
        </Typography>
      </>
    );
  }

  const AlumnoButtons = () => {
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }} align="left">
        <a className={styles.title} href="/">Inicio</a>
      </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }} align="left">
          <a className={styles.title} href="/classes">Clases</a>
        </Typography>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
          <a className={styles.title} href="/inscriptions">Mis Clases </a>
        </Typography></>
    );
  }


  const ProfesorButtons = () => {
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }} align="left">
        <a className={styles.title} href="/">Inicio</a>
      </Typography>
        <Typography variant="h6" component="div" className={styles.contenedor} sx={{ flexGrow: 0.1 }} align="left">
          <a className={styles.title} href="/publish-class">Publicar Clase</a>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
          <a className={styles.title} href="/assigned-classes">Mis Clases </a>
        </Typography></>
    );
  }


  return (

    <header>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar className={styles.barra}>
            <Typography variant="h6" component="div" className={styles.contenedor} sx={{ flexGrow: 0.1 }} align="center">
              <a href="/"> <img src={logo} alt="Logo" className={styles.logo} /></a>
            </Typography>
            {getType() == 'professor' && ProfesorButtons()}
            {getType() == 'student' && AlumnoButtons()}
            {!isLoggedIn() && GuestButtons()}
            {!isLoggedIn() && LoginButtons()}


            <Tooltip title="Cuenta">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {isLoggedIn() && <Avatar className={styles.avatar} alt={getName()} src={user?.picture} ></Avatar>}
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

              <Divider />
              <MenuItem component={Link} href={'/modify-account'}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Mis datos
              </MenuItem>
              <MenuItem component={Link} href={'/change-password'}>
                <ListItemIcon>
                  <KeyIcon fontSize="small" />
                </ListItemIcon>
                Cambiar contraseña
              </MenuItem>
              <MenuItem component={Link} href={'/logout'}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Salir
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>

    </header>

  );
}
//
