import {Component} from "react";
import Header from "./Components/Header.jsx";
import RandomChar from "./Components/RandomChar.jsx";
import CharContent from "./Components/CharContent.jsx";
import CharInfo from "./Components/CharInfo.jsx";
import './style.min.css'
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

// App component serves as the main component for the Marvel Wiki application
class App extends Component {
    // State to keep track of the selected character's ID
    state = {

        selectedChar: null
    }
    /*
    * Function to update the selected character's ID in the state.
    * id: number - ID of the selected character
    */
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharContent onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src="../src/Image/vision.png" alt="vision"/>
                </main>
            </div>
        );
    }
}

export default App
