import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // checked: false,
      loading: false,
      savedFavoriteSongs: [],
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const test = await getFavoriteSongs();
    this.setState({ loading: false, savedFavoriteSongs: test });
  }

  async handleChanges() {
    const { ...music } = this.props;
    console.log(music);
    this.setState({ loading: true });
    const result = await addSong(music);
    this.setState({ loading: false });
    console.log(result);
    this.setState((previousState) => ({
      savedFavoriteSongs: [...previousState.savedFavoriteSongs, music] }));
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, savedFavoriteSongs } = this.state;
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
            checked={ savedFavoriteSongs.some((music) => music.trackId === trackId) }
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
