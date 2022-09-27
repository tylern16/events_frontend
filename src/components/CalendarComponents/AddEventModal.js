import {useState} from 'react'

const AddEventModal = (props) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState(false)

    return (
        <>
            <div id="newEventModal">
                <h2>New Event</h2>

                <input 
                    className={error ? 'error' : ''}
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    id="eventTitleInput" 
                    placeholder="Event Title" 
                />

                <button 
                    id="saveButton"
                    onClick={()=>{
                        if(title){
                            setError(false)
                            props.onSave(title)
                        } else {
                            setError (true)
                        }
                    }

                    }
                    >Save
                </button>
                <button 
                    onClick={props.onClose}
                    id="cancelButton">Cancel
                </button>
            </div>

            <div id="modalBackDrop"></div>
        </>
        
    )
}

export default AddEventModal