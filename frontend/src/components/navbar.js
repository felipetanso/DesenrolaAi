import React from 'react';
import '../styles/navbar.css';

const axios = require('axios');



export default class Navbar extends React.Component {

  constructor(props) {
    super(props)
    
    const {text, color, foreground} = this.props.props;
    console.log(this.props)
    this.history = this.props.props.history
    this.text = text;
    this.color = color
    this.foreground = foreground

    this.state = {
      isLoggedIn: false,
      checkForLogin: false
    }

    if (window.localStorage.getItem("token") != null) {
      this.checkLogin();
    } else {
      window.location.href = "/"
    }

  }

  async checkLogin() {
    try {
      this.setState({checkForLogin: true})
      const req = await axios.get('/api/v1/user/validate', {
        headers: {Authorization: `Bearer ${window.localStorage.token}`}
      });
    } catch (err) {
      this.setState({checkForLogin: false});
      window.localStorage.removeItem('token')
    }
  }

  hamburgerClick = (e) => {
    let sidebar = document.getElementById('sidebar');
    let slideIn = false; 

    if (e.target.className.startsWith("bar")) {
      e.target.parentElement.classList.toggle("change")

      slideIn = e.target.parentElement.className.endsWith("change")

    } else {
      e.target.classList.toggle("change")
      slideIn = e.target.className.endsWith("change")
    }
    
    sidebar.setAttribute("hidden", !slideIn)

  }
  autoconhecimento = (e) => {
    window.location.href = '/dashboard/self'
  }
  render() {
    return (
      <>
        <div id="sidebar" hidden>
          <button type="button">Sobre</button>
          <button type="button" onClick={this.autoconhecimento}>Autoconhecimento</button>
          <button type="button">Soft Skills</button>
          <button type="button">Conversas</button>
          <button type="button">Vagas Disponíveis</button>
          <button type="button">Acompanhar evolução</button>
          <button type="button">Carteira</button>
          <button type="button">Clube de Vantagens</button>
          <button type="button">Perfil Profissional</button>
        </div>
        <div id="navbar">
            <div id="bg" style={{backgroundColor: this.color}}>
              
              <div class="container" onClick={this.hamburgerClick}>
                <div style={{backgroundColor: this.foreground}} class="bar1"></div>
                <div style={{backgroundColor: this.foreground}} class="bar2"></div>
                <div style={{backgroundColor: this.foreground}} class="bar3"></div>
              </div>
              <h1 style={{ color: this.foreground}}>{this.text}</h1>
            </div>
        </div>
      </>
    )
  }
}
