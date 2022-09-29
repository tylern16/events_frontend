import {useState} from 'react'

const DeleteEventModal = (props) => {
    let [newTitle, setNewTitle] = useState(props.eventText)

    const handleChange = (event) => {
        //console.log(event.target.value);
        setNewTitle(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //console.log('handlesubmit');
        props.onUpdate(newTitle)
    }

    return (
        <>
            <div id="deleteEventModal">
                <h2>Do you wish to Delete Event?</h2>

                <p id="eventText">{props.eventText}</p>

                <div id='edit-form'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="numtextber"
                            name="title"
                            placeholder={props.eventText}
                            onChange={handleChange}
                        />
                        <button type='submit'>Edit</button>
                    </form>
                </div>

                
                

                <button onClick={props.onDelete} id="deleteButton">Delete</button>
                <button onClick={props.onClose} id="closeButton">Close</button>
            </div>

            <div id="modalBackDrop"></div>
        </>
    )
}

export default DeleteEventModal