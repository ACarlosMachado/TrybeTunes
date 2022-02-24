import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import '../css/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      loading: false,
      cardArtist: [],
      phraseErro: '',
      phraseNameArtist: false,
    };
    this.searchArtist = this.searchArtist.bind(this);
  }

  async searchArtist() {
    // const getName = document.querySelector('input').value;
    this.setState({ loading: true, phraseErro: '' });
    const { nameArtist } = this.state;
    // const result = await searchAlbumsAPI(getName);
    const result = await searchAlbumsAPI(nameArtist);
    const erroGetAlbum = 'Nenhum álbum foi encontrado';
    this.setState({ loading: false,
      cardArtist: result,
      phraseErro: erroGetAlbum,
      phraseNameArtist: true });
  }

  render() {
    const {
      loading,
      nameArtist,
      cardArtist,
      phraseErro,
      phraseNameArtist,
    } = this.state;
    const valorMinAceitavel = 2;
    const erro = phraseErro; // atribui a uma const para parar erro lint;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <section id="formArtist">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do artista"
                  onChange={ (e) => this.setState({ nameArtist: e.target.value }) }
                  className="searchArtist"
                />
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ nameArtist.length < valorMinAceitavel }
                  onClick={ this.searchArtist }
                  className="buttonSubmit"
                >
                  Pesquisar
                </button>
              </section>
            )

        }

        {
          phraseNameArtist
            ? <p className="result">{`Resultado de álbuns de: ${nameArtist} `}</p>
            : ''
        }

        { cardArtist.length === 0
          ? erro
          : cardArtist.map((artist) => (
            <div key={ artist.collectionId } className="card-artist">
              <Link
                to={ `/album/${artist.collectionId}` }
                data-testid={ `link-to-album-${artist.collectionId}` }
              >
                <h4>
                  { artist.artistName }
                </h4>
                <img
                  src={ artist.artworkUrl100 }
                  alt={ `foto de ${artist.collectionName}` }
                />
                <h5>
                  { artist.collectionName }
                </h5>
              </Link>
            </div>

          ))}
      </div>
    );
  }
}

export default Search;
