import React, { useEffect, useState } from "react";
import ImportPanel from "./components/import-panel";
import GameTable from "./components/game-table";
import ActionPanel from "./components/action-panel";
import { Player } from "./types/player";
import ControlPanel from "./components/control-panel";
import { Alert } from "react-bootstrap";
import { useLocalStorage } from "./helpers/use-storage";

function App() {
  function clearSelection() {
    setSelInPlayers([]);
    setSelOutPlayers([]);
  }

  function handleMovePlayers() {
    if (selInPlayers.length !== selOutPlayers.length) {
      setHasError(true);
      return;
    }

    const inPlayers = inGamePlayers.filter((pl) => !selInPlayers.includes(pl));
    inPlayers.push(...selOutPlayers);

    const outPlayers = outGamePlayers.filter(
      (pl) => !selOutPlayers.includes(pl)
    );
    outPlayers.push(...selInPlayers);

    setInGamePlayers(inPlayers);
    setOutGamePlayers(outPlayers);

    clearSelection();
  }

  function handleAddPlayer(player: Player) {
    setOutGamePlayers([...outGamePlayers, player]);
  }

  function handleAddPlayerToIn(player: Player) {
    setSelInPlayers([...selInPlayers, player]);
  }

  function handleAddPlayerToOut(player: Player) {
    setSelOutPlayers([...selOutPlayers, player]);
  }

  function handleRemovePlayerFromIn(player: Player) {
    setSelInPlayers(selInPlayers.filter((pl) => pl !== player));
  }

  function handleRemovePlayerFromOut(player: Player) {
    setSelOutPlayers(selOutPlayers.filter((pl) => pl !== player));
  }

  function handleToGame() {
    setInGamePlayers([...inGamePlayers, ...selOutPlayers]);
    setOutGamePlayers(
      outGamePlayers.filter((pl) => !selOutPlayers.includes(pl))
    );
    clearSelection();
  }

  function handleUpdatePlayerStats(
    pl: Player,
    stat: keyof Omit<Player, "name">,
    changeType: "inc" | "dec"
  ) {
    setInGamePlayers(
      inGamePlayers.map((curPl) => {
        if (curPl !== pl) {
          return curPl;
        }
        return {
          ...pl,
          [stat]: changeType === "inc" ? pl[stat] + 1 : pl[stat] - 1,
        };
      })
    );
  }

  function handleImportData(inGame: Player[], outGame: Player[]) {
    setInGamePlayers(inGame);
    setOutGamePlayers(outGame);
    clearSelection();
  }

  function handleClearPlayers() {
    setInGamePlayers([]);
    setOutGamePlayers([]);
    clearSelection();
  }

  function handleDefaultPlayers() {
    setInGamePlayers(customInPlayers());
    setOutGamePlayers(customOutPlayers());
    clearSelection();
  }

  function customInPlayers() {
    return [
      {
        attackCount: 0,
        blockCount: 0,
        name: "Юля",
        passCount: 0,
        receiveCount: 0,
        serveCount: 0,
      },
      {
        attackCount: 0,
        blockCount: 0,
        name: "Владимир",
        passCount: 0,
        receiveCount: 0,
        serveCount: 0,
      },
      {
        attackCount: 0,
        blockCount: 0,
        name: "Саша",
        passCount: 0,
        receiveCount: 0,
        serveCount: 0,
      },
      {
        attackCount: 0,
        blockCount: 0,
        name: "Евгений",
        passCount: 0,
        receiveCount: 0,
        serveCount: 0,
      },
      {
        attackCount: 0,
        blockCount: 0,
        name: "Big Aleks",
        passCount: 0,
        receiveCount: 0,
        serveCount: 0,
      },
      {
        attackCount: 0,
        blockCount: 0,
        name: "Санжи",
        passCount: 0,
        receiveCount: 0,
        serveCount: 0,
      },
    ];
  }

  function customOutPlayers() {
    return [
      {
        attackCount: 0,
        blockCount: 0,
        name: "Савва",
        passCount: 0,
        receiveCount: 0,
        serveCount: 0,
      },
    ];
  }

  // function closeToast() {
  //     setHasError(false);
  // }

  //const [inGamePlayers, setInGamePlayers] = useState<Player[]>([]);
  //const [outGamePlayers, setOutGamePlayers] = useState<Player[]>([]);

  const [inGamePlayers, setInGamePlayers] = useLocalStorage<Player[]>("inGame", []);
  const [outGamePlayers, setOutGamePlayers] = useLocalStorage<Player[]>("outGame", []);

  const [selInPlayers, setSelInPlayers] = useState<Player[]>([]);
  const [selOutPlayers, setSelOutPlayers] = useState<Player[]>([]);

  const [hasError, setHasError] = useState(false);

  //customPlayers();

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 2000);
    }
  }, [hasError]);

  return (
    <div className="app">
      <ImportPanel
        inGame={inGamePlayers}
        outGame={outGamePlayers}
        onImportData={handleImportData}
      />
      {hasError && (
        <Alert variant="danger">Players count should be the same</Alert>
      )}
      <GameTable
        players={inGamePlayers}
        selectedPlayers={selInPlayers}
        addPlayerToSelect={handleAddPlayerToIn}
        removePlayerFromSelect={handleRemovePlayerFromIn}
        onUpdateStats={handleUpdatePlayerStats}
      />
      <ActionPanel
        onMoveClick={handleMovePlayers}
        onToGameClick={handleToGame}
      />
      <GameTable
        players={outGamePlayers}
        selectedPlayers={selOutPlayers}
        addPlayerToSelect={handleAddPlayerToOut}
        removePlayerFromSelect={handleRemovePlayerFromOut}
      />
      <ControlPanel
        onAddPlayer={handleAddPlayer}
        onClearPlayers={handleClearPlayers}
        onDefaultPlayers={handleDefaultPlayers}
      />
    </div>
  );
}

export default App;
