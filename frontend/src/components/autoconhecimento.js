import React from 'react';

import '../styles/panel.css';

export default class AutoConhecimento extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <>
                <div id="display-panel">
                    <button onClick={(e) => {window.location.href = "/disc"}}>Análise Comportamental</button>
                    <button>Motivadores</button>
                    <button>Atitudes</button>
                    <button>Pontos Limitantes</button>
                    <button>Talentos</button>
                </div>
            </>
        )
    }
}
