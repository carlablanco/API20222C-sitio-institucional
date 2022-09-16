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

  const [user, setData] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        setData(sessionStorage.getItem('usuario') as any as UserResponse);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData(sessionStorage.getItem('usuario') as any as UserResponse);
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Avatar alt={user?.name} src={user?.picture}>
          </Avatar>
          <Link color="inherit" href='/login'>
            <Button color="inherit">Conectate</Button>
          </Link>
          <Link color="inherit" href='/register'>
            <Button color="inherit">Registrate</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}