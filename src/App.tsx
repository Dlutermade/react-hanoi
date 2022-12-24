import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const NUM_DISCS = 5;

function App() {
  const [towers, setTowers] = useState([[1, 2, 3, 4, 5], [], []]);
  const [selectedTowerIdx, setSelectedTowerIdx] = useState<
    number | undefined
  >();

  const handleClickedTower = (clickedTowerIdx: number) => {
    if (selectedTowerIdx !== undefined) {
      const selectedTower = towers[selectedTowerIdx];
      const clickedTower = towers[clickedTowerIdx];

      if (selectedTower[0] > clickedTower[0]) {
        setSelectedTowerIdx(undefined);
        return;
      }

      const newTowers = [...towers];
      const poppedDisc = newTowers[selectedTowerIdx].shift()!;
      newTowers[clickedTowerIdx].unshift(poppedDisc);

      setTowers(newTowers);
      setSelectedTowerIdx(undefined);
      setTimeout(() => {
        if (towers[2].length === NUM_DISCS) {
          alert("Win");
        }
      });
    } else if (towers[clickedTowerIdx].length !== 0) {
      setSelectedTowerIdx(clickedTowerIdx);
    }
  };

  return (
    <div className="App">
      <div className="towers">
        {towers.map((discs, towerIdx) => (
          <div
            className={`tower ${selectedTowerIdx === towerIdx && "selected"}`}
            onClick={() => handleClickedTower(towerIdx)}
            key={towerIdx}
          >
            <div className="line" />
            <div className="discs">
              {discs.map((discNumber, discIdx) => (
                <div
                  className="disc"
                  style={{
                    width: `${25 * discNumber}px`,
                  }}
                  key={discIdx}
                >
                  {discNumber}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
