import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import s from "./index.module.css";
import { ReactComponent as FavoriteIcon } from "./img/ic-favorite.svg";
import { ReactComponent as LoginIcon } from "./img/login-arrow.svg";
import { CardContext } from "../../context/cardContext";

function Header({ children }) {
  const { favorites } = useContext(CardContext);
  const location = useLocation();

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link
              to="/login"
              state={{
                backgroundLocation: location,
                initialPath: location.pathname,
              }}
              className={s.btnLogin}
            >
              <LoginIcon className={s.login} />
            </Link>
            <Link to="/favorites" className={s.favoritesLink}>
              <FavoriteIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
