import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import {Route, Routes, Link} from 'react-router-dom'

import Calendar from './components/Calendar'
import Header from './components/Header'
import EventList from './components/EventList'


const App = () => {
  
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Calendar/>}/>
        <Route path='/events' element={<EventList />} />

      </Routes> 
    </>
  )
}

export default App;
