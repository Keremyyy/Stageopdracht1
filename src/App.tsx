import "./App.css";



function App() {
  const colors  = [
      "#FB2C37", // red
      "#FF6900", // orange
      "#F0B200", // yellow
      "#00C951", // green
      "#00A6F5", // blue
      "#8E51FF", // purple
      "#F7339A", // pink
      "#060606"  // black

    ]

    console.log(colors);
    const cells = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
        // dit is neit goed volgends de linter en hier moet nog naar gekeken worden
    }));
    console.log(cells);
    return (
    <div className="full-grid" role="grid">
      {cells.map((n) => (
        <div key={n.id} className="cell" role="gridcell">
          {n.id}
        </div>
      ))}
    </div>
  );
}

export default App;
