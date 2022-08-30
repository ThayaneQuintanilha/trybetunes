import React, { Component } from 'react';

export default class Login extends Component {
  // state = {
  //   buttonDisabled: true,
  //   inputName: '',
  // };

  // buttonCaracters = () => {
  //   const { inputName } = this.state;
  //   return inputName.length >= 3;
  // };

  // handleChange = ({  }) => {
  //   const { inputName } = this.state;
  //   this.setState({[name]: value})
  // };

  render() {
    return (
      <div data-testid="page-login">
        <input data-testid="login-name-input" />
        <button type="submit" data-testid="login-submit-button">Entrar</button>
      </div>
    );
  }
}
