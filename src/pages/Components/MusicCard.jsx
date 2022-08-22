import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    // favorites: [],
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
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
          />
        </label>

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
