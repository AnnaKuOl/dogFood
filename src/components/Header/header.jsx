
import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import s from "./index.module.css";
import {ReactComponent as FavoriteIcon} from "./img/ic-favorite.svg"
import {ReactComponent as LoginIcon} from "./img/login-arrow.svg"
import { CardContext } from "../../context/cardContext";

function Header({children, onUpdateUser, setIsActiveModalForm }) {
  const userCurrent = useContext(UserContext);
  const {favorites} = useContext(CardContext)
  // const handleupDateUser = (e) => {
  //   e.preventDefault();
  //   onUpdateUser({name: 'Anna Kurashko', about: 'student'})
  // }
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__wrapper}>
            {children}
            <div className={s.iconsMenu}>
              <button className={s.btnLogin} onClick={()=>{setIsActiveModalForm(true)}}>
                <LoginIcon className={s.login}/>
              </button>
              <Link to="/favorites" className={s.favoritesLink}>               
                <FavoriteIcon/>
                {favorites.length!==0 &&
                  <span className={s.iconBubble}>{favorites.length}</span>
                }


              </Link>
            </div>
                        
        </div>        
      </div>
    </header>
    
    
  );
}

export default Header;
