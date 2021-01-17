import React from 'react';

import '../styles/signup.css';
import '../styles/loader.css';

const axios = require('axios');

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        
        if (window.localStorage.getItem("token") != null) {
            this.props.history.push('/dashboard');
        }

        this.state = {
            email: "",
            password: "",
            loggedIn: false,
            errorMessage: ""
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        
    }

    loginAccount = async (e) => {
        const {
            email,
            password,
        } = this.state;

        if ([email, password].includes("")) {
            return;
        }

        this.handleClick(e);

        try {
            const loginReq = await axios.post('/api/v1/user/login', {
                email,
                password
            })
            
            if (loginReq.status == 200) {
                this.setState({loggedIn: true})
                // TODO: Use cookies instead of local storage
                window.localStorage.setItem("token", loginReq.data.token);
                this.props.history.push('/dashboard');
            }

        } catch(error) {
            this.setState({errorMessage: "Autenticação falhou!"});
        } finally {
            this.setState({accountCreateRequested: true})
        }

    }

    handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                this.setState({email: e.target.value});
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
                            <h2 style={{textAlign:"center"}}>{this.state.loggedIn ? "Sucesso" : (this.state.errorMessage)}</h2>
                            <div class="loader" hidden={!!this.state.errorMessage}>Loading...</div>
                        </div>
                        <div className="blocky_panel">
                            <h2 style={{textAlign:"center"}}>Entrar</h2>
                            <input name="email" required type="email" placeholder="E-mail" required onChange={this.handleChange}></input>
                            <input name="password" required type="password" placeholder="Senha" required onChange={this.handleChange}></input>
                            <button type="button" disabled={!this.state.email && !this.state.password} onClick={this.loginAccount}>Próximo</button>
                            <p class="link_center"><a href="/signup">Criar nova conta</a></p>
                        </div>
                    </div>
                    
                </form>
                
            </div>
        )
    }
}