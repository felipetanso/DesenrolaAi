import React from 'react';

import '../../styles/panel.css';
import card from '../../assets/Frame.svg';
import Navbar from '../../components/navbar';

const axios = require('axios');

export default class Daily extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            hasDrawn: false,
            type: "",
            question: "",
            content: (<><p id="refText">Reflita sobre assuntos diversos e deixe seu perfil cada vez mais completo. Reflexões são extremamente importantes para o seu desenvolvimento de suas soft skills.
            <br/><br/>
            Serão 05 categorias que podem ser abordadas, são elas: <b>Informação profissional</b>, <b>Mundo do trabalho</b>, <b>Autoconhecimento</b>, <b>Projeto de futuro</b> e <b>Escolha</b>.</p>
        <button style={{marginTop:"10px"}} onClick={this.drawCard}>SORTEAR CARTA</button></>)
        }
        this.daily = undefined;
    }

    drawCard = async (e) => {
        const lookup = {
            "FUTURE": "PROJETO DE FUTURO",
            "SELF": "AUTOCONHECIMENTO",
            "CHOICE": "ESCOLHA",
            "WORK_WORLD": "MUNDO DO TRABALHO",
            "WORK_INFO": "INFORMAÇÃO PROFISSIONAL"
        }

        try {
            this.daily = await axios.get('/api/v1/dailies', {
                headers: {Authorization: `Bearer ${window.localStorage.token}`}
            });
            document.getElementById('refCard').setAttribute('flipped', true);
            this.setState({content: (
                <>
                    <textarea id="txtBox" maxLength="450"></textarea>
                    <button>RESPONDER</button>
                </>
            )});
            this.setState({
                type: lookup[this.daily.data.type], 
                question: this.daily.data.text
            })
            console.log(this.state.type)
            setTimeout(() => {
                this.setState({hasDrawn: true})
            }, 1000)
        } catch(er) {
            console.log(er)
        }
    }

    render() {
        return (
            <>

                <div id="display-panel">
                    <div id="cardPanel">
                        <img id="refCard" src={card}/>
                        <h3 hidden={!this.state.hasDrawn}>{this.state.type}</h3>
                        <p hidden={!this.state.hasDrawn}>{this.state.question}</p>
                    </div>
                    <div>
                        {this.state.content}
                    </div>
                    
                </div>
                <Navbar props={{text: "REFLEXÕES DIÁRIAS", color: "#5E4CA9", foreground: "#F0F0F0", history: this.props.history}}/>
                
            </>
        )
    }
}
