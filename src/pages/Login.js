import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends React.Component {
  state = {
    buttonDisabled: true,
    inputName: '',
    enterUser: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    const number = 3;
    if (value.length >= number) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  saveUser = () => {
    const { inputName } = this.state;
    this.setState({ enterUser: true }, async () => {
      await createUser({ name: inputName });
      const { history } = this.props;
      history.push('/search');
    });
  };

  render() {
    const { inputName, buttonDisabled, enterUser } = this.state;
    return (
      <div data-testid="page-login">
        {enterUser ? <Loading /> : (
          <div>
            <label htmlFor="name">
              Nome:
              <input
                name="inputName"
                value={ inputName }
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              name="buttonDisabled"
              disabled={ buttonDisabled }
              type="button"
              onClick={ this.saveUser }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
