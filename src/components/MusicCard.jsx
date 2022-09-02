import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      trackId,
      albums,
      favoriteList,
      handleClick, favorites } = this.props;
    return (

      <div>
        <section>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="checkbox">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              onClick={ async () => {
                await handleClick(albums);
                await favoriteList();
              } }
              defaultChecked={ favorites.length > 0 && (
                favorites.some((songs) => songs.trackId === albums.trackId)
              ) }
            />
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  albums: PropTypes.shape().isRequired,
  favoriteList: PropTypes.shape().isRequired,
  handleClick: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
