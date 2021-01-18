import React from 'react';

import '../styles/panel.css';

export default class SoftSkills extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <>
                <div id="display-panel">
                    <button>Duelo</button>
                    <button>Força Tarefa</button>
                    <button onClick={(e) => {window.location.href = "/daily"}}>Reflexões Diárias</button>
                </div>
            </>
        )
    }
}
