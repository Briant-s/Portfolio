import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

// Mantine styles. Keep these before your own CSS.
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';

import App from './App.tsx';
import { theme } from './theme.ts';

// Vite injects BASE_URL from vite.config `base` (e.g. "/<repo>/" on GitHub
// Pages project sites, "/" on Vercel). Strip the trailing slash for the
// router basename.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorSchemeScript defaultColorScheme="dark" />
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="bottom-right" style={{ marginBottom: 24 }} />
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
