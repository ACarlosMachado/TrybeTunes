import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      redirect: false,

    };
    this.getOnCLick = this.getOnCLick.bind(this);
  }

  async getOnCLick() {
    const getName = document.querySelector('input').value;
    this.setState({ loading: true });
    await createUser({ name: getName });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const {
      loading,
      name,
      redirect,
    } = this.state;
    const valorMinAceitavel = 3;
    return (
      <div data-testid="page-login">
        <Header />
        <input
          type="text"
          data-testid="login-name-input"
          placeholder="Digite seu nome"
          onChange={ (e) => this.setState({ name: e.target.value }) }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          id="btn-login"
          disabled={ name.length < valorMinAceitavel }
          onClick={ this.getOnCLick }
        >
          Entrar
        </button>
        { loading ? <Loading /> : Login }
        { redirect ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}

export default Login;
