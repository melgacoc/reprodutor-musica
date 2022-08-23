import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../../services/favoriteSongsAPI';
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
  // async componentDidMount() {
  // const recovered = await getFavoriteSongs();
  // this.setState({ favorites: recovered });
  // }

  async handleClick(music) {
    const { favorites } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      console.log(music);
      await addSong(music);
      console.log('linha 24 depoi da requição');
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
          loading === true ? (
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
                        onChange={ () => this.handleClick(music) }
                        name={ `checkbox-music-${trackId}` }
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
};

export default MusicCard;
