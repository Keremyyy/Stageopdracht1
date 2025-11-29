import {useEffect, useState} from "react";


export default function Game1() {
    const [level, setLevel] = useState(1);
    const [tier , setTier] = useState(0);

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



    const colorChanger = (() =>
        Array.from({ length: 3 }, () => colors[Math.floor(Math.random() * colors.length)])
    )();

    console.log(colorChanger[0])







    const [cells] = useState(shuffleCells);
    const [mainColor, ] = useState(() => colors[Math.floor(Math.random() * colors.length)]);

    const [activeColorIndex, setActiveColorIndex] = useState(0);

    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveColorIndex((prevIndex) => {
                if (prevIndex >= colorChanger.length - 1) {
                    clearInterval(interval);
                    setIsFinished(true);
                    return prevIndex;
                }
                return prevIndex + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);



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
            <div className="squares-container">
                {cells.map((cell) => (
                    <div
                        key={cell.id}
                        className="square"
                        style={{ backgroundColor: colors[cell.id - 1].hex }}
                        onClick={() => {if(colors[cell.id - 1].hex === colorChanger[tier].hex){
                        alert("Correct!");}
                        }
                        }
                    />
                ))}
            </div>
        </div>
    );
}