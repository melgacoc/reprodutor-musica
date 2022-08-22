import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Components/Header';
import Loading from './Components/Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      isSearchButtonDisabled: true,
      artist: '',
      loadind: false,
      resultRender: false,
      searchField: '',
    };
  }

  isSearchButtonDisabled1 = () => {
    const {
      searchField } = this.state;
    const number = 1;
    const verifyInput = searchField.length <= number;
    // verificar caracteres especiais

    this.setState({
      isSearchButtonDisabled: verifyInput,
    });
    console.log(searchField);
  }

  searchInput = (event) => {
    event.preventDefault();
    this.setState({
      searchField: event.target.value,
    }, () => {
      this.isSearchButtonDisabled1();
    });
  }

  onSearchButton = (event) => {
    event.preventDefault();
    const {
      searchField } = this.state;

    this.setState({
      loadind: true,
      artist: searchField,
      searchField: '',
      isSearchButtonDisabled: true,
    }, async () => {
      const awaitResult = await searchAlbumsAPI(searchField);

      this.setState({
        loadind: false,
        searchResult: awaitResult,
        resultRender: true,
      });
    });
  }

  render() {
    const {
      searchField,
      isSearchButtonDisabled,
      loadind,
      resultRender,
      artist,
      searchResult } = this.state;
    return (
      <div data-testid="page-search">
        <div>
          <Header />
        </div>
        {
          loadind === true ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div>
              <input
                data-testid="search-artist-input"
                type="text"
                name="searchField"
                id="searchField"
                value={ searchField }
                placeholder="Nome do Artista"
                onChange={ this.searchInput }
              />
              <button
                data-testid="search-artist-button"
                disabled={ isSearchButtonDisabled }
                onClick={ this.onSearchButton }
                type="submit"
              >
                Pesquisar
              </button>
            </div>
          )
        }
        {
          resultRender === true ? (
            <div>
              <h4>
                Resultado de álbuns de:
                {' '}
                { artist }
              </h4>
              {
                searchResult.map((element, index) => (
                  <div key={ index }>
                    <Link
                      data-testid={ `link-to-album-${element.collectionId}` }
                      to={ `/album/${element.collectionId}` }
                    >
                      <img
                        src={ element.artworkUrl100 }
                        alt="Álbum cover"
                      />
                    </Link>
                    <p>
                      { element.collectionName }
                    </p>
                    <p>
                      { element.artistName }
                    </p>
                    <br />
                  </div>
                ))
              }
            </div>
          ) : (null)
        }
        {
          searchResult.length === 0 ? (
            <div>
              <h3>
                Nenhum álbum foi encontrado
              </h3>
            </div>
          ) : (null)
        }
      </div>
    );
  }
}

export default Search;
