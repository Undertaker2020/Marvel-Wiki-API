import Header from "./Components/Header.jsx";
import {Component} from "react";
import RandomChar from "./Components/RandomChar.jsx";
import CharContent from "./Components/CharContent.jsx";
import CharInfo from "./Components/CharInfo.jsx";
import './style.min.css'

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
                    <div className="char__content">
                        <CharContent charId={this.state.selectedChar} />
                        {/*<CharContent onCharSelected={this.onCharSelected}/>*/}
                        <CharInfo charId={this.state.selectedChar}/>
                    </div>


                    <img className="bg-decoration" src="../src/Image/vision.png" alt="vision"/>
                </main>
            </div>

        );
    }
}

export default App
