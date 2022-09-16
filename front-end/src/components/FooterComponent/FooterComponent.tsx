import React, { FC } from 'react';
import styles from './FooterComponent.module.scss';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


function Copyright() {
  return (
      <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://uade.edu.ar/">
              particularly
          </Link>{' '}
          {new Date().getFullYear()}
      </Typography>
  );
}

export default function Footer() {
  return (
      <footer>
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
              <Copyright />
          </Box>
      </footer>
  );
}