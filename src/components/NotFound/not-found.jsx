import {ReactComponent as SadFace} from "./sadFace.svg"
import s from "./index.module.css"
import { Link } from "react-router-dom";
const NotFound =({children, title, buttonText, buttonAction}) => {
 return (
    <>
    <div className={s.notFound}>
        <h2 className={s.title}>{title}</h2>
        {children&&children}
        <SadFace  className={s.svg}/>
        {buttonAction 
            ? <a href ="#" className="btn" onClick={buttonAction}>{buttonText}</a>
            : <Link to = "/" className="btn">{buttonText}</Link>

        }
        
    </div>
        
    </>
 )
}
export default NotFound;