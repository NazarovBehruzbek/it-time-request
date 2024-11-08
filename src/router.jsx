import {  createBrowserRouter } from 'react-router-dom';
import App from './App';
import Kiberxavfsizlik from './components/CyberSecurity';
import Limsa from './components/App';
import Travel from './components/contact/Travel'
export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/cyber',
        element:<Kiberxavfsizlik/>
    },
    {
        path:"/limsa",
        element:<Limsa/>
    },
    {
        path:"/travel",
        element:<Travel/>
    }
])