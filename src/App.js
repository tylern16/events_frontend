import {useState, useEffect} from 'react'
import axios from 'axios'

import Events from './components/Events'
import Add from './components/Add'

const App = () => {
  let [events, setEvents] = useState([])

  const getEvents = () => {
      axios.get('https://thawing-lowlands-32028.herokuapp.com/events')
      .then((response) => {
          setEvents(response.data)
      })
  }

  useEffect(()=>{
      getEvents()
  }, [])

  const handleCreate = (newEvent) => {
    axios.post('https://thawing-lowlands-32028.herokuapp.com/events', newEvent)
    .then((response)=> {
      setEvents([...events, newEvent])
    })
  }

  const handleDelete = (e, id) => {
    // console.log(removedEvent, id);
    axios.delete('https://thawing-lowlands-32028.herokuapp.com/events/' + id)
    .then((response)=>{
      setEvents(
        events.filter(event => event.id !== id)
      )
    })
  }

  return (
    <div>
      This is App
      <Events events={events} handleDelete={handleDelete} />
      <Add handleCreate={handleCreate}/>
    </div>
  )
}

export default App;
