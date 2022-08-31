import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class search extends Component {
  state = {
    buttonDisabled: true,
    inputValue: '',
    showInput: false,
    albumArray: [],
    saveInputValue: '',
  };

  handleChange = async ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    const number = 2;
    if (value.length >= number) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  handleClick = async () => {
    this.setState({ showInput: true });

    const { inputValue } = this.state;
    const api = await searchAlbumsAPI(inputValue);

    this.setState({
      inputValue: '',
      saveInputValue: inputValue,
      albumArray: api,
      showInput: false,
    });
  };

  render() {
    const { inputValue,
      buttonDisabled,
      showInput,
      saveInputValue, albumArray } = this.state;
    return (
      <div data-testid="page-search">
        <div>
          search
          <Header />

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
              onClick={ this.handleClick }
              data-testid="search-artist-button"
            >
              Procurar

            </button>
          </label>
        </div>

        {showInput && <Loading />}
        <h1>{`Resultado de álbuns de: ${saveInputValue}`}</h1>
        {albumArray.length === 0 ? <p>Nenhum álbum foi encontrado</p>
          : (
            <div>
              {albumArray.map((album) => {
                const { collectionId, collectionName, artworkUrl100 } = album;
                return (
                  <div key={ collectionId }>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      {collectionName}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}
