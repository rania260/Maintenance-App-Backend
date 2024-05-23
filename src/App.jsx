
import './App.css'
import { RouterProvider } from 'react-router-dom';

import Routes from "./Routes"
function App() {
  
  //console.log("auth from app ", auth)
  return (
    <>    
      
         <RouterProvider router={Routes} />

        </>
  )
}

export default App
