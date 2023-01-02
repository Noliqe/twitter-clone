import '../styles/searchbar.css';
import searchIcon from '../assets/icons8-search.svg';

const Searchbar = () => {
    return (
        <div className="searchbar">
            <div className='searchbar-container'>
                <img src={searchIcon} alt='search'></img>
                <form className="searchbar-form">
                <input type='text' className='searchbarInput' id='searchbarInput' placeholder='Search Gorillia'>
                </input>
            </form>
            </div>
        </div>
    )
}

export default Searchbar;