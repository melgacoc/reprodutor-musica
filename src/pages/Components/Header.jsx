import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: {},
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const getUserFromApi = await getUser();

      this.setState({
        user: getUserFromApi,
        loading: false,
      });
    });
  }

  render() {
    const {
      user,
      loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading === false ? (
            <p data-testid="header-user-name">
              { `Welcome ${user.name}` }
            </p>
          ) : (
            <Loading />
          )
        }
        <nav>
          <Link
            data-testid="link-to-search"
            to="/search"
          >
            Find ur vibe
          </Link>
          <br />
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favs
          </Link>
          <br />
          <Link
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
