// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { IonApp, setupIonicReact } from '@ionic/react';
import { initializeDatabase } from './services/database';

/* Ionic CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Tailwind */
import './index.css';

import App from './App';

setupIonicReact({
  mode: 'md',
  animated: true,
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

initializeDatabase()
  .then(() => {
    root.render(
      <React.StrictMode>
        <IonApp>
          <App />
        </IonApp>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error('[Main] Database initialization failed:', error);
    root.render(
      <React.StrictMode>
        <IonApp>
          <App />
        </IonApp>
      </React.StrictMode>
    );
  });
