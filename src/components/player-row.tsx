import React from 'react';
import {Player} from "../types/player";
import ActionCell from "./action-cell";
import classNames from "classnames";

interface Props {
    player: Player;
    isSelected: boolean;
    canEditStats: boolean;
    onSelect: () => void;
    onDeselect: () => void;
    onUpdateStats: (statName: keyof Omit<Player, "name">, changeType: "inc" | "dec") => void;
}

function PlayerRow({canEditStats, player, isSelected, onSelect, onDeselect, onUpdateStats}: Props) {
    function handleClick() {
        if (isSelected) {
            onDeselect();
        } else {
            onSelect();
        }
    }

    function handleIncreaseStat(statsName: keyof Omit<Player, "name">) {
        onUpdateStats(statsName, "inc");
    }

    function handleDecreaseStat(statsName: keyof Omit<Player, "name">) {
        onUpdateStats(statsName, "dec");
    }

    const total = player.serveCount + player.passCount + player.attackCount + player.blockCount + player.receiveCount;

    const rowClassName = classNames("total-cell py-0", {
        "great": total > 10,
        "medium": total > 0 && total <= 10,
        "worse": total < 0,
    });

    return (
        <tr className={isSelected ? "selected-row" : ""}>
            <td className="py-0 name-cell" onClick={handleClick}>{player.name}</td>
            <ActionCell withButtons={canEditStats} onIncrease={() => handleIncreaseStat("serveCount")}
                        onDecrease={() => handleDecreaseStat("serveCount")} curData={player.serveCount}/>
            <ActionCell withButtons={canEditStats} onIncrease={() => handleIncreaseStat("passCount")}
                        onDecrease={() => handleDecreaseStat("passCount")} curData={player.passCount}/>
            <ActionCell withButtons={canEditStats} onIncrease={() => handleIncreaseStat("attackCount")}
                        onDecrease={() => handleDecreaseStat("attackCount")} curData={player.attackCount}/>
            <ActionCell withButtons={canEditStats} onIncrease={() => handleIncreaseStat("blockCount")}
                        onDecrease={() => handleDecreaseStat("blockCount")} curData={player.blockCount}/>
            <ActionCell withButtons={canEditStats} onIncrease={() => handleIncreaseStat("receiveCount")}
                        onDecrease={() => handleDecreaseStat("receiveCount")} curData={player.receiveCount}/>
            <td className={rowClassName}><div className="d-flex align-items-center justify-content-center">{total}</div></td>
        </tr>
    );
}

export default PlayerRow;