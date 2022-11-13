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


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userCurrent, setUserCurrent] = useState(null);
  const [isLoader, setIsLoader ] = useState(false);
  const debounceSearchQuery = useDebounce(searchQuery, 500)

  const handleRequest = () => {
    // const filterCards = cards.filter( item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));    
    // setCards(filterCards);
    setIsLoader(true)
    api.search(debounceSearchQuery)
      .then((newCards)=>{
        setCards(newCards)
      })
      .catch(err => console.log (err) )
      .finally(()=>{
        setIsLoader(false)
      })
  }
  useEffect(()=>{
    setIsLoader(true)
    Promise.all([api.getProductsList(), api.getUserInfo()])
      .then(([cardsData, userInfo])=>{
        setUserCurrent(userInfo)
        setCards(cardsData.products)
      } )
      .catch(err => console.log (err) )
      .finally(()=>{
        setIsLoader(false)
      })
    
  },[])
/* Поиск в реальном времени */
  useEffect(()=>{
    handleRequest();

  }, [debounceSearchQuery]);


  const handleUserUpdate = (userUpdate) =>{    
    api.setUserInfo(userUpdate)
    .then((newUserData)=>{
      setUserCurrent(newUserData)    
      
    })
    .catch(err => console.log (err) )
  }

  const handleLiked = (product) => {
    const isLiked = product.likes.some( id => id === userCurrent._id );

    api.changeLikePoduct (product._id, isLiked)
      .then ((newCard)=>{
        const newProducts = cards.map((card)=>{
          return card._id === newCard._id ? newCard : card
        })
        setCards(newProducts);

    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
    
  }
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
