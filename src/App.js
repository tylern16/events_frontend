import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'


import CalendarHeader from './components/calendarHeader/CalendarHeader'
import Day from './components/Day/Day'
import AddEventModal from './components/AddEventModel/AddEventModal'
import DeleteEventModal from './DeleteEventModal/DeleteEventModal'


const App = () => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const [events, setEvents] = useState([])
  //for displaying current/last/next month
  const [nav, setNav] = useState(0)
  const [clicked, setClicked] = useState()
  const [days, setDays] = useState([])
  //displays current month and year
  const [dateDisplay, setDateDisplay] = useState('')


  //helper funtion
  const eventForDate = date => events.find(e => e.date === date)

  //function to get events from server, NOT CALLED
  const getEvents = () => {
    axios.get('https://thawing-lowlands-32028.herokuapp.com/events')
    .then((response)=>{
      setEvents(response.data)
    })
  }

  //run getevents on page load
  useEffect(()=>{
    axios.get('https://thawing-lowlands-32028.herokuapp.com/events')
    .then((response)=>{
      setEvents(response.data)
    })
  }, [])

  //load
  //runs on mount, and when events or nav changes
  useEffect(()=>{
    const dt = new Date()

    if (nav !== 0){
      dt.setMonth(new Date().getMonth() + nav)
    }

    const day = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0])


    const daysArr = []
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`

      if (i > paddingDays) {
        daysArr.push(
          {
            value: i-paddingDays,
            event: eventForDate(dayString),
            isCurrentDay: i - paddingDays === day && nav === 0,
            date: dayString
          }
        )
      } else {
        daysArr.push(
          {
            value: 'padding',
            event: null,
            isCurrentDay: false,
            date: ''
          }
        )
      }
    }

    setDays(daysArr)
    console.log(daysArr);
  },[events, nav])

  const onSave = (newTitle) => {
    axios.post('https://thawing-lowlands-32028.herokuapp.com/events', {title: newTitle, date: clicked, eventImage: '', city: ''})
    .then((response)=>{
      setEvents([...events, {title: newTitle, date: clicked, eventImage: '', city: ''}])
    })
    setClicked(null)
  }

  const onDelete = () => {
    setEvents(events.filter(e => e.date !== clicked))
    setClicked(null)
  }



  return (
    <>

      <div id="container">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={()=> setNav(nav + 1)}
          onBack={()=> setNav(nav - 1)}
        />
      
        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((day, index)=>[
            <Day 
              key={index} 
              day={day} 
              onClick={()=> {
                if (day.value !== 'padding'){
                  setClicked(day.date)
                  //console.log(day.date);
                }
              }}
            />
          ])}
        </div>
      </div>
      
      {clicked && !eventForDate(clicked) ?
        <AddEventModal onSave={onSave} onClose={()=> setClicked(null)}/>
          :
        null
      }

      {clicked && eventForDate(clicked) ?
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={()=> setClicked(null)}
          onDelete={onDelete}        
        />
          :
        null
      } 

    </>
  )
}

export default App;
