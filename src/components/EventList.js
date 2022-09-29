import '../App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
// import _, {sortBy} from 'underscore'

import ListHeader from './EventsListComponents/ListHeader'
import DeleteListEventModal from './EventsListComponents/DeleteListEventModal'

const EventList = () => {
    let [events, setEvents] = useState([])
    let [dateOrder, setDateOrder] = useState('desc')
    let [eventOrder, setEventOrder] = useState('desc')
    let [clicked, setClicked] = useState()
    let [showModal, setShowModal] = useState(false)
    

    const sortByDate = () => {
        console.log('sort');
        events.sort((a,b)=>{
            return new Date(a.date).valueOf() - new Date(b.date).valueOf()
        })
    }

    const sortByDateReverse = () => {
        console.log('reverse');
        events.sort((a,b)=>{
            return new Date(b.date).valueOf() - new Date(a.date).valueOf()
        })
    }

    const getEventsSorted = () => {
        axios.get('https://thawing-lowlands-32028.herokuapp.com/events')
        .then((response)=>{
            setEvents(
                response.data.sort((a,b)=>{
                    return new Date(a.date).valueOf() - new Date(b.date).valueOf()
                })
            )
        })
    }

    const onDelete = (deletedEventId) =>{
        console.log(deletedEventId);
        axios.delete('https://thawing-lowlands-32028.herokuapp.com/events/' + deletedEventId)
        .then((response)=>{
            getEventsSorted()
        })
        setShowModal(false)
    }

    useEffect(()=>{
        getEventsSorted()
        document.getElementById('navbar').style.display = 'none'
    }, [])

    const onSortByDate = () => {
        if (dateOrder === 'desc') {
            console.log('DESC');
            sortByDateReverse()
            //getEventsSorted()
            setDateOrder('asc')
         } else {
            console.log('asc');
            sortByDate()
            //getEventsSorted()
            setDateOrder('desc')
         } 

    }

    const onSortByTitle = () => {
        if (eventOrder === 'desc') {
            console.log('desc');
            events.sort((a,b)=>{
                if (a.title > b.title) {
                    return 1
                } else if (b.title > a.title) {
                    return -1
                } else {
                    return 0
                }
            })
            setEventOrder('asc')
        } else {
            console.log('asc');
            events.sort((a,b)=>{
                if (a.title < b.title) {
                    return 1
                } else if (b.title < a.title) {
                    return -1
                } else {
                    return 0
                }
            })
            setEventOrder('desc')
        }
    }

    const onShowModal = (deletedEventId) => {
        setShowModal(true)
        setClicked(deletedEventId)       
    }

    const onCloseModal = () =>{
        setShowModal(false)
        setClicked(null)
    }

    return (
        <>
            <div id='list-container'>
                <ListHeader />
                <table id='events-table'>
                    <thead>
                        <tr>
                            <td onClick={onSortByDate}>Date &nbsp;
                                {dateOrder === 'desc' ?
                                <i className="fa-solid fa-caret-down"></i> 
                                    :
                                <i className="fa-solid fa-caret-up"></i>
                                }
                            </td>
                            <td onClick={onSortByTitle}>Event &nbsp;
                                {eventOrder === 'desc' ?
                                <i className="fa-solid fa-caret-down"></i> 
                                    :
                                <i className="fa-solid fa-caret-up"></i>
                                }
                            </td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event)=>{
                            return (
                                <tr key={event.id}>
                                    <td>{event.date}</td>
                                    <td>{event.title}</td>
                                    <td>
                                        <button 
                                            onClick={
                                                ()=>{onShowModal(event.id)}
                                            }>Delete
                                        
                                        
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
            {showModal ? 
            <DeleteListEventModal clicked={clicked} onDelete={onDelete} onCloseModal={onCloseModal}/>
                :
            null
            }
        </>
    )
}

export default EventList

// () => {onDelete(event)}
