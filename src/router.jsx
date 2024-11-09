import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Kiberxavfsizlik from './components/CyberSecurity';
import Limsa from './components/app/index';
import NewTravel from './components/app/NewTravel';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/cyber',
    element: <Kiberxavfsizlik />,
  },
  {
    path: '/limsa',
    element: <Limsa />,
  },
  {
    path: '/travel',
    element: <NewTravel />,
  },
]);
