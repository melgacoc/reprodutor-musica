import React from 'react';
import PropTypes from 'prop-types';
import Header from './Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './Components/MusicCard';
import Loading from './Components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serchAlbumResult: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const awaitResult = await getMusics(id);

    this.setState({
      serchAlbumResult: awaitResult,
      loading: false,
    });
  }

  render() {
    const {
      serchAlbumResult, loading } = this.state;
     const musics = serchAlbumResult.filter((music) => music.kind === 'song');
    return (
      <div data-testid="page-album">
        {
          loading ? (
            <Loading />
          ) : (
      <div>
        <Header />
        <div>
          {
            serchAlbumResult.length > 0 ? (
              <div>
                <h2 data-testid="album-name">
                  { serchAlbumResult[0].collectionName }
                </h2>
                <h3 data-testid="artist-name">
                  { serchAlbumResult[0].artistName }
                </h3>
              </div>
            ) : (
              <p>
                a
              </p>
            )
          }
          <div>
          <MusicCard
                musics={ musics }
              />
          </div>
        </div>
      </div>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
