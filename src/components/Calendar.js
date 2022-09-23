import {useState, useEffect} from 'react'
import axios from 'axios'
import '/Users/tylernenninger/Desktop/Projects/Java/EventMgmtProject/events_frontend/src/App.css'

import CalendarHeader from './calendarHeader/CalendarHeader'
import Day from './Day/Day'
import AddEventModal from './AddEventModel/AddEventModal'
import DeleteEventModal from './DeleteEventModal/DeleteEventModal'

const Calendar = () => {
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

    //if nav is clicked on, will udpate displayed month
    if (nav !== 0){
        dt.setMonth(new Date().getMonth() + nav)
    }

    //today's date
    const day = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    //will help get padding days
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    //set padding days to whichever day of week is first day of the month- so thursday ws first day in sept, at the 4th index so 4 padding days
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

    //sets date display
    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`)

    //initialize day array
    const daysArr = []
    //for loop to create day objects
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        //daystring for every day
        const dayString = `${month + 1}/${i - paddingDays}/${year}`

        //for all days days that arent padding
            //push into days array
                //value- day is day number
                //event checks to see is there is event
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
    //console.log(daysArr);
    },[events, nav])

    const onSave = (newTitle) => {
        axios.post('https://thawing-lowlands-32028.herokuapp.com/events', {title: newTitle, date: clicked, eventImage: '', city: ''})
        .then((response)=>{
            setEvents([...events, {title: newTitle, date: clicked, eventImage: '', city: ''}])
        })
        setClicked(null)
    }


    //TODO: delete from axios
    const onDelete = () => {
        let deletedEvent = events.find(e => e.date === clicked)

        axios.delete('https://thawing-lowlands-32028.herokuapp.com/events/' + deletedEvent.id ).then((response) => {
            setEvents(events.filter(e => e.date !== clicked))
        }) 
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

export default Calendar