import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    return (
        <footer>

            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://uade.edu.ar/">
                        Culture Tour
                    </Link>{' '}
                    {new Date().getFullYear()}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    <InstagramIcon />
                    <TwitterIcon />
                    <YouTubeIcon />
                </Typography>
            </Box>
        </footer>
    );
}