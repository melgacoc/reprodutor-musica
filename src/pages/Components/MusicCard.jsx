import React from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
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
          <label
            htmlFor={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              type="checkbox"
              name={ `checkbox-music-${trackId}` }
              id={ trackId }
              onClick={ this.onClick }
            />
          </label>
        </audio>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
