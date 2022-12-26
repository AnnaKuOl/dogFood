import { forwardRef } from "react";
import s from "./index.module.css";
import cn from "classnames";

const FormInput = forwardRef((props, ref) => {
  return(
    
      props.typeinput === 'textarea'
      ? <textarea className={cn(s.input, s.textarea)} ref={ref} {...props} />

      : <input className={s.input} ref={ref} {...props} />
    

    ) 

    
});
export default FormInput;
