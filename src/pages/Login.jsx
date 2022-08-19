import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Components/Loading';

class Login extends React.Component {
  state = {
    name: '',
    isButtonDisabled: true,
    loading: false,
    redirection: false,
  }

  isSaveButtonDisabled = () => {
    const {
      name } = this.state;
    const number = 3;
    const verifyInput = name.length < number;

    this.setState({
      isButtonDisabled: verifyInput,
    });
  }

 loginButton = (event) => {
   this.setState({
     [event.target.name]: event.target.value,
   }, () => {
     this.isSaveButtonDisabled();
   });
 }

 onSaveButtonClick = async (event) => {
   event.preventDefault();
   const {
     name } = this.state;

   this.setState({
     loading: true,
   }, async () => {
     await createUser({ name });

     this.setState({
       loading: false,
       redirection: true,
     });
   });
 }

 render() {
   const {
     isButtonDisabled,
     name,
     loading,
     redirection } = this.state;
   return (
     <div data-testid="page-login">
       {
         loading === false ? (
           <div>
             <div>
               <input
                 data-testid="login-name-input"
                 name="name"
                 type="text"
                 onChange={ this.loginButton }
                 value={ name }
               />
               <button
                 data-testid="login-submit-button"
                 name="isButtonDisabed"
                 type="submit"
                 disabled={ isButtonDisabled }
                 onClick={ this.onSaveButtonClick }
               >
                 Entrar
               </button>
             </div>
           </div>
         ) : (
           <div>
             <Loading />
           </div>
         )
       }
       {
         redirection === true ? (
           <Redirect to="/search" />
         ) : (null)
       }
     </div>
   );
 }
}

export default Login;
