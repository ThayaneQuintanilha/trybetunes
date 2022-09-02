import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    album: [],
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    await this.favoriteList();
    await this.handleChange();
  }

  handleClick = async (object) => {
    this.setState({ loading: true }, async () => {
      await addSong(object);
      await this.favoriteList();
      this.setState({ loading: false });
    });
  };

  favoriteList = async () => {
    const apiFavorite = await getFavoriteSongs();
    this.setState({ favorites: apiFavorite });
  };

  handleChange = async () => {
    const { match: { params: { id } } } = this.props;
    const apiMusic = await getMusics(id);
    this.setState({
      album: apiMusic,
    });
  };

  render() {
    const { album, loading, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        {album.length > 0
        && (
          <div>
            <img src={ album[0].artworkUrl100 } alt={ album[0].artistName } />
            <h1 data-testid="album-name">{ album[0].collectionName }</h1>
            <h2 data-testid="artist-name">{ album[0].artistName }</h2>
          </div>)}

        {/* Ajuda do Thiago Lopes Tribo A no map */}
        {album.map((albums, index) => (index > 0 && (<MusicCard
          key={ index }
          previewUrl={ albums.previewUrl }
          trackName={ albums.trackName }
          trackId={ albums.trackId }
          albums={ albums }
          handleClick={ this.handleClick }
          favoriteList={ this.favoriteList }
          favorites={ favorites }
        />)))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};
