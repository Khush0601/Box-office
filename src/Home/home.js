import React, { useState } from 'react'
import './home.css'
import HomeSearch from './HomeSearch/homeSearch'
import Starred from '../Starred/Starred'

const Home = () => {
  const buttonList=[
{
  name:'Home'
},
{
  name:'Starred'
}
  ]
  const [activeButton,setActiveButton]=useState(buttonList[0].name)
  const onButtonpdate=(name)=>{
    setActiveButton(name)
  }
  return (
    <div className='app-container'>
        <div className='app-heading'>BOX-OFFICE</div>
        <div className='heading-bottom'>Are  you looking for a movie or an actor</div>
        <div className='home-content'>
        {
          buttonList.map((el,i)=>{
            return <div key={`${el.name}-${i}`} className={el.name===activeButton?'buttonactive':'buttondeactive'}  onClick={()=>{onButtonpdate(el.name)}}>{el.name}</div>
          })
        }
      
        </div>
        {
        activeButton===buttonList[0].name && <HomeSearch/>
       }
       {
        activeButton===buttonList[1].name && <Starred/>
       }
    </div>
  )
}

export default Home