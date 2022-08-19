import { elementType } from 'prop-types';
import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Loading from './Components/Loading';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    searchField: '',
    artist:'',
    loadind: false,
    resultRender: false,
    searchResult: [],
  }

  isSearchButtonDisabled = () => {
    const {
      searchField } = this.state;
    const number = 2;
    const verifyInput = searchField.length < number;

    this.setState({
      isSearchButtonDisabled: verifyInput,
    });
  }

  searchInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      this.isSearchButtonDisabled();
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
    }, async () =>{
      const awaitResult = await searchAlbumsAPI(searchField);

      this.setState({
        loadind: false,
        searchResult: awaitResult,
        resultRender: true,
      })
    });
    
    console.log(1);
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
        loadind === true ?(
          <div>
            <Loading />
          </div>
        ) : (
          <div>
             <input
            data-testid="search-artist-input"
            type="search"
            name="searchField"
            value={ searchField }
            id=""
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
        resultRender === true ?(
          <div>
            <h4>
            Resultado de álbuns de: { artist }
          </h4>
          {
            searchResult.map((element, index) => (
              <div key={ index }>
                <Link
                data-testid={`link-to-album-${ element.collectionId }`}
                to={`/album/${ element.collectionId }`}>
                   <img src={ element.artworkUrl100 }/>
                </Link>
                <p>
                  { element.collectionName }
                </p>
                <p>
                  { element.artistName }
                </p><br/>
              </div>
            ))
          }
          </div>
        ) : (null)
      }
      {
        searchResult.length === 0 ?(
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
