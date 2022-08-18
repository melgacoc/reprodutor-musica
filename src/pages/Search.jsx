import React from 'react';
// import { Route } from 'react-router-dom';
import Header from './Components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <p>a</p>
        <div>
          <input type="search" name="" id="" />
        </div>
      </div>
    );
  }
}

export default Search;
