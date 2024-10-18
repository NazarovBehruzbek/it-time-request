import {  createBrowserRouter } from 'react-router-dom';
import App from './App';
import Kiberxavfsizlik from './components/CyberSecurity';
export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/cyber',
        element:<Kiberxavfsizlik/>
    }
])