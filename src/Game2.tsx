import {useEffect, useState} from "react";
import "./App.css";


export default function Game2() {

    const [explaination, setExplanation] = useState(true);
    const [score, setScore] = useState(0);
    const [wrongClicks, setWrongClicks] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [resets, setResets] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const colors = [
        { name: "red", hex: "#FB2C37" },
        { name: "orange", hex: "#FF6900" },
        { name: "yellow", hex: "#F0B200" },
        { name: "green", hex: "#00C951" },
        { name: "blue", hex: "#00A6F5" },
        { name: "purple", hex: "#8E51FF" },
        { name: "pink", hex: "#F7339A" },
        { name: "black", hex: "#060606" },
        { name: "gray", hex: "#A9A9A9" },
    ];


    const shuffleCells = () => {
        const shuffled = [...colors].sort(() => Math.random() - 0.5);
        return Array.from({ length: 9 }, (_, i) => ({
            id: i + 1,
            color: shuffled[i]
        }));
    };

    const [cells, setCells] = useState(shuffleCells);
    const [chosenColor, setChosenColor] = useState("");

    useEffect(() => {
        setChosenColor(cells[Math.floor(Math.random() * cells.length)].color.name);
    }, []);

    useEffect(() => {
        if (!gameOver && !explaination) {
            const interval = setInterval(() => {
                setSeconds(prev => prev + 0.1);
            }, 100);

            return () => clearInterval(interval);
        }
    }, [gameOver, explaination]);

    const handleCellClick = (colorName: string) => {
        if (colorName === chosenColor) {
            setScore(prevScore => prevScore + 1);
            console.log(seconds);
        }
        else {setWrongClicks(wrongClicks +1 );}
        const newCells = shuffleCells();
        setCells(newCells);
        setChosenColor(newCells[Math.floor(Math.random() * newCells.length)].color.name);
        setResets(resets +1);
        if (resets >= 9) {setGameOver(true);}

    };

    if(explaination)

        return (
            <div className="explanation-container">
                <h2>Welcome bij Color Clicker!</h2>
                <p>Het doel van dit spel is om de kleur rechts boven in te leze en deze zo snel mogelijk aan te klikken</p>
                <p>Voor elke juiste klik krijg je een punt, voor elke verkeerde klik telt het als een fout.</p>
                <button onClick={() => setExplanation(false)}>spel spelen</button>
                </div>
                );

    if (gameOver) {
    return (
            <div className="result-container">
                <h2>Game Over!</h2>
                <p>Your Score: {score}</p>
                <p>Wrong Clicks: {wrongClicks}</p>
                <p>Total Time: {seconds.toFixed(1)} seconds</p>
                <button onClick={() => window.location.reload()}>Play Again</button>
            </div>);}

    return (
        <div className="app-container">
            <header>
                <h1>{chosenColor}</h1>
                <p>wrong clicks: {wrongClicks} </p>
                <p>score: {score}</p>
                <p>Time: {seconds.toFixed(1)}s</p>
            </header>
            <div className="full-grid" role="grid">
                {cells.map((n) => (
                    <div
                        key={n.id}
                        className="cell"
                        role="gridcell"
                        style={{ backgroundColor: n.color.hex }}
                        onClick={() => handleCellClick(n.color.name)}
                    >
                        {n.id}
                    </div>
                ))}
            </div>
        </div>
    );
}

