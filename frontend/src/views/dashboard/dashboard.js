import React from 'react';
import Navbar from '../../components/navbar';
import AutoConhecimento from '../../components/autoconhecimento';

const axios = require('axios');

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    
    const {text} = this.props; 
    this.id = this.props.match.params.id;
    this.state = {
      isLoggedIn: false,
      checkForLogin: false
    }

    this.names = {
        "self": "AUTOCONHECIMENTO",
        undefined: "MENU"
    }
    this.components = {
        "self": <AutoConhecimento/>
    }
  }

  render() {
    return (
        <>
            <Navbar props={{text: this.names[this.id] ?? "MENU", color: "#FFCF00", foreground: "#222222"}}/>
            {this.components[this.id]}
        </>
    )
  }
}
