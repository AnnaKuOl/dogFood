import { useNavigate } from "react-router-dom"
import s from "./index.module.css"

// const navigate = useNavigate();
export const ButtonBack =({navigate}) =>{
return (
    <a href="#" className={s.buttonBack}  onClick={() => navigate(-1) }>Назад</a>
)

}