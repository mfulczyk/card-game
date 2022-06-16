import React from 'react';
import styled from '@emotion/styled';
import { Panel } from './_Components/Panel';
import { CookiesProvider } from 'react-cookie';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';

const Scene = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1b2430;
`;
function App() {
  return (
    <Scene>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Panel />
        </CookiesProvider>
      </ThemeProvider>
    </Scene>
  );
}

export default App;
