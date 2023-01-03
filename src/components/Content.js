import '../styles/content.css';
import getProfilePicUrl from './functions/profilePicture';
import SaveMessage from './functions/saveMessage';


const Content = (props) => {

    const handleEvent = (event) => {
        event.preventDefault()
        console.log(event.target[0].value);
        SaveMessage(event.target[0].value);
        event.target[0].value = '';
    }

    const handleMessage = () => {
        if (props.loggedIn) {
            return (
                <div className='content-message'>
                    <h2>Home</h2>
                    <div className='content-message-container'>
                        <div className='content-profile-picture'>
                            <img src={getProfilePicUrl()} alt='profile'></img>
                        </div>
                        <form onSubmit={handleEvent}>
                        <input type='text' className='content-message-input' placeholder="What's happening?"></input>
                        <input type='submit'></input>
                        </form>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="content">
            {handleMessage()}
        </div>
    )
}

export default Content;