import React from 'react';

import '../styles/signup.css';
import '../styles/loader.css';

const axios = require('axios');

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            birthdate: "",
            password: "",
            accountCreated: false,
            accountCreateRequested: false,
            accountErrMessage: ""
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        
    }

    createAccount = async (e) => {
        this.handleClick(e);
        const {
            email,
            name,
            birthdate,
            password,
        } = this.state;

        if ([email, name, birthdate, password].includes("")) {
            return;
        }

        try {
            const createAccReq = await axios.post('http://localhost:3001/api/v1/user/signup', {
                email,
                name,
                birthdate,
                password,
                // These two will not be used for the PoC
                location: {city:"None", state:"None", country: "None"},
                identity: "None",
            })
            
            if (createAccReq.status == 201) {
                this.setState({accountCreated: true})
            }

        } catch(error) {
            if (error.response.status == 409) {
                this.setState({accountErrMessage: "Uma conta com esse email já existe!"})
            } else {
                this.setState({accountErrMessage: "Whoops! Parece que algo deu errado, tente novamente mais tarde."})
            }
        } finally {
            this.setState({accountCreateRequested: true})
        }

    }

    handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                this.setState({name: e.target.value})
                break;
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'birthdate':
                this.setState({birthdate: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
        }
        
    }

    handleClick = (e) => {
        e.target.parentElement.setAttribute("hidden", true);
        setTimeout(() => {
            e.target.parentElement.style.display = "none";
        }, 1000)
    }

    render() {
        return (
            <div id="background">
                <h1>Desenrola Aí</h1>
                <form id="signup-form" onSubmit={this.onSubmit}>
                    <div id='blocky_carousel'>
                        <div className="blocky_panel">
                            <h3 style={{textAlign:"center"}}>{this.state.accountCreateRequested ? (this.state.accountCreated ? "Conta criada!" : this.state.accountErrMessage) : ""}</h3>
                            <div class="loader" hidden={this.state.accountCreateRequested}>Loading...</div>
                            <p class="link_center" hidden={!this.state.accountCreateRequested}><a style={{textAlign:"center"}} href="/">Voltar</a></p>
                        </div>
                        <div className="blocky_panel">
                            <h3>E-mail</h3>
                            <p>{this.state.email}</p>
                            <h3>Termos de uso</h3>
                            <p>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            <button type="button" onClick={this.createAccount}>Confirmar</button>
                        </div>
                        <div className="blocky_panel">
                            <h2>Crie uma senha forte</h2>
                            <input name="password" type="password" placeholder="Senha" required onChange={this.handleChange}></input>
                            <button type="button" disabled={!this.state.password} onClick={this.handleClick}>Próximo</button>
                            <p class="link_center"><a href="/login">Já tenho uma conta</a></p>
                        </div>
                        <div className="blocky_panel">
                            <h2>Nos conte quando você nasceu</h2>
                            <input name="birthdate" type="date" required onChange={this.handleChange}></input>
                            <button type="button" disabled={!this.state.birthdate} onClick={this.handleClick}>Próximo</button>
                            <p class="link_center"><a href="/login">Já tenho uma conta</a></p>
                        </div>
                        <div className="blocky_panel">
                            <h2>Agora, digite o seu e-mail</h2>
                            <input name="email" type="email" placeholder="E-mail válido" required onChange={this.handleChange}></input>
                            <button type="button" disabled={!this.state.email} onClick={this.handleClick}>Próximo</button>
                            <p class="link_center"><a href="/login">Já tenho uma conta</a></p>
                        </div>
                        <div className="blocky_panel">
                            <h2>Para começar, digite o seu nome completo</h2>
                            <input name="name" type="text" placeholder="Nome completo" required onChange={this.handleChange}></input>
                            <button type="button" disabled={!this.state.name} onClick={this.handleClick}>Próximo</button>
                            <p class="link_center"><a href="/login">Já tenho uma conta</a></p>
                        </div>
                    </div>
                    
                </form>
                
            </div>
        )
    }
}