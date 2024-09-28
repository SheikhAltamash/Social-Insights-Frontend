import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./components/form components/form.css"
import { Home } from './components/home'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FacebookForm } from './components/form components/facebookForm'
import { Xform } from './components/form components/Xform'
import { InstaForm } from './components/form components/instaForm'
import { FbData } from './components/Data showing/fbData'
import { Whatsapp } from './components/form components/WhatsappForm.jsx'
import {FBIndv} from "./components/Data showing/FBindv.jsx"
function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home home={true}></Home>,
  },
  {
    path: "/Facebookform",
    element: <FacebookForm></FacebookForm>,
  },
  {
    path: "/Xform",
    element: <Xform></Xform>,
  },
  {
    path: "/InstaForm",
    element: <InstaForm></InstaForm>,
  },
  {
    path: "/fbData",
    element: <FbData></FbData>,
  },
  {
    path: "/whatsappForm",
    element:<Whatsapp></Whatsapp> ,
  },
  {
    path: "/fbUsers",
    element:<FBIndv></FBIndv>
    
  }
]);

  return (
    <>
      <div>
        <RouterProvider router={router}></RouterProvider>

      </div>
    </>
  );
}

export default App
