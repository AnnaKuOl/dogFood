import cn from "classnames";
import "./index.css";


const Modal = ({ active, setActive, children})=> {
    return (
        <div className={cn("modal", {['active']: active})} onClick = {()=>{setActive(false)}}>
            <div className={cn("modal_content", {['active']: active})} onClick = {e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal;