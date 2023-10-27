import React, { useState } from 'react'
import {ThemeProvider} from 'styled-components'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home/home'
import ShowDetails from './ShowDetails/ShowDetails'
import './App.css'
import { AppContainer } from './App.styled'
const App = () => {
  const[themeType,setThemeType]=useState('light')
  const onThemeChanged=(e)=>{
 
  if(e.target.checked){
    setThemeType('dark')
  }
  else{
    setThemeType('light')
  }
  }
const appTheme={
  light:{
  appColor:'black',
  appBackgroundColor:'white',
  },
  dark:{
    appColor:'white',
    appBackgroundColor:'black',
  }
}


  console.log(themeType)
  return (

  <ThemeProvider theme={appTheme[themeType]}>
  <div className='switch-container'>
  <label htmlFor='switch' class="switch">
  <input id='switch' type="checkbox" onChange={(e)=>onThemeChanged(e)}/>
  <span class="slider round"></span>
</label>
    
  </div>
  
  <AppContainer>
  <BrowserRouter>
    <Routes>
      <Route  index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/search/:searchType/:searchInput' element={<Home/>}/>
      <Route path='/show/:id' element={<ShowDetails/>}/>
      <Route path='*' element={<h1>Page Not Found</h1>}/>
    </Routes>
    
    
    </BrowserRouter>
  </AppContainer>
    </ThemeProvider>
  )
    
  
}

export default App