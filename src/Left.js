import React ,{useState} from 'react'
import profile from './images/boy.jpeg' 
import './styles/App.css'
import Right from './Right'
import { Link } from 'react-router-dom'


export default function Left() {
  const today = new Date()
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  function setColor (newColor){
    document.documentElement.style.setProperty('--blue', newColor);
}
  return (
    <div className='app'>
        <div className="left_container">
          <header>
      <span className="title">TODAY'S ADVENTURE</span>
      <span className='date'>{date}</span>
          </header>
      <div className="profile">
      <img src={profile} alt="taki" />
      </div>
      <input type="text" className="input" placeholder="Title here....." />
      <textarea  id="text-box" cols="30" placeholder="How is your day today?" rows="10"></textarea>
      <button className='btn' onClick={() => setColor('orange')}>store</button>
    </div>
    <Right />
    </div>
  )
}
