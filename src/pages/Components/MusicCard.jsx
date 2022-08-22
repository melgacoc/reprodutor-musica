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
          <label
            data-testid={ `checkbox-music-${trackId}` }
            htmlFor="favorite"
          >
            Favorita
            <input
              type="checkbox"
              name="favorite"
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
