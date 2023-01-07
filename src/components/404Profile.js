import arrow from '../assets/icons8-left-arrow-32.png';
import { Link } from 'react-router-dom';
import "../styles/profile.css"

const DoesNotExist = (props) => {
    return (
        <div className="profile-container">
    <div className="profile-topbar">
    <Link to='/'>
        <img src={arrow} alt="arrow"></img>
    </Link>
        <div className="profile-topbar-container">
            <p>Profile</p>
        </div>
    </div>
    <div className="profile-background-img">
    <div className="profile-background-no-img"></div>
    </div>
    <div className="profile-info">
        <div className="profile-info-top-svg">
        <svg>
    <circle cx="50" cy="50" r="40" stroke="wheat" strokeWidth="3" fill="grey" />
    </svg> 
        </div>
        <p>@{props.at}</p>
        <div className="profile-doesnt-exist">
            <h1>This account doesn’t exist</h1>
            <p>Try searching for another.</p>
        </div>
    </div>
</div>
)
}

export default DoesNotExist