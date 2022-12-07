import { useNavigate } from "react-router-dom"
import { ButtonBack } from "../ButtonBack/button-back";
import s from "./index.module.css"

export const ContentHeader =({children, title})=>{
 const navigate = useNavigate()
    return(
        <div >
            <ButtonBack navigate= {navigate}/>
            <h1 className={s.title}>{title}</h1>
            {children}
        
    </div>

    )
}