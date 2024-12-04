import React, { useState, useEffect } from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import menuIcon from '../../assets/menuIcon.svg';
import homeIcon from '../../assets/homeIcon.svg';
import LoginIcon from '../../assets/LoginIcon.svg';
import purchasedIcon from '../../assets/purchasedIcon.svg';
// import logoutIcon from '../../assets/logoutIcon.svg';
import classes from './MainNavigation.module.css';

export default function Header() {
  const token = useRouteLoaderData('root');
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 768);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={isMenuOpen ? classes.active : ''}>
        <div>
          <button className={classes.bars} onClick={toggleMenu}>
            <img src={menuIcon} alt="Menu Icon" width="30" height="30" />
          </button>

          <nav className={`${classes.dropdownmenu} ${isMenuOpen ? classes.active : ''}`}>
            <ul>
              <li>
                <NavLink className={classes.textLink} to="/">
                  <img src={homeIcon} alt="Menu Icon" width="30" height="30" />
                  Home
                </NavLink>
              </li>
              {!token && (
                <li>
                  <NavLink to="/auth?mode=login" className={classes.textLink}>
                    <img src={LoginIcon} alt="Menu Icon" width="30" height="30" />Login
                  </NavLink>
                </li>
              )}
              {token && (
                <li>
                  <NavLink to="/purchasedBooks" className={classes.textLink}>
                    <img src={purchasedIcon} alt="Menu Icon" width="30" height="30" />
                    Purchased
                  </NavLink>
                </li>
              )}
              {token && (
                <li>
                  <Form action="/logout" method="post">
                    <button className={classes.textLink}>
                      {/* <img src={logoutIcon} alt="Menu Icon" width="30" height="30" /> */}
                    </button>
                  </Form>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

