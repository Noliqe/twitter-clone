import '../styles/message.css'

const Message = (props) => {
    let time = props.timestamp.seconds;
    let date = new Date(time * 1000).toLocaleDateString("en-US");
    return (
        <div className="msg-container">
            <div className="msg-picUrl">
                <img src={props.picUrl} alt='profile'></img>
            </div>
            <div className="msg-subcontainer" id={props.id} timestamp={props.timestamp}>
                <div className='msg-subcontainer-top'>
                    <div className="msg-userName">{props.name}</div>
                    <div className='msg-@'>@{props.name}</div>
                    <div className='msg-date'>{date}</div>
                </div>
                <div className="msg-text">{props.text}</div>
            </div>
        </div>
    )
}

export default Message;