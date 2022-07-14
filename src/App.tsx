import React, {useEffect, useState} from 'react';
import ImportPanel from "./components/import-panel";
import GameTable from "./components/game-table";
import ActionPanel from "./components/action-panel";
import {Player} from "./types/player";
import ControlPanel from "./components/control-panel";
import {Alert} from "react-bootstrap";

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

        const inPlayers = inGamePlayers.filter(pl => !selInPlayers.includes(pl));
        inPlayers.push(...selOutPlayers);

        const outPlayers = outGamePlayers.filter(pl => !selOutPlayers.includes(pl));
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
        setSelInPlayers(selInPlayers.filter(pl => pl !== player));
    }

    function handleRemovePlayerFromOut(player: Player) {
        setSelOutPlayers(selOutPlayers.filter(pl => pl !== player));
    }

    function handleToGame() {
        setInGamePlayers([...inGamePlayers, ...selOutPlayers]);
        setOutGamePlayers(outGamePlayers.filter(pl => !selOutPlayers.includes(pl)));
        clearSelection();
    }

    function handleUpdatePlayerStats(pl: Player, stat: keyof Omit<Player, "name">, changeType: "inc" | "dec") {
        setInGamePlayers(inGamePlayers.map(curPl => {
            if (curPl !== pl) {
                return curPl;
            }
            return {...pl, [stat]: (changeType === "inc" ? pl[stat] + 1 : pl[stat] - 1)}
        }));
    }

    function handleImportData(inGame: Player[], outGame: Player[]) {
        setInGamePlayers(inGame);
        setOutGamePlayers(outGame);
        clearSelection();
    }

    function closeToast() {
        setHasError(false);
    }

    const [inGamePlayers, setInGamePlayers] = useState<Player[]>([]);
    const [outGamePlayers, setOutGamePlayers] = useState<Player[]>([]);

    const [selInPlayers, setSelInPlayers] = useState<Player[]>([]);
    const [selOutPlayers, setSelOutPlayers] = useState<Player[]>([]);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (hasError) {
            setTimeout(() => {setHasError(false);}, 2000);
        }
    }, [hasError]);

    return (
        <div className="app">
            <ImportPanel inGame={inGamePlayers} outGame={outGamePlayers} onImportData={handleImportData}/>
            {hasError && <Alert variant="danger">Players count should be the same</Alert>}
            <GameTable players={inGamePlayers} selectedPlayers={selInPlayers}
                       addPlayerToSelect={handleAddPlayerToIn}
                       removePlayerFromSelect={handleRemovePlayerFromIn}
                       onUpdateStats={handleUpdatePlayerStats}/>
            <ActionPanel onMoveClick={handleMovePlayers} onToGameClick={handleToGame}/>
            <GameTable players={outGamePlayers} selectedPlayers={selOutPlayers}
                       addPlayerToSelect={handleAddPlayerToOut}
                       removePlayerFromSelect={handleRemovePlayerFromOut}/>
            <ControlPanel onAddPlayer={handleAddPlayer}/>
        </div>
    );
}

export default App;
