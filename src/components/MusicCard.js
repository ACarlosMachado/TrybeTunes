import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      check: false,
      loading: false,
      savedFavoriteSongs: [],
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const test = await getFavoriteSongs();
    this.setState({ loading: false, savedFavoriteSongs: test });
    const { savedFavoriteSongs } = this.state;
    console.log(`savedFavoriteSongs ===>  ${savedFavoriteSongs}`);
    const { trackId } = this.props;
    const isFavorite = savedFavoriteSongs.some((music) => music.trackId === trackId);
    if (isFavorite) {
      this.setState({ check: true });
    } else {
      this.setState({ check: false });
    }
  }

  async handleChanges() {
    const { check } = this.state;
    if (check) {
      const { ...music } = this.props;
      this.setState({ loading: true });
      await removeSong(music);
      this.setState({ loading: false, check: false });
    } else {
      const { ...music } = this.props;
      this.setState({ loading: true });
      await addSong(music);
      this.setState({ loading: false, check: true });
      this.setState((previousState) => ({
        savedFavoriteSongs: [...previousState.savedFavoriteSongs, music] }));
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, check } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            onClick={ this.handleChanges }
            checked={ check }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  music: PropTypes.objectOf(PropTypes.object).isRequired,
  trackId: PropTypes.string.isRequired,
};
