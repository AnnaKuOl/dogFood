import { useEffect, useState } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Logo from "../Logo/logo";
import Search from "../Search/search";
import Header from '../Header/header';
import Sort from '../Sort/sort';
import SearchInfo from '../SearchInfo/index';
import './index.css';
// import data from "../../assets/data.json";
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import Spinner from '../Spinner';
import { isLiked } from '../../utils/product';


function App() {
  const [cards, setCards] = useState([]); //состояние карточек 
  const [searchQuery, setSearchQuery] = useState(''); // состояние поискового запроса
  const [userCurrent, setUserCurrent] = useState(null); ///состояние текущего пользователя
  const [isLoader, setIsLoader ] = useState(true); // состояние спиненра
  const debounceSearchQuery = useDebounce(searchQuery, 500) // задержка отправки поискового запроса
/* Функция отправки поискового запроса на север  */
  const handleRequest = () => {
    // const filterCards = cards.filter( item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));    
    // setCards(filterCards);
    setIsLoader(true) //запуск спинера навремя отправки на сервер запроса и получения ответа
    api.search(debounceSearchQuery) //отправка запроса
      .then((newCards)=>{
        setCards(newCards) // изменение состояния карточек исходя из ответа сервера
      })
      .catch(err => console.log (err) )
      .finally(()=>{ 
        setIsLoader(false) //отключение спинера
      })
  }
  useEffect(()=>{
    setIsLoader(true) //запуск спинера навремя отправки на сервер запроса и получения ответа
    Promise.all([api.getProductsList(), api.getUserInfo()]) // промис для объединения запросов на текущего пользователя и каталог карточек
      .then(([cardsData, userInfo])=>{
        setUserCurrent(userInfo) // установление состояния текущего пользователя исходя из ответа сервера
        setCards(cardsData.products) // установление состояния карточек продукта
      } )
      .catch(err => console.log (err) )
      .finally(()=>{
        setIsLoader(false) //отключение спинера
      })
    
  },[])
/* Поиск в реальном времени */
  useEffect(()=>{ // установка зависимости отправки поискового запроса на сервер от функции задержки по заданному времени
    handleRequest();

  }, [debounceSearchQuery]);

/* функция изменения данных пользователя */
  const handleUserUpdate = (userUpdate) =>{    
    api.setUserInfo(userUpdate) //отправка запроса на сервер
    .then((newUserData)=>{
      setUserCurrent(newUserData)    // изменение состояния пользователя
      
    })
    .catch(err => console.log (err) )
  }
/* функция по  изменению лайков на продукте с учетом пользователя, который их проставляет*/
  const handleLiked = (product) => {

    const isLike = isLiked(product.likes, userCurrent?._id);// устанавливает значение true/false в зависимости от того лайкал ли это пользователь это товар или нет
 

    api.changeLikePoduct (product._id, isLike) // отправка измененений по лайкам на сервер
      .then ((newCard)=>{ //сервер дает в ответ карточку с измененными данными
        const newProducts = cards.map((card)=>{ //создаем новый массив с карточками, в котором меняем ту карточку, которая была изменена
          return card._id === newCard._id ? newCard : card
        })
        setCards(newProducts); //устанавливаем новое состояние карточек продуктов

    })
  }
/* функция для отмены действий по уолчания для отпрвки данных по сабмиту при отправку поискового запроса */
  const handleFormSubmit = (e) => { 
    e.preventDefault();
    handleRequest();
    
  }

  /* функция устанвоки значения инпута поиска в состояние поискового запроса */
  const handleChangeInput = (inputVal) => {
    setSearchQuery(inputVal);
  }
  return (
    <>
     <Header user = {userCurrent} onUpdateUser = {handleUserUpdate} >
      <>
    
        <Logo className = "logo logo__place-header"/>
        <Search onInput = {handleChangeInput} onSubmit = {handleFormSubmit}/>
      </>

      </Header>
     <main className="container content">
        <SearchInfo searchText = {searchQuery} searchCount= {cards.length}/>
        <Sort/>
        <div className="content__cards">
          { isLoader 
            ? <Spinner/>
            : <CardList goods = {cards} onLiked ={handleLiked} userCurrent={userCurrent} />
          }
          
        </div>      
    
     </main>
     <Footer/>
     </>
  )
}

export default App;
