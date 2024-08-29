import {useEffect, useRef, useState} from "react";
import MarvelService from "../../services/MarvelService.js";
import { Spinner, ErrorMessage } from "@components";
import PropTypes from "prop-types";

// CharContent component handles the display of a list of Marvel characters
// It fetches the data from MarvelService and manages the loading and error states
const CharContent = (props) => {

    // Initial state of the component

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    // Instance of MarvelService to fetch character data
    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    // // Lifecycle method called when the component is mounted
    // componentDidMount() {
    //     if (this.state.offset < 219) {
    //         onRequest();
    //     }
    //     window.addEventListener("scroll", this.onScroll);
    // }
    //
    // // Lifecycle method called before the component is unmounted
    // componentWillUnmount() {
    //     window.removeEventListener("scroll", this.onScroll);
    // }

    // Function to request character data from the Marvel API
    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    // Set the new item loading state to true
    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    // Function to handle the scroll event for infinite scrolling
    const onScroll = () => {
        if (offset < 219 || newItemLoading) return;
        if (charEnded)
            window.removeEventListener("scroll", onScroll);

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            onCharListLoading();
            onRequest(offset);
        }
    };

    // Function to update the state with the new character list
    // newCharList: array - Array of new character objects
    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(  false);
        setNewItemLoading(  false);
        setOffset( offset => offset + 9);
        setCharEnded( ended)
    }

    // Function to handle errors during API requests
    const onError = () => {
        setError(true);
        setLoading(  false);
        setNewItemLoading(  false);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Function to render the list of character items
    // arr: array - Array of character objects
    function renderItems(arr){
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <li className="char__item"
                    key={item.id}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    onKeyDown={(e)=>{
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id)
                            focusOnItem(i)
                        }
                    }}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i)
                        }
                    }>
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

    const items = renderItems(charList);

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
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );

}

// PropTypes to ensure onCharSelected prop is a function and is required
CharContent.propTypes ={
    onCharSelected: PropTypes.func.isRequired,
}

export default CharContent;