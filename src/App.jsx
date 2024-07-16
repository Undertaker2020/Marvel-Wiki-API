import Header from "./Components/Header.jsx";

import RandomChar from "./Components/RandomChar.jsx";

import './style.min.css'
import CharContent from "./Components/CharContent.jsx";

function App() {
    return (
        <div className="app">
            <Header/>
            <main>
                <RandomChar/>
                <CharContent/>
                <img className="bg-decoration" src="../src/Image/vision.png" alt="vision"/>
            </main>
        </div>

    );
}

export default App
