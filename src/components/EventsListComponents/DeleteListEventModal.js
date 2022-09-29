

const DeleteListEventModal = (props) => {
    return (
        <>
            <div id='deleteEventModal'>
                <h3>Are You Sure You Want To Delete?</h3>

                <div id='event-list-modal-button-container'>
                    <button id='deleteButton' onClick={() => {props.onDelete(props.clicked)}}>Yes</button>
                    <button id='closeButton' onClick={props.onCloseModal}>No</button>
                </div>
                


            </div>
            
            <div id="modalBackDrop"></div>

        </>
        
    )
}

export default DeleteListEventModal