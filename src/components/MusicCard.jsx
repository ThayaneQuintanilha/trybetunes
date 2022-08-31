import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    await this.handleClick();
  }

  handleClick = () => {
    const { trackId } = this.props;
    this.setState({ loading: true }, async () => {
      await addSong(trackId);
      this.setState({ loading: false });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
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
          {loading && <Loading />}
          <label htmlFor="checkbox">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              onClick={ this.handleClick }
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
};
