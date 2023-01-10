import cn from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Modal = ({ children }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setActive(true);
  }, []);
  const onClose = () => {
    setActive(false);
    navigate(-1);
  };

  return (
    <div className={cn("modal", { ["active"]: active })} onClick={onClose}>
      <div
        className={cn("modal_content", { ["active"]: active })}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
