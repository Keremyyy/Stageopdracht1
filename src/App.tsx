import { useState } from "react";
import Game2 from "./Game2";
import "./App.css";
import logo from "./assets/logo.png";
import Game1 from "./Game1";

export default function App() {
    const [gameStarted, setGameStarted] = useState(0);

    if (gameStarted === 0) {
        return (
            <div className="home-container">
                <div className="logo-container">
                    <img src={logo} alt="Color Clicker Logo"/>
                </div>
                <div className="content-container">
                    <h1>Color Clicker</h1>
                    <button className="start-button" onClick={() => setGameStarted(1)}>
                        Start Game
                    </button>
                </div>
                <div className="content-container">
                    <h1>Color Follower</h1>
                    <button className="start-button" onClick={() => setGameStarted(2)}>
                        Start Game
                    </button>
                </div>
            </div>
        );
    }

    if (gameStarted === 1) {
        return <Game2/>;
    }
    if (gameStarted === 2) {
    return <Game1/>;
    }
}