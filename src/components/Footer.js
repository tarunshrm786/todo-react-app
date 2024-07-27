import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, backgroundColor: 'black'  }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="body1" color="inherit">
            © 2024 My App
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              alignItems: 'center',
              mt: isSmallScreen ? 1 : 0,
            }}
          >
            <Typography variant="body1" color="inherit" sx={{ mr: isSmallScreen ? 0 : 2 }}>
              Privacy Policy
            </Typography>
            <Typography variant="body1" color="inherit" sx={{ mr: isSmallScreen ? 0 : 2 }}>
              Terms of Service
            </Typography>
            <Typography variant="body1" color="inherit">
              Contact Us
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
