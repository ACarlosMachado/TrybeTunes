import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // checked: false,
      loading: false,
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  async handleChanges() {
    const { ...music } = this.props;
    console.log(music);
    this.setState({ loading: true });
    const result = await addSong(music);
    this.setState({ loading: false });
    console.log(result);
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
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
