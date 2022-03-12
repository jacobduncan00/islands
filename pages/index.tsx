import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [numCells, setNumCells] = useState<Number>(25);
  const [cells, setCells] = useState<Array<Number>>(new Array(25).fill(0));
  const [cellClassName, setCellClassName] = useState<string>(
    "border-2 border-black rounded-md text-center w-g h-24 m-1 text-3xl outline-none decoration-none"
  );
  const [runningAlgo, setRunningAlgo] = useState<boolean>(false);
  const [islandCount, setIslandCount] = useState<Number>(0);

  const resetCellClassNameState = () => {
    setCellClassName(
      "border-2 border-black rounded-md text-center w-g h-24 m-1 text-3xl outline-none decoration-none"
    );
  };

  const errorCellClassNameState = () => {
    setCellClassName(
      "border-2 border-red-500 rounded-md text-center w-g h-24 m-1 text-3xl outline-none decoration-none"
    );
  };

  const resetCells = () => {
    console.log("RESET");
    setRunningAlgo(false);
    setCells(new Array(25).fill(0));
    setNumCells(25);
    setIslandCount(0);
  };

  const isValid = (map: any, i: any, j: any, visited: any) => {
    return (
      i >= 0 &&
      i < map.length &&
      j >= 0 &&
      j < map[i].length &&
      map[i][j] == 1 &&
      !visited[i][j]
    );
  };

  const DFS = (map: any, i: any, j: any, visited: any) => {
    const yOptions = [-1, -1, -1, 0, 0, 1, 1, 1];
    const xOptions = [-1, 0, 1, -1, 1, -1, 0, 1];
    visited[i][j] = true;
    for (let k = 0; k < 8; k++) {
      if (isValid(map, i + yOptions[k], j + xOptions[k], visited)) {
        DFS(map, i + yOptions[k], j + xOptions[k], visited);
      }
    }
  };

  const sleep = (milliseconds: any) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const countNumIslands = () => {
    setIslandCount(0);
    setRunningAlgo(true);
    let visited = new Array(5);
    for (let i = 0; i < 5; i++) {
      visited[i] = new Array(5);
      for (let j = 0; j < 5; j++) {
        visited[i][j] = false;
      }
    }

    let map = [];
    let shallow = [...cells];
    while (shallow.length) map.push(shallow.splice(0, 5));
    let islandCount = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (map[i][j] == 1 && !visited[i][j]) {
          DFS(map, i, j, visited);
          islandCount++;
        }
      }
    }
    console.log(islandCount);
    setIslandCount(islandCount);
    return islandCount;
  };

  return (
    <div className="h-3/4 mt-12 flex flex-row flex-wrap items-center justify-center w-full">
      {!runningAlgo && (
        <div className="mx-52 w-1/2">
          <div className="flex flex-row flex-wrap">
            {Array(numCells)
              .fill(0)
              .map((_, idx) => {
                return (
                  <input
                    key={idx}
                    className={cellClassName}
                    onChange={(e) => {
                      let val = parseInt(e.target.value);
                      if ((val == 0 || val == 1) && cells[idx] != null) {
                        resetCellClassNameState();
                        let oldCells = cells;
                        let cellToChange = cells[idx];
                        cellToChange = val;
                        oldCells[idx] = cellToChange;
                        setCells([...oldCells]);
                      } else {
                        errorCellClassNameState();
                      }
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}
      {runningAlgo && (
        <>
          <div className="mx-52 w-1/2">
            {(() => {
              switch (islandCount) {
                case 0:
                  return (
                    <h1 className="text-3xl mb-2 text-center">
                      No islands were found
                    </h1>
                  );
                case 1:
                  return (
                    <h1 className="text-3xl mb-2 text-center">
                      {islandCount} island was found
                    </h1>
                  );
                default:
                  return (
                    <h1 className="text-3xl mb-2 text-center">
                      {islandCount} islands were found
                    </h1>
                  );
              }
            })()}
            <div className="flex flex-row flex-wrap">
              {cells.map((cell, idx) => {
                return (
                  <div className={cellClassName} key={idx}>
                    {cell == 1 ? (
                      <span className="w-full flex h-full justify-center items-center bg-green-400">
                        {cell}
                      </span>
                    ) : (
                      <span className="w-full flex h-full justify-center items-center bg-blue-400">
                        {cell}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <div className="ml-4 mt-4">Flattened Array: [{cells}]</div>
      <div className="flex flex-row flex-wrap items-center justify-center w-full mt-12">
        {!runningAlgo && (
          <button
            className="inline-block px-8 py-3 text-sm font-medium text-white transition bg-green-600 rounded hover:scale-110 hover:shadow-xl active:bg-green-500 focus:outline-none focus:ring"
            onClick={countNumIslands}
          >
            Run Count Islands Algo
          </button>
        )}
        {runningAlgo && (
          <>
            <button
              disabled
              className="inline-block px-8 py-3 text-sm font-medium text-white transition bg-green-600 rounded hover:scale-110 hover:shadow-xl active:bg-green-500 focus:outline-none focus:ring
            disabled:bg-gray-500 disabled:text-black disabled:cursor-not-allowed mr-4"
              onClick={countNumIslands}
            >
              Run Count Islands Algo
            </button>
            <button
              className="inline-block px-8 py-3 text-sm font-medium text-white transition bg-orange-600 rounded hover:scale-110 hover:shadow-xl active:bg-orange-500 focus:outline-none focus:ring"
              onClick={resetCells}
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
