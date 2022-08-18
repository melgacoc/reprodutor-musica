import React from 'react';
// import { Route } from 'react-router-dom';
import Header from './Components/Header';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    searchField: '',
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

  render() {
    const {
      searchField,
      isSearchButtonDisabled,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>a</p>
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
      </div>
    );
  }
}

export default Search;
