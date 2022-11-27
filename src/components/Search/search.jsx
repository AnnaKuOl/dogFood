import './index.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




function Search({handleFormSubmit, handleChangeInput}) {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate('');
  const changeInputValue =(e) => {
    setInputText(e.target.value);
    handleChangeInput && handleChangeInput(e.target.value);
  }

  const handleForm = (e) =>{
    e.preventDefault();
    navigate('/')
    handleFormSubmit(inputText);

  }

  const handleClearInput = () =>{
    setInputText('');
    handleChangeInput && handleChangeInput("");
  }
  return (
    <form className='search' onSubmit={handleForm} >
      <input type="text" value ={inputText} className='search__input' placeholder='Поиск' onInput={changeInputValue}/>
      <button type = 'button' className='search__btn'>
        {inputText ?
        <>
          <CloseIcon className='search__btn_clear' onClick={handleClearInput}/>
          <SearchIcon className='search__btn_search' />
          
        </> 
        :
        <SearchIcon className='search'/>
          
        }

      </button>

      
    </form>
  
  )
}

export default Search;
 