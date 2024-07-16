import {Component} from "react";
import Header from "./Components/Header.jsx";
import RandomChar from "./Components/RandomChar.jsx";
import CharContent from "./Components/CharContent.jsx";
import CharInfo from "./Components/CharInfo.jsx";
import './style.min.css'

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (<div className="app">
                <Header/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharContent onCharSelected={this.onCharSelected}/>
                        <CharInfo charId={this.state.selectedChar}/>
                    </div>
                    <img className="bg-decoration" src="../src/Image/vision.png" alt="vision"/>
                </main>
            </div>

        );
    }
}

export default App
