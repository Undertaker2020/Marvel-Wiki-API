import Header from "./Components/Header.jsx";

import RandomChar from "./Components/RandomChar.jsx";

import './style.min.css'

import {Component} from "react";
import CharContent from "./Components/CharContent.jsx";

class App extends Component {
    state =  {
        showRandomChar: true,
        selectedChar: null,
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <main>
                    {this.state.showRandomChar ? <RandomChar/> : null}
                    <button onClick={this.toggleRandomChar}>Click me</button>
                    <CharContent/>

                    <img className="bg-decoration" src="../src/Image/vision.png" alt="vision"/>
                </main>
            </div>

        );
    }
}

export default App
