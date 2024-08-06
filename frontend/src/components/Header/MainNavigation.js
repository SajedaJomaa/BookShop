import React, { useState, useEffect } from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

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
            <svg xmlns="http://www.w3.org/2000/svg" width="2.34rem" height="2rem" viewBox="0 0 28 24">
              <path fill="#FFD700" d="M2.61 0h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22m0 9.39h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22m0 9.391h22.431a2.61 2.61 0 1 1 0 5.22H2.61a2.61 2.61 0 1 1 0-5.22" />
            </svg>
          </button>

          <nav className={`${classes.dropdownmenu} ${isMenuOpen ? classes.active : ''}`}>
            <ul>
              <li>
                <NavLink className={classes.textLink} to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 16 16">
                    <path fill="#FFD700" d="M8.687 1.262a1 1 0 0 0-1.374 0L2.469 5.84A1.5 1.5 0 0 0 2 6.931v5.57A1.5 1.5 0 0 0 3.5 14H5a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2.5A1.5 1.5 0 0 0 11 14h1.5a1.5 1.5 0 0 0 1.5-1.5V6.93a1.5 1.5 0 0 0-.47-1.09z" />
                  </svg>Home
                </NavLink>
              </li>
              {!token && (
                <li>
                  <NavLink to="/auth?mode=login" className={classes.textLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
                      <path fill="#FFD700" fillRule="evenodd" d="M1.625 12c0 .414.336.75.75.75h10.973l-1.961 1.68a.75.75 0 1 0 .976 1.14l3.5-3a.75.75 0 0 0 0-1.14l-3.5-3a.75.75 0 1 0-.976 1.14l1.96 1.68H2.376a.75.75 0 0 0-.75.75" clipRule="evenodd" />
                      <path fill="#FFD700" d="M9.375 9.75h.378a2.25 2.25 0 0 1 3.586-2.458l3.5 3a2.25 2.25 0 0 1 0 3.416l-3.5 3a2.25 2.25 0 0 1-3.586-2.458h-.378V16c0 2.828 0 4.243.879 5.121c.878.879 2.293.879 5.121.879h1c2.828 0 4.243 0 5.121-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C20.618 2 19.203 2 16.375 2h-1c-2.828 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121z" />
                    </svg>Login
                  </NavLink>
                </li>
              )}
              {token && (
                <li>
                  <NavLink to="/purchasedBooks" className={classes.textLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
                      <path fill="#FFD700" fillRule="evenodd" d="M8.418 3.25c.28-.59.884-1 1.582-1h4c.698 0 1.301.41 1.582 1c.683.006 1.216.037 1.692.223a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.742 2.722l.28.841l.024.03c.901 1.154.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91c-.858-3.431-1.287-5.147-.386-6.301l.024-.03l.28-.841l.742-2.722c.237-.871.41-1.505.776-1.999a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.176.237-.28.568-.57 1.635l-.57 2.089C6.384 9 7.778 9 9.684 9h4.631c1.907 0 3.3 0 4.32.18l-.569-2.089c-.29-1.067-.394-1.398-.57-1.635a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998" clipRule="evenodd" />
                    </svg>Purchased
                  </NavLink>
                </li>
              )}
              {token && (
                <li>
                  <Form action="/logout" method="post">
                    <button className={classes.textLink}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="#FFD700" fill-rule="evenodd" d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75" clip-rule="evenodd" /><path fill="#FFD700" d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121C20.617 2 19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121" /></svg>Logout
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

