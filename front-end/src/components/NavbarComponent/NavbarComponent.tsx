import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from "axios";
import { UserResponse } from '../../models/UserResponse';
import styles from './NavbarComponent.module.scss';
import logo from '../Img/logo.png';

export default function ButtonAppBar() {
  const userMock: UserResponse = {
    "name": "Sergio Garroni",
    "type": "student",
    "id": "1111",
    "picture": "../../mockData/mockImages/user-dummy.svg"
}

  const [user, setData] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        setData(userMock);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData(userMock);
      } finally {
        setLoading(false);
      }
    }
    getUserData()
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar className={styles.barra}>
          <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0.1 }}>
            <img src={logo} alt="Logo" className={styles.logo}/>
          </Typography>
          
          <Typography variant="h6" component="div"  sx={{ flexGrow: 0.1 }}>
            <a className={styles.title} href="/">Inicio</a>
          </Typography>
          <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0.1 }}>
          <a className={styles.title} href="/clases">Clases</a>
          </Typography>
          <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 1 }}>
          <a className={styles.title} href="/profesores">Profesores </a>
          </Typography>

          <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0 }}>
          <a className={styles.login} href="/login">Ingresa </a>
          </Typography>

          <Typography variant="h6" component="div" className={styles.title} sx={{ flexGrow: 0 }}>
          <a className={styles.login} href="/register">Registrate </a>
          </Typography>
          
          
          <Avatar alt={user?.name} src={user?.picture}>
          </Avatar>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}