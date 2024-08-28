import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeProviderProps {
  isDarkMode: boolean;
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ isDarkMode, children }) => {
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;