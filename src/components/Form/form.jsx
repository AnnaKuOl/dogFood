import s from "./index.module.css";
import "./style.css";
const Form = ({ title, children, handleFormSubmit }) => {
  return (
    <>
      <form className={s.form} onSubmit={handleFormSubmit}>
        <h1 className={s.title}>{title}</h1>
        {children}
      </form>
    </>
  );
};
export default Form;
