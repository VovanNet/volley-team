import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileImport, faFileExport} from '@fortawesome/free-solid-svg-icons'
import React, {useRef} from 'react';
import {Container, Navbar} from "react-bootstrap";
import {saveFile} from "../helpers/save-file";
import moment from "moment";
import {Player} from "../types/player";

interface Props {
    inGame: Player[];
    outGame: Player[];
    onImportData: (inGame: Player[], outGame: Player[]) => void;
}

function ImportPanel({inGame, outGame, onImportData}: Props) {
    function handleImportData() {
        const file = inputRef.current?.files?.[0];
        const reader = new FileReader();
        reader.onload = function () {
            const {inGame, outGame} = JSON.parse(reader.result as string);
            onImportData(inGame, outGame);
        }
        if (file != null) {
            reader.readAsText(file);
        }
    }

    function handleExportData() {
        const suffix = moment().format('MM_DD_YYYY_HH_mm');
        saveFile(`team-${suffix}`, {inGame, outGame});
    }

    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <Navbar bg="light">
            <Navbar.Brand href="#home" className="ms-3">Vovan Team :)</Navbar.Brand>
            <Container className="align-items-center justify-content-end">
                <label className="d-flex">
                    <input ref={inputRef} type="file" accept=".json" className="d-none" onChange={handleImportData}/>
                    <FontAwesomeIcon className="p-2" icon={faFileExport} color="#6960EC" />
                </label>
                <FontAwesomeIcon icon={faFileImport} color="#6960EC" className="p-2 ms-4" onClick={handleExportData}/>
            </Container>
        </Navbar>
    );
}

export default ImportPanel;