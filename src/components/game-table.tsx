import React from 'react';
import {Table} from "react-bootstrap";
import {Player} from "../types/player";
import PlayerRow from "./player-row";

interface Props {
    selectedPlayers: Player[];
    addPlayerToSelect: (player: Player) => void;
    removePlayerFromSelect: (player: Player) => void;
    players: Player[];
    onUpdateStats?: (player: Player, stat: keyof Omit<Player, "name">, changeType: "inc" | "dec") => void;
}

function GameTable({onUpdateStats, players, selectedPlayers, addPlayerToSelect, removePlayerFromSelect}: Props) {
    return (
        <Table bordered className="my-0">
            <thead>
                <tr>
                    <th className="col-3">Имя</th>
                    <th className="col-1 text-center">Подача</th>
                    <th className="col-1 text-center">Прием</th>
                    <th className="col-1 text-center">Пас</th>
                    <th className="col-1 text-center">Атака</th>
                    <th className="col-1 text-center">Блок</th>
                    <th className="col-1 text-center">Итого</th>
                </tr>
            </thead>
            <tbody>
                {players.map(pl => <PlayerRow key={pl.name} onUpdateStats={(stat, changeType) => onUpdateStats?.(pl, stat, changeType)} canEditStats={onUpdateStats != null} player={pl} isSelected={selectedPlayers.includes(pl)} onSelect={() => addPlayerToSelect(pl)} onDeselect={() => removePlayerFromSelect(pl)}/> )}
            </tbody>
        </Table>
    );
}

export default GameTable;