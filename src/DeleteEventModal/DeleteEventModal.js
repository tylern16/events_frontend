

const DeleteEventModal = (props) => {
    return (
        <>
            <div id="deleteEventModal">
                <h2>Event</h2>

                <p id="eventText">{props.eventText}</p>

                <button onClick={props.onDelete} id="deleteButton">Delete</button>
                <button onClick={props.onClose} id="closeButton">Close</button>
            </div>

            <div id="modalBackDrop"></div>
        </>
    )
}

export default DeleteEventModal