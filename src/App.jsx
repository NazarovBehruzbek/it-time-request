import React from 'react'
import RequestPage from './components/requestPage'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
   <React.Fragment>
    <RequestPage/>
    <ToastContainer/>
   </React.Fragment>
  )
}

export default App