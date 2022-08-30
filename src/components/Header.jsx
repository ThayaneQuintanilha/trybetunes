import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    userObj: '',
    loading: true,
  };

  async componentDidMount() {
    const getUser2 = await getUser();
    this.setState({
      userObj: getUser2.name,
      loading: false,
    });
  }

  render() {
    const { userObj, loading } = this.state;
    return (

      <header data-testid="header-component">

        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
        {loading ? <Loading /> : (<h1 data-testid="header-user-name">{userObj}</h1>)}
      </header>
    );
  }
}
