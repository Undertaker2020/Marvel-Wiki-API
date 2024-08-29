import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from "../../services/MarvelService.js";
import { Skeleton, ErrorMessage, Spinner } from "@components"

// CharInfo component handles the display of detailed information about a selected character
class CharInfo extends Component {

    // Initial state of the component
    state = {
        char: null, // Character information
        loading: false, // Loading state
        error: false // Error state
    }

    // Instance of MarvelService to fetch character data
    marvelService = new MarvelService();

    // Lifecycle method called when the component is mounted
    componentDidMount() {
        this.updateChar();
    }

    // Lifecycle method called before the component is updated
    // It checks if the charId prop has changed and updates the character data if necessary
    componentDidUpdate(prevProps){
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    // Function to request character data from the Marvel API
    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    // Function to update the state with the new character information
    // char: object - Object containing character information
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    // Function to set the loading state to true
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    // Function to handle errors during API requests
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

// Functional component to display character information
// char: object - Object containing character information
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    // Adjust the image style if the thumbnail is not available
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {!description ? 'Description not founded' : description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>

    )
}

// PropTypes to ensure charId prop is a number and is required
CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;