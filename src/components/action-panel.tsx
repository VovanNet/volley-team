import React from 'react';
import {faArrowsUpDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    onMoveClick: () => void;
    onToGameClick: () => void;
}

function ActionPanel({onMoveClick, onToGameClick}: Props) {
    return (
        <div className="d-flex justify-content-between py-3">
            <FontAwesomeIcon className="ms-2 p-2" icon={faArrowsUpDown} color="#6960EC" onClick={onMoveClick}/>
            <FontAwesomeIcon className="ms-2 p-2" icon={faArrowUp} color="#6960EC" onClick={onToGameClick}/>
        </div>
    );
}

export default ActionPanel;