import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,

    };
    this.getOnCLick = this.getOnCLick.bind(this);
  }

  async getOnCLick() {
    const getName = document.querySelector('input').value;
    this.setState({ loading: true });
    await createUser({ name: getName });
    this.setState({ loading: false });
  }

  render() {
    const {
      loading,
      name,
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
        <Link to="/search">
          <button
            type="submit"
            data-testid="login-submit-button"
            id="btn-login"
            disabled={ name.length < valorMinAceitavel }
            onClick={ this.getOnCLick }
          >
            Entrar
          </button>
        </Link>
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Login;
