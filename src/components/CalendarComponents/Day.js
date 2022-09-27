

const Day = (props) => {
    const className = `day ${props.day.value === 'padding' ? 'padding' : ''} ${props.day.isCurrentDay ? 'currentDay' : ''}`;
    return (
        <div onClick={props.onClick} className={className}>
            {props.day.value === 'padding' ? '' : props.day.value}

            {props.day.event ? 
                <div className="event">{props.day.event.title}</div> :  
                ''
            }
        </div>
    )
}

export default Day