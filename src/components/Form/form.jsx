import { useState } from "react";
import "./index.css"
const Form = ({serializeCb}) => {
    const [formData, setFormData]= useState({
        name: "",
        lastname: "",
        phone: ""
    })
    const handleChange =(event)=>{
        setFormData({...formData, [event.target.name] : event.target.value})
    }
    const handleFormSubmit = (event) =>{
        event.preventDefault();
        serializeCb(formData);
        setFormData({
            name: "",
            lastname: "",
            phone: ""
        })
    }
    return (
        <>
            <h3>Введите данные</h3>
            <form onSubmit={handleFormSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value = {formData.name} 
                    onChange = {handleChange}/>
                    
                <input 
                    type="text"
                    name="lastname"
                    placeholder="Фамилия" 
                    value = {formData.lastname}
                    onChange = {handleChange}/>
                <input 
                    type="tel"
                    name="phone"
                    placeholder="Номер телефона"
                    value = {formData.phone} 
                    onChange = {handleChange}/>
                <button>Отправить</button>
            </form>
            
        </>


    )
}
export default Form;