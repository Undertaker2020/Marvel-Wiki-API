import {Component} from "react";
import MarvelService from "../Services/MarvelService.js";
import ErrorMessage from "./ErrorMessage.jsx";
import Spinner from "./Spinner.jsx";
import PropTypes from "prop-types";

// CharContent component handles the display of a list of Marvel characters
// It fetches the data from MarvelService and manages the loading and error states
class CharContent extends Component {
    constructor(props) {
        super(props);

    }

    // Initial state of the component
    state = {
        charList: [], // List of characters
        loading: true, // Initial loading state
        error: false, // Error state
        newItemLoading: false, // State for new items loading
        offset: 210, // Offset for API requests
        charEnded: false // State to check if all characters are loaded
    }

    // Instance of MarvelService to fetch character data
    marvelService = new MarvelService();

    // Lifecycle method called when the component is mounted
    componentDidMount() {
        if (this.state.offset < 219) {
            this.onRequest();
        }
        window.addEventListener("scroll", this.onScroll);
    }

    // Lifecycle method called before the component is unmounted
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    // Function to request character data from the Marvel API
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    // Set the new item loading state to true
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    // Function to handle the scroll event for infinite scrolling
    onScroll = () => {
        if (this.state.offset < 219 || this.state.newItemLoading) return;
        if (this.state.charEnded)
            window.removeEventListener("scroll", this.onScroll);

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            this.onCharListLoading();
            this.onRequest(this.state.offset);
        }
    };

    // Function to update the state with the new character list
    // newCharList: array - Array of new character objects
    onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }
        this.setState(({charList, offset})=> ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }

    // Function to handle errors during API requests
    onError = () => {
        this.setState({
            error: true,
            loading: false,
            newItemLoading: false,
        })
    }

    // Function to render the list of character items
    // arr: array - Array of character objects
    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const {charList, loading, error, newItemLoading,offset, charEnded} = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

// PropTypes to ensure onCharSelected prop is a function and is required
CharContent.propTypes ={
    onCharSelected: PropTypes.func.isRequired,
}

export default CharContent;