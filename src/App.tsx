import { useMemo } from "react";
import "./App.css";

function App() {
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
        // er horen 8 kleuren in te zitten dus er moet even naar de grey gekeken worden
    ];

    const cells = useMemo(() => {
        const shuffled = [...colors].sort(() => Math.random() - 0.5);
        // math.random mag niet van de linter hier moet nog even naar gekeken worden
        return Array.from({ length: 9 }, (_, i) => ({
            id: i + 1,
            color: shuffled[i]

        }));
    }, []);

    return (
        <div className="full-grid" role="grid">
            {cells.map((n) => (
                <div
                    key={n.id}
                    className="cell"
                    role="gridcell"
                    style={{ backgroundColor: n.color.hex }}
                >
                    {n.id}
                </div>
            ))}
        </div>
    );
}

export default App;