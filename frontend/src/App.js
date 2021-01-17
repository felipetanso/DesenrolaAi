import React from 'react';
import logo from './logo.svg';
import './App.css';

import './styles/signup.css';
import './styles/loader.css';

const axios = require('axios');

export default class App extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      isLoggedIn: false,
      checkForLogin: false
    }

    if (window.localStorage.getItem("token") != null) {
      
      this.checkLogin();
    }

  }

  async checkLogin() {
    try {
      this.setState({checkForLogin: true})
      const req = await axios.get('http://localhost:3001/api/v1/user/validate', {
        headers: {Authorization: `Bearer ${window.localStorage.token}`}
      });
      if (req.status == 200)
        this.props.history.push('/dashboard')
    } catch (err) {
      console.log(err)
      this.setState({checkForLogin: false});
      window.localStorage.removeItem('token')
    }
  }

  render() {
    return (
      <div id="background">
      <h1>Desenrola Aí</h1>
      <form id="signup-form">
          <div id='blocky_carousel'>
              <div className="blocky_panel">
                  <h2 style={{textAlign:"center", fontWeight:"Medium"}}>Área do Usuário</h2>
                  <div class="loader" hidden={this.state.accountCreateRequested} hidden={!this.state.checkForLogin}>Loading...</div>
                  <button type="button" onClick={(e) => this.props.history.push('/signup')}  style={{marginTop:"50px"}} hidden={this.state.checkForLogin}>Criar conta</button>
                  <button type="button" onClick={(e) => this.props.history.push('/login')} hidden={this.state.checkForLogin}>Entrar</button>
              </div>
        </div>
      </form>
    </div>
    )
  }
}
