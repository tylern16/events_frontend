import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import {Route, Routes, Link} from 'react-router-dom'

import Calendar from './components/Calendar'
import Header from './components/Header'
import EventList from './components/EventList'
import Nav from './components/Nav'
import Footer from './components/Footer'


const App = () => {
  
  return (
    <>
      <Header />

      <Nav />

      <Routes>
        <Route path='/' element={<Calendar/>}/>
        <Route path='/events' element={<EventList />} />
        <Route path='/add' element={<Calendar />} />
      </Routes> 

      <Footer />
    </>
  )
}

export default App;
