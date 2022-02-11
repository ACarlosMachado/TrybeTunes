import React from 'react';
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
      </header>
    );
  }
}

export default Header;
