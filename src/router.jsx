import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Kiberxavfsizlik from './components/CyberSecurity';
import Limsa from './components/app/index';
import NewTravel from './components/app/NewTravel';
import School from './components/School';
import SMM from './components/SMM';
import Mobilograf from './components/Mobilografiya';
import NewFormRequest from './components/NewFormRequest';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cyber",
    element: <Kiberxavfsizlik />,
  },
  {
    path: "/smm",
    element: <SMM />,
  },
  {
    path: "/mobilografiya",
    element: <Mobilograf />,
  },
  {
    path: "/limsa",
    element: <Limsa />,
  },
  {
    path: "/travel",
    element: <NewTravel />,
  },
  {
    path: "/school",
    element: <School />,
  },
  {
    path: "/newForm",
    element: <NewFormRequest />,
  },
]);
