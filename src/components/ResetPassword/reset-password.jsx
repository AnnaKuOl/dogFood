import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEXP, VALIDATE_CONFIG } from "../../utils/constans";
import Form from "../Form/form";
import { FormButton } from "../FormButton/form-button";
import FormInput from "../FormInput/form-input";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();
  const sendRegisterApi = (data) => {
    console.log(data);
    navigate("/");
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

  return (
    <Form
      title="Восстановление пароля"
      handleFormSubmit={handleSubmit(sendRegisterApi)}
    >
      <p className="infoText">
        Для получения временного пароля необходимо ввести email, указанный при
        регистрации.
      </p>
      <FormInput
        {...emailRegister}
        id="email"
        type="text"
        placeholder="email"
      />
      {errors?.email && (
        <p className="errorMessage">{errors?.email?.message}</p>
      )}

      <p className="infoText">Срок действия пароля 24 часа</p>
      <FormButton type="submit" color="yellow">
        Отправить
      </FormButton>
    </Form>
  );
};
