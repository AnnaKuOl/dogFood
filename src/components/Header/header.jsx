
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import s from "./index.module.css";

function Header({children, onUpdateUser}) {
  const userCurrent = useContext(UserContext)
  const handleupDateUser = (e) => {
    e.preventDefault();
    onUpdateUser({name: 'Anna Kurashko', about: 'student'})
  }
  return (
    <header className={s.header}>
      <div className="container">
        {userCurrent?.email && <span>{userCurrent?.email}</span>}
        {userCurrent?.name && <span>{userCurrent?.name}</span>}
        {/* <button className="btn" onClick = {handleupDateUser}>Изменить</button> */}
        <div className={s.wrapper}>
            {children}
        </div>        
      </div>
    </header>
    
    
  );
}

export default Header;
