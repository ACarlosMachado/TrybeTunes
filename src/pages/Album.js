import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
// import '../css/Album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      nameArtist: '',
      nameAlbum: '',
      musicList: [],
      image: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props; // Pega o id que vem pela url;
    const getAlbumInfo = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = getAlbumInfo[0];
    const musics = getAlbumInfo.slice(1); // Retorna um novo array sem o primeiro elemento;
    this.setState({
      nameArtist: artistName,
      nameAlbum: collectionName,
      musicList: musics,
      image: artworkUrl100,
    });
  }

  render() {
    const { nameAlbum, nameArtist, musicList, image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{nameArtist}</h2>
        <h3 data-testid="album-name">
          {nameArtist}
          {nameAlbum}
        </h3>
        <img url={ image } alt="foto do album" />
        <div>
          {musicList.map((music) => (
            <MusicCard key={ music.trackNumber } { ...music } />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

export default Album;
