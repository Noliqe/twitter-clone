import {
    useParams
} from "react-router-dom";
import "../styles/profile.css"

const Profile = () => {
    // users At
    let { userId } = useParams();



    return (
        <div className="profile">
            <div className="profile-topbar">
                <img alt="arrow"></img>
                <div className="profile-topbar-container">
                    <p>{userId}</p>
                    <p>number of tweets</p>
                </div>
            </div>
            <div className="profile-background-img">
                <img alt="background"></img>
            </div>
            <div className="profile-info">
                <div className="profile-info-top">
                    <img alt="photo"></img>
                    <button>Edit profile</button>
                </div>
                <p>username</p>
                <p>userAt</p>
                <p>Joined date</p>
                <div className="profile-info-followers">
                    <p>1 Following</p>
                    <p>0 Followers</p>
                </div>
            </div>
            <div className="profile-links">
            <ul>
                <li>
                    <p>Tweets</p>
                </li>
                <li>
                    <p>Tweets & replies</p>
                </li>
                <li>
                    <p>Media</p>
                </li>
                <li>
                    <p>Likes</p>
                </li>
            </ul>
            </div>

        </div>
    );
}

export default Profile;