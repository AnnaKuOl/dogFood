import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { VALIDATE_CONFIG} from "../../utils/constans";
import Form from "../Form/form";
import { FormButton } from "../FormButton/form-button";
import FormInput from "../FormInput/form-input";
import Rating from "../Rating/rating";


export const FormReview = ({title="Отзыв о товаре", productId, setProduct}) => {
  const { register, handleSubmit, reset, formState: { errors }  } = useForm({ mode: "onBlur" });   
  const [rating, setRating] = useState(1);    
  const sendReviewApi = (data) => {
    console.log({...data, rating});
    console.log(textReview);
    api.addReview(productId, {...data, rating})
        .then((updateProduct)=>{
            setProduct && setProduct(updateProduct);
            reset();
            


    })
    

  };
  const textReview = register("text", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    }
  });


  return (
    <Form title={title} handleFormSubmit={handleSubmit(sendReviewApi)}>
        <Rating rating={rating} setRating={setRating} isEditable />
        <FormInput
        {...textReview}
        id="text"
        typeinput="textarea"
        type="text"
        placeholder="Текст вашего отзыва"
        />
        {errors?.text && (
            <p className="errorMessage">{errors?.text?.message}</p>
        )}

      
      <FormButton type="submit" color="yellow">Отправить отзыв</FormButton>
      
    </Form>
  );
};
