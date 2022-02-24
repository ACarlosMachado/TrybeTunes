import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import '../css/Header.css';

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
      <header data-testid="header-component" className="header">
        { loading
          ? <Loading />
          : <h3 data-testid="header-user-name" className="userName">{userName}</h3>}
        <section id="nav">
          <Link to="/search" data-testid="link-to-search" className="search">
            <h4 className="searchText">
              Pesquisa
            </h4>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites" className="musics">
            <h4>
              Músicas
            </h4>
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="profile">
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
