import { useState } from "react";
import Game2 from "./Game2";
import "./App.css";

export default function App() {
    const [gameStarted, setGameStarted] = useState(0);


    if (gameStarted === 0) {
        return (
            <div className="app">
                <h1>Color Clicker</h1>
                <button className="start-button" onClick={() => setGameStarted(1)}>Start Game</button>
            </div>
        );
    }
    if (gameStarted === 1) {
        return <Game2/>;
    }
}