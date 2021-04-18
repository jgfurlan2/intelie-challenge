import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '~/styles/global';
import { theme } from '~/styles/theme';

import { HomePage } from './pages/Home';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
      <GlobalStyle />
    </ThemeProvider>
  );
};
