import { createBrowserRouter } from 'react-router';

import { Dashboard } from './pages/Dashboard';
import { RootLayout } from './ui/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
]);
