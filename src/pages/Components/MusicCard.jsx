import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // Vnicius me ajudou no componente e na handleClick
  async componentDidMount() {
    const recovered = await getFavoriteSongs();
    this.setState({ favorites: recovered });
  }

  async handleClick(music) {
    // lógica req 11
    const { attList } = this.props;
    const { favorites } = this.state;
    if (favorites.some((fav) => (
      fav.trackId === music.trackId
    ))) {
      this.setState({
        loading: true,
      });
      await removeSong(music);
      // atualiza no favorites
      await attList();
      const attFavorites = favorites.filter((element) => (
        element.trackId !== music.trackId
      ));
      return this.setState({
        loading: false,
        favorites: attFavorites,
      });
    }
    // lógica req 8
    this.setState({
      loading: true,
    }, async () => {
      await addSong(music);
      this.setState({
        loading: false,
        favorites: [...favorites, music],
      });
    });
  }

  render() {
    const { loading, favorites } = this.state;
    const { musics } = this.props;
    return (
      <div>
        {
          loading ? (
            <Loading />
          ) : (
            <div>
              {musics.map((music) => {
                const { trackName, trackId, previewUrl } = music;
                return (
                  <div key={ trackId }>
                    <h1>
                      { trackName }
                    </h1>
                    <audio data-testid="audio-component" src={ previewUrl } controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <label
                      htmlFor={ `checkbox-music-${trackId}` }
                      data-testid={ `checkbox-music-${trackId}` }
                    >
                      Favorita
                      <input
                        type="checkbox"
                        onChange={ (event) => this.handleClick(music, event) }
                        id={ `checkbox-music-${trackId}` }
                        checked={ favorites.some((fav) => (
                          fav.trackId === music.trackId
                        )) }
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  attList: PropTypes.func,
};

MusicCard.defaultProps = {
  attList: () => {},
};

export default MusicCard;
