import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import  Video from './pages/video/Video'
 

const App = () => {
 
  const[sidebar,setsidebar]=useState(true)

  return (<>
    <Navbar setsidebar={setsidebar}/>

    <Routes>
      <Route path='/' element={<Home sidebar={sidebar}/>}/>
      <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
    </Routes>
    
  </>)
}

export default App
