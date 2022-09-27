
const CalendarHeader = (props) => {
    return (
        <div id='header'>
          <div id='monthDisplay'>{props.dateDisplay}</div>
          <div>
            <button onClick={props.onBack} id='backButton'>Back</button>
            <button onClick={props.onNext} id='nextButton'>Next</button>
          </div>
        </div>
    )
}

export default CalendarHeader