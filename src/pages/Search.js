import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',

    };
  }

  render() {
    const { nameArtist } = this.state;
    const valorMinAceitavel = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            onChange={ (e) => this.setState({ nameArtist: e.target.value }) }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ nameArtist.length < valorMinAceitavel }
          >
            Pesquisar
          </button>
        </section>
      </div>
    );
  }
}

export default Search;
