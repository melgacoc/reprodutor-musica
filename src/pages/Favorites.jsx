import React from 'react';
import MusicCard from './Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Components/Loading';
import Header from './Components/Header';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      loading: false,
    };
    this.attList = this.attList.bind(this);
  }

  componentDidMount() {
    this.attList();
  }

  async attList() {
    this.setState({
      loading: true,
    });
    const attFavorites = await getFavoriteSongs();
    return this.setState({
      loading: false,
      favorites: attFavorites,
    });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div>
        <Header />
        {
          loading ? (
            <Loading />
          ) : (
            <div data-testid="page-favorites">
              <MusicCard
                musics={ favorites }
                attList={ this.attList }
              />
            </div>
          )
        }
      </div>
    );
  }
}

Favorites.propTypes = {
};

export default Favorites;
