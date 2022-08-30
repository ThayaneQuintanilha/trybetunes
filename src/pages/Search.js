import React, { Component } from 'react';
import Header from '../components/Header';

export default class search extends Component {
  state = {
    buttonDisabled: true,
    inputValue: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    const number = 2;
    if (value.length >= number) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    const { inputValue, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        search
        <Header />
        <form>
          <label htmlFor="label">
            <input
              onChange={ this.handleChange }
              data-testid="search-artist-input"
              name="inputValue"
              value={ inputValue }
              placeholder="Nome do Artista"
            />

            <button
              type="button"
              name="inputValue"
              disabled={ buttonDisabled }
              data-testid="search-artist-button"
            >
              Procurar

            </button>
          </label>
        </form>
      </div>
    );
  }
}
