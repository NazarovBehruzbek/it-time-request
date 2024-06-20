import React from 'react'
import RequestPage from './components/requestPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <React.Fragment>
    <RequestPage/>
    <ToastContainer />
   </React.Fragment>
  )
}

export default App