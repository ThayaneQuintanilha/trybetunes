import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Album from './pages/Album';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <Login />
        <Search />
        <Album />
        <Favorites />
        <Profile />
        <ProfileEdit />
        <NotFound />
      </BrowserRouter>
    );
  }
}

export default App;
