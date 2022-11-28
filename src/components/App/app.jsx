import { useCallback, useEffect, useState } from "react";
import CardList from "../CardList/card-list";
import Footer from "../Footer/footer";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import Header from "../Header/header";
import Sort from "../Sort/sort";
import SearchInfo from "../SearchInfo/search-info";
import "./index.css";
// import data from "../../assets/data.json";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../Spinner";
import { isLiked } from "../../utils/product";
import { CatalogPage } from "../../pages/CatalogPage/catalog-page";
import { ProductPage } from "../../pages/ProductPage/product-page";
import { Route, Routes, ScrollRestoration } from "react-router-dom";
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";

function App() {
  const [cards, setCards] = useState([]); //состояние карточек
  const [searchQuery, setSearchQuery] = useState(""); // состояние поискового запроса
  const [userCurrent, setUserCurrent] = useState(null); ///состояние текущего пользователя
  const [isLoader, setIsLoader] = useState(true); // состояние спиненра
  const debounceSearchQuery = useDebounce(searchQuery, 500); // задержка отправки поискового запроса

  
  /* Функция отправки поискового запроса на север  */

  const handleRequest = useCallback(() => {
    setIsLoader(true);
    api.search(searchQuery)
      .then((newCards) => {
        setCards(newCards)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoader(false);
      });
  }, [searchQuery]);

  useEffect(() => {
    setIsLoader(true); //запуск спинера навремя отправки на сервер запроса и получения ответа
    Promise.all([api.getProductsList(), api.getUserInfo()]) // промис для объединения запросов на текущего пользователя и каталог карточек
      .then(([cardsData, userInfo]) => {
        setUserCurrent(userInfo); // установление состояния текущего пользователя исходя из ответа сервера
        setCards(cardsData.products); // установление состояния карточек продукта
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoader(false); //отключение спинера
      });
  }, []);
  /* Поиск в реальном времени */
  useEffect(() => {
    // установка зависимости отправки поискового запроса на сервер от функции задержки по заданному времени
    handleRequest();
  }, [debounceSearchQuery]);
  /* функция для отмены действий по уолчания для отпрвки данных по сабмиту при отправку поискового запроса */
  const handleFormSubmit = (searchText) => {
    setSearchQuery(searchText);
    handleRequest();
  };

  /* функция устанвоки значения инпута поиска в состояние поискового запроса */
  const handleChangeInput = (inputVal) => {
    console.log(inputVal)
    setSearchQuery(inputVal);
    console.log(searchQuery)
  };
  /* функция изменения данных пользователя */
  const handleUserUpdate = (userUpdate) => {
    api
      .setUserInfo(userUpdate) //отправка запроса на сервер
      .then((newUserData) => {
        setUserCurrent(newUserData); // изменение состояния пользователя
      })
      .catch((err) => console.log(err));
  };
  /* функция по  изменению лайков на продукте с учетом пользователя, который их проставляет*/
  const handleLiked = useCallback((product) => {
    const isLike = isLiked(product.likes, userCurrent?._id); // устанавливает значение true/false в зависимости от того лайкал ли это пользователь это товар или нет

    return  api.changeLikePoduct(product._id, isLike) // отправка измененений по лайкам на сервер
      .then((upDateCard) => {
        const newProducts = cards.map((card) => {       
          return card._id === upDateCard._id ? upDateCard : card;
        })
        setCards(newProducts); 
        return upDateCard;
       })
       
      }, [userCurrent, cards]);

  return (
    <UserContext.Provider value={userCurrent}>
    <CardContext.Provider value ={{handleLiked, cards}} >
      <Header onUpdateUser={handleUserUpdate}>
        <>
          <Logo className="logo logo__place-header" />
          <Search 
            handleChangeInput ={handleChangeInput} 
            handleFormSubmit= {handleFormSubmit}/>
        </>
      </Header>

      <main className="container content">
        

        <Routes>
          <Route  path="/" element={
              <>
              <SearchInfo searchText={searchQuery} />
              <CatalogPage
                isLoader={isLoader}

              /></>
              
            }
          />
          <Route 
            path="/product/:id"
            element={
              <ProductPage isLoader={isLoader} />
            }
          />
          <Route path="*" element={
            <NotFoundPage/>
          }/>
        </Routes>
      </main>
      <Footer />
      </CardContext.Provider> 
    </UserContext.Provider>
  );
}

export default App;
