import {useState, useEffect} from 'react'

const Add = (props) => {
    let emptyEvent = {title: '', date: '', eventImage: '', city: ''}
    const [event, setEvent] = useState(emptyEvent)

    const handleChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleCreate(event)
    }


    return (
        <div>
            This is Add
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" onChange={handleChange}/>
                <br />
                <br />
                <label htmlFor="age">Date: </label>
                <input type="date" name="date" onChange={handleChange}/>
                <br />
                <br />
                <label htmlFor="eventImage">Image: </label>
                <input type="text" name="eventImage" onChange={handleChange}/>
                <br />
                <br />
                <label htmlFor="city">City: </label>
                <input type="text" name="city" onChange={handleChange}/>
                <br />
                <br />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Add