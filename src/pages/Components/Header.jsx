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
    const {
      user } = this.state;

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
              { `Bem vindo ${user.name}` }
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
            Buscar música ou artista
          </Link>
          <br />
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>
          <br />
          <Link
            data-testid="link-to-profile"
            to="/profile"
          >
            Meu perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
