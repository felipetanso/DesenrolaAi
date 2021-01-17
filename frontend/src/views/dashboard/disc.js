import React from 'react';
import Navbar from '../../components/navbar';

const axios = require('axios');

export default class DISC extends React.Component {

  constructor(props) {
    super(props)
    
    const {text} = this.props; 

    this.state = {
      isLoggedIn: false,
      checkForLogin: false
    }

  }

  render() {
    return (
        <>
            <Navbar props={{text: "ANÁLISE COMPORTAMENTAL (DISC)", color: "#5E4CA9", foreground: "#F0F0F0", history: this.props.history}}/>
        </>
    )
  }
}
