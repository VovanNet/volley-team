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
        "great": curData > 5,
        "medium": curData > 0 && curData <= 5,
        "worse": curData < 0,
    });

    return (
        <td className={rowClassName}>
            <div className={className}>
                <div className='minus-button'>
                    {withButtons && <FontAwesomeIcon className="p-2" icon={faMinus} color="#aa0000" onClick={onDecrease}/>}
                </div>
                {curData}
                <div className='plus-button'>
                    {withButtons && <FontAwesomeIcon className="p-2" icon={faPlus} color="green" onClick={onIncrease}/>}
                </div>
            </div>
        </td>
    );
}

    export default ActionCell;