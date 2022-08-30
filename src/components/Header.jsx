import React, { Component } from 'react';
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
        {loading ? <Loading /> : (<h1 data-testid="header-user-name">{userObj}</h1>)}
      </header>
    );
  }
}
