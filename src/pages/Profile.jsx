import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Components/Header';
import Loading from './Components/Loading';

class Profile extends React.Component {
  state = {
    loading: false,
    profile: {},
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getUser();
      this.setState({
        loading: false,
        profile: result,
      });
    });
  }

  render() {
    const {
      loading,
      profile: {
        name,
        image,
        email,
        description,
      } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? (
            <Loading />
          ) : (
            <div>
              <img
                src={ image }
                alt={ name }
                data-testid="profile-image"
              />
              <nav>
                <Link
                  to="/profile/edit"
                >
                  <button
                    type="button"
                  >
                    Editar perfil
                  </button>
                </Link>
              </nav>
              <p>
                {name}
              </p>
              <p>
                {name}
              </p>

              <p>
                { email }
              </p>
              <p>
                Descrição:
              </p>
              <p>
                { description }
              </p>

            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
