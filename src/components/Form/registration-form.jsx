import {useForm} from "react-hook-form";

import "./index.css"

 function RegistrationForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const cbSubmit = (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(cbSubmit)}>
            <h3 className="form-title">Регистрация</h3>
            <input 
                {...register( "name", {
                    minLength: {
                        value: 2,
                        message: "Имя пользователя не менее 2 символов"   
                    }

                })}
                type="text"               
                placeholder="Имя" />
            <div>
                {errors?.name&& <p>{errors?.name?.message}</p>}
            </div>
            <input 
                {...register( "email")}
                type="text"                
                placeholder="Email" />
            <input 
                {...register( "password", {
                    required: {
                        value: true,
                        message: "Поле пароль обязательно к заполнению"    
                    },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Пароль должен содержать не менее 8 символов: минимум 1 цифра и 1 буква латинского алфавита"
                    }

                })} 
                type="password"
                placeholder="Пароль" />
                <div>
                    {errors?.password&& <p>{errors?.password?.message}</p>}
                </div>
            <button>Отправить</button>
        </form>



    )
 }

 export default RegistrationForm;