import React from 'react';
import Navbar from '../../components/navbar';

import '../../styles/disc.css';

const axios = require('axios');

export default class DISC extends React.Component {
    
  constructor(props) {
    super(props)

    this.state = {
      content: (<><p>Para se posicionar no lugar mais adequado, é fundamental você conhecer seu perfil comportamental, ele reflete a maneira como você interage com o mundo ao seu redor. O teste a seguir é baseado na Teoria DISC.
        <br/><br/>
        D = dominância (Dominance)<br/>
        I = Influência (Influence)<br/>
        
        S = Estabilidade (Steadiness)<br/>
        
        C = Conformidade (Conscientiousness)<br/><br/>
        

        Ela analisa como as pessoas fazem as coisas.
        O teste a seguir dará o resultado de qual dos 4 fatores é predominante em sua personalidade. Ele mostrará suas características mais marcantes e, portanto, seus comportamentos mais explícitos. Sabendo isto, dê prioridade trabalhar em funções nas quais possa usar suas características mais marcantes na maior parte do tempo.
    </p>
    <button id="startTest" onClick={this.initTest} hidden>INICIAR TESTE</button></>)
    }
    this.getDisc();

    this.questions = null;
    this.results = {}
  }

    async getDisc() {
        this.questions = await axios.get('/api/v1/disc', {
            headers: {Authorization: `Bearer ${window.localStorage.token}`}
        });
        document.getElementById('startTest').removeAttribute('hidden')
    }

    buildHtml(index) {
        const question = this.questions.data[index];
        return (
            <>
                <p>Escolha o que você mais se identifica atualmente</p><br/>
                <input type='radio' name={question.questionId} id="0" class="opt"></input>
                <label for="0">{question.options[0]}</label><br/>
                <input type='radio' name={question.questionId} id="1" class="opt"></input>
                <label for="1">{question.options[1]}</label><br/>
                <input type='radio' name={question.questionId} id="2"class="opt"></input>
                <label for="2">{question.options[2]}</label><br/>
                <input type='radio' name={question.questionId} id="3"class="opt"></input>
                <label for="3">{question.options[3]}</label><br/>
                <input type='radio' name={question.questionId} id="4"class="opt"></input>
                <label for="4">{question.options[4]}</label><br/><br/>
                <button type='button' onClick={this.nextQuestion}>Próxima</button>
            </>
        )
        
    }

    initTest = (e) => {
        this.setState({content: this.buildHtml(0)})
    }

    async getResults() {
        console.log(this.results);
            let resp = await axios.post('/api/v1/disc/calculate', 
                {choices: this.results},
                {headers: {Authorization: `Bearer ${window.localStorage.token}`, ContentType: "application/json"}}
            );
            if (resp.status == 200) {
                let data = resp.data;
                this.setState({
                    content: (
                        <>
                            <h3 id={data.result.personalityId}>{data.result.personality}</h3>
                            <ul>
                                <li>Dominância: {data.sums.DOMINANT}%</li>
                                <li>Influência: {data.sums.INFLUENT}%</li>
                                <li>Estabilidade: {data.sums.STABILITY}%</li>
                                <li>Segurança: {data.sums.CAUTIOUS}%</li>
                            </ul>
                            <p>Quanto mais alta for a {data.result.personality}, mas intensamente a pessoa será:</p>
                            <ul>
                                <li>{data.result.strongTraits[0]}</li>
                                <li>{data.result.strongTraits[1]}</li>
                                <li>{data.result.strongTraits[2]}</li>
                                <li>{data.result.strongTraits[3]}</li>
                                <li>{data.result.strongTraits[4]}</li>
                                <li>{data.result.strongTraits[5]}</li>
                                <li>{data.result.strongTraits[6]}</li>
                                <li>{data.result.strongTraits[7]}</li>
                            </ul>
                            <p>Pessoas com alta {data.result.personality} costumam apresentar os seguintes pontos fortes:</p>
                            <ul>
                                <li>{data.result.mainTraits[0]}</li>
                                <li>{data.result.mainTraits[1]}</li>
                                <li>{data.result.mainTraits[2]}</li>
                                <li>{data.result.mainTraits[3]}</li>
                            </ul>
                            <p>Pessoas com alta {data.result.personality} costumam apresentar os seguintes pontos fracos e limitantes:</p>
                            <ul>
                                <li>{data.result.weakTraits[0]}</li>
                                <li>{data.result.weakTraits[1]}</li>
                                <li>{data.result.weakTraits[2]}</li>
                                <li>{data.result.weakTraits[3]}</li>
                            </ul>
                            <p>Posicionamento ideal para pessoas com este tipo de personalidade:</p>
                            <ul>
                                <li>{data.result.idealPositions[0]}</li>
                                <li>{data.result.idealPositions[1]}</li>
                                <li>{data.result.idealPositions[2]}</li>
                                <li>{data.result.idealPositions[3]}</li>
                            </ul>
                        </>
                    )
                })
            }
        
    }

    nextQuestion = (e) => {
        let inputs = Array.from(document.getElementsByClassName("opt")).filter(el => el.checked);

        if (inputs.length < 1) {
            return;
        } else {
            this.results[inputs[0].name] = inputs[0].id << 0;

            if (Object.keys(this.results).length < Object.keys(this.questions.data).length) {
                this.setState({content: this.buildHtml(Object.keys(this.results).length)})
            } else  {
                this.setState({
                    content: (
                        <>  
                            <h1 style={{textAlign:"center"}}>Calculando resultados!</h1>
                            <div class="loader" hidden={!!this.state.errorMessage}>Loading...</div>
                        </>
                    )
                })
                this.getResults()
            }
            
        }
    }

    render() {
        return (
            <>
                <Navbar props={{text: "ANÁLISE COMPORTAMENTAL (DISC)", color: "#5E4CA9", foreground: "#F0F0F0", history: this.props.history}}/>
                <div id="panel_questions">
                    {this.state.content}
                </div>
                
            </>
        )
    }
}
