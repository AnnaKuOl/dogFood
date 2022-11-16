import './index.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';
import { useState } from 'react';




function Search({onInput, onSubmit: onSubmit}) {
  const [inputText, setInputText] = useState('');
  const changeInputValue =(e) => {
    setInputText(e.target.value);
    onInput && onInput(e.target.value);
    
  }
  const handlSearchText = (e) => {
    e.preventDefault();
    onSubmit(inputText);
    setInputText('');

  }
  const handleClearInput = () =>{
    setInputText('');
    onInput && onInput("");
  }
  return (
    <form className='search' onSubmit={handlSearchText}>
      <input type="text" value ={inputText} className='search__input' placeholder='Поиск' onInput={changeInputValue}/>
      <button type = 'button' className='search__btn'>
        {inputText ?
        <>
          <CloseIcon className='search__btn_clear' onClick={handleClearInput}/>
          <SearchIcon className='search__btn_search' onClick = {handlSearchText}/>
          
        </> 
        :
        <SearchIcon className='search'/>
          
        }

      </button>

      
    </form>
  
  )
}

export default Search;
 