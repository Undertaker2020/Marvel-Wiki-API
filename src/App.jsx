import Header from "./Components/Header.jsx";
import RandomChar from "./Components/RandomChar.jsx";
import CharContent from "./Components/CharContent.jsx";
import CharInfo from "./Components/CharInfo.jsx";
import './style.min.css'
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import {useState} from "react";

// App component serves as the main component for the Marvel Wiki application
const App = () => {
    // State to keep track of the selected character's ID
    const [selectedChar, setSelectedChar] = useState(null);
    /*
    * Function to update the selected character's ID in the state.
    * id: number - ID of the selected character
    */
    const onCharSelected = (id) => {
        setSelectedChar(id)
    }


    return (
        <div className="app">
            <Header/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharContent onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src="../src/Image/vision.png" alt="vision"/>
            </main>
        </div>
    );
}

export default App
