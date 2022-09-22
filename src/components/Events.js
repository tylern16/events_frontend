import {useState, useEffect} from 'react'

const Events = (props) => {

    return (
        <div>
            This is Events
            {props.events.map((event)=>{
                return (
                    <div key={event.id}>
                        <div>                 
                            {event.title}
                            <button onClick={(e)=>{props.handleDelete(e, event.id)}}>Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Events