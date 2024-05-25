import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import './Header.css'; 
import { useAppContext } from '../../store/app-context/app-context';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';

const Header: React.FC = () => {
  const { logOut } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate(ROUTES.LOGIN.path);
    } catch (e) {
      console.log("error logout");
    }
  };

    return (
        <div className="topbar">
            <div className="logo">
                <Link to={ROUTES.HOME.path}>MoviesDB</Link>
                <img src={logo} alt="MoviesDB Logo" className="logo-img" />
            </div>
            <nav>
              <ul className="routes">
                  <li>
                      <Link to={ROUTES.HOME.path}>Home</Link>
                  </li>
                  <li>
                      <Link to={ROUTES.POPULAR.path}>Popular</Link>
                  </li>
                  <li>
                      <Link to={ROUTES.TOP_RATED.path}>Top Rated</Link>
                  </li>
                  <li>
                      <Link to={ROUTES.NOW_PLAYING.path}>Now Playing</Link>
                  </li>
                  <li>
                      <Link to={ROUTES.FAVORITES.path}>Favorites</Link>
                  </li>
              </ul>
            </nav>
            <nav>
              <ul className='auth-routes'>
                <li className='auth-routes-btn'>
                  <button className='text-white' onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>
        </div>
    );
}

export default Header;
