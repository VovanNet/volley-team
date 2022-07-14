import React, {PropsWithChildren} from 'react';
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface Props extends PropsWithChildren {
    withButtons: boolean;
    onIncrease: () => void;
    onDecrease: () => void;
    curData: number;
}

function ActionCell({withButtons, curData, onIncrease, onDecrease}: Props) {
    const className = classNames("d-flex align-items-center", {
        "justify-content-between": withButtons,
        "justify-content-center": !withButtons
    });

    const rowClassName = classNames("action-cell py-0", {
        "great": curData > 7,
        "medium": curData > 4 && curData <= 7,
        "worse": curData <= 4,
    })

    return (
        <td className={rowClassName}>
            <div className={className}>
                {withButtons && <FontAwesomeIcon className="p-2" icon={faMinus} color="#6960EC" onClick={onDecrease}/>}
                {curData}
                {withButtons && <FontAwesomeIcon className="p-2" icon={faPlus} color="#6960EC" onClick={onIncrease}/>}
            </div>
        </td>
    );
}

    export default ActionCell;