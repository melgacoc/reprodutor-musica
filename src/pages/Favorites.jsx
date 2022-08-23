import React from 'react';
import MusicCard from './Components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Components/Loading';
import Header from './Components/Header';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const recovered = await getFavoriteSongs();
      this.setState({
        favorites: recovered,
        loading: false,
      });
    });
  }

  async handleClick(music) {
    const { favorites } = this.state;
    if (favorites.some((fav) => (
      fav.trackId === music.trackId
    ))) {
      this.setState({
        loading: true,
      });
      await removeSong(music);
      const attFavorites = favorites.filter((element) => (
        element.trackId !== music.trackId
      ));
      return this.setState({
        loading: false,
        favorites: attFavorites,
      });
    }
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div >
        <Header />
        {
          loading ? (
            <Loading />
          ) : (
            <div data-testid="page-favorites">
              <MusicCard
                musics={ favorites }
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default Favorites;
