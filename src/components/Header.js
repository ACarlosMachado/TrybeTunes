import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',

    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const getUserName = await getUser();
    this.setState({ loading: false, userName: getUserName.name });
  }

  render() {
    const {
      loading,
      userName,
    } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : <p data-testid="header-user-name">{userName}</p>}
        <section>
          <Link to="/search" data-testid="link-to-search">
            <h4>
              Pesquisa
            </h4>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <h4>
              Músicas
            </h4>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <h4>
              Perfil
            </h4>
          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
