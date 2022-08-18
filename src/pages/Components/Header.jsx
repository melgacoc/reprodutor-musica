import React from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../Components/Loading';

class Header extends React.Component{
  state = {
    user: {},
    loading: false,
  }

  async componentDidMount() {
    const {
      user } = this.state;

    this.setState({
      loading: true,
    }, async () =>{
        const getUserFromApi = await getUser();

      this.setState({
        user: getUserFromApi,
        loading: false,
      })
    });
    console.log(user)
  }

  render() {
    const {
      user,
      loading } = this.state
    return (
      <header data-testid="header-component">
        {
          loading === false ?(
            <p data-testid="header-user-name"
             value={ user.name }>
            </p>
          ) : (
            <Loading />
          )
        }
    </header>
    )
  }
}


export default Header;
