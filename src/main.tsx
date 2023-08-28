import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/icons';
import { MdsConfig } from '@maersk-global/mds-config';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';
import { getEnvironmentLabel } from '@maersk-global/shared-js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root')!;

MdsConfig.iconsDynamicImportPath =
  getEnvironmentLabel() === 'localhost' ? '../../' : './';

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
