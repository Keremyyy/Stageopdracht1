import { useEffect, useState } from "react";

export default function Game1() {
    const maxLevel = 3
    const [wrongAwnser, setWrongAwnser] = useState(0)
    const [explaination, setExplanation] = useState(true)
    const [level, setLevel] = useState(1);
    const [tier, setTier] = useState(0);
    const [nextLevel, setNextLevel] = useState(false);
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
    ];

    const shuffleCells = () => {
        const shuffled = [...colors].sort(() => Math.random() - 0.5);
        return Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            color: shuffled[i]
        }));
    };

    const [cells] = useState(shuffleCells);
    const [colorChanger, setColorChanger] = useState(() =>
        Array.from({ length: 3 }, () => colors[Math.floor(Math.random() * colors.length)])
    );
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        setActiveColorIndex(0);
        setIsFinished(false);

        if (!gameOver && !explaination) {
            const interval = setInterval(() => {
                setActiveColorIndex((prevIndex) => {
                    if (prevIndex >= level - 1) {
                        clearInterval(interval);
                        setIsFinished(true);
                        return prevIndex;
                    }

                    return prevIndex + 1;
                });
            }, 500);


            return () => clearInterval(interval);
        }
    }, [level, gameOver, explaination]);


    if(explaination){

        return (
            <div className="explanation-container">
                <h2>Welcome bij Color Folower!</h2>
                <p>Het doel van dit spel is om de gekleurde blokjes aan te klikken</p>
                <p>In de volgorde die op het grote vierkant word aangegeven</p>
                <button onClick={() => setExplanation(false)}>spel spelen</button>
            </div>
        );}

    if (gameOver) {
        return (
            <div className="result-container">
                <h2>Game Over!</h2>
                <p>Wrong Clicks: {wrongAwnser}</p>
                <button onClick={() => window.location.reload()}>Play Again</button>
            </div>);}

    return (
        <div className="game-container">
            <h1>Game 1</h1>
            <div
                className="main-square"
                style={{
                    backgroundColor: isFinished ? "#FFFFFF" : colorChanger[activeColorIndex].hex
                }}
            >
            </div>
            {level >= maxLevel && tier >= maxLevel ? (
                <button onClick={() =>

                    setGameOver(true)}>finish</button>
            ) : nextLevel ? (
                <button
                    onClick={() => {
                        setLevel((l) => l + 1);
                        setTier(0);
                        setNextLevel(false);
                        setIsFinished(false);
                        setActiveColorIndex(0);
                        setColorChanger(
                            Array.from({ length: maxLevel }, () => colors[Math.floor(Math.random() * colors.length)])
                        );
                    }}
                >
                    Next Level
                </button>
            ) : null}
            <div className="squares-container">
                {cells.map((cell) => (
                    <div
                        key={cell.id}
                        className="square"
                        style={{ backgroundColor: colors[cell.id - 1].hex }}
                        onClick={() => {
                            if (colors[cell.id - 1].hex === colorChanger[tier].hex) {
                                setTier(tier + 1);
                                if (tier + 1 >= level) {
                                    setNextLevel(true);
                                }
                            } else {
                                setWrongAwnser(wrongAwnser + 1);
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
}