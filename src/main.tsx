import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import siteData from '../data/site.json';

document.documentElement.style.setProperty('--accent', siteData.company.primaryColor);
document.documentElement.style.setProperty('--accent-hover', siteData.company.hoverColor);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
