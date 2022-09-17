import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Avatar, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from "axios";
import { UserResponse } from '../../models/UserResponse';


export default function ButtonAppBar() {
  const userMock: UserResponse = {
    "name": "Sergio Garroni",
    "type": "student",
    "id": "1111",
    "picture": "../../mockData/mockImages/user-dummy.svg"
}

const LoginButtons = () => { 
  return (
          <><Link color="inherit" href='/login'>
      <Button color="inherit">Conectate</Button>
    </Link><Link color="inherit" href='/register'>
        <Button color="inherit">Registrate</Button>
      </Link></>

          );
          }

  const AlumnoButtons = () => { 
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Inicio
      </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Clases
        </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Profesores
        </Typography>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mis Clases
        </Typography></>
            );
            }

  const ProfesorButtons = () => { 
    return (
      <><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Inicio
      </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Publicar Clase
        </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mis Clases
        </Typography></>
    );
            }

    const GuestButtons = () => { 
      return (
        <><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inicio
        </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clases
          </Typography><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profesores
          </Typography></>
      );
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>

          {!user && GuestButtons()} 
          {user?.type == 'student' && AlumnoButtons()} 
          {user?.type == 'professor' && ProfesorButtons()} 

          {user &&<Avatar alt={user?.name} src={user?.picture}>
          </Avatar>}

          {!user && LoginButtons()} 
        </Toolbar>
      </AppBar>
    </Box>
  );
}

