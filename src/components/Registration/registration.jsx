import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  VALIDATE_CONFIG,
} from "../../utils/constans";
import Form from "../Form/form";
import { FormButton } from "../FormButton/form-button";
import FormInput from "../FormInput/form-input";

export const Registration = ({ style }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const location = useLocation();
  const initialPath = location.state?.initialPath;
  const navigate = useNavigate();
  const sendRegisterApi = (data) => {
    console.log(data);
    navigate("/");
  };
  const handleClickLoginButton = (e) => {
    e.preventDefault();
    navigate("/login", {
      replace: true,
      state: { backgroundLocation: location, initialPath },
    });
  };
  const emailRegister = register("email", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.emailMessage,
    },
  });
  const passwordRegister = register("password", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASSWORD_REGEXP,
      message: VALIDATE_CONFIG.passwordMessage,
    },
  });

  return (
    <Form title="Регистрация" handleFormSubmit={handleSubmit(sendRegisterApi)}>
      <FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder="email"
      />
      {errors?.email && (
        <p className="errorMessage">{errors?.email?.message}</p>
      )}

      <FormInput {...passwordRegister} type="password" placeholder="Пароль" />

      {errors?.password && (
        <p className="errorMessage">{errors?.password?.message}</p>
      )}

      <p className="infoText">
        Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
        конфиденциальности и соглашаетесь на информационную рассылку.
      </p>
      <FormButton type="submit" color="yellow">
        Зарегистрироваться
      </FormButton>
      <FormButton type="submit" color="white" onClick={handleClickLoginButton}>
        Войти
      </FormButton>
    </Form>
  );
};
