
import s from "./index.module.css";

function Header({children, user, onUpdateUser}) {
  const handleupDateUser = (e) => {
    e.preventDefault();
    onUpdateUser({name: 'Anna Kurashko', about: 'student'})
  }
  return (
    <header className={s.header}>
      <div className="container">
        {user?.email && <span>{user?.email}</span>}
        {user?.name && <span>{user?.name}</span>}
        {/* <button className="btn" onClick = {handleupDateUser}>Изменить</button> */}
        <div className={s.wrapper}>
            {children}
        </div>        
      </div>
    </header>
    
    
  );
}

export default Header;
