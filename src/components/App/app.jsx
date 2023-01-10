import { useCallback, useEffect, useState } from "react";
import Footer from "../Footer/footer";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import Header from "../Header/header";
import SearchInfo from "../SearchInfo/search-info";
import "./index.css";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { calcDiscountPrice, isLiked } from "../../utils/product";
import { CatalogPage } from "../../pages/CatalogPage/catalog-page";
import { ProductPage } from "../../pages/ProductPage/product-page";
import { Route, Routes, useLocation } from "react-router-dom";
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { FaqPage } from "../../pages/FAQPage/faq-page";
import { FavoritePage } from "../../pages/FavoritePage/favorite-page";
import Modal from "../Modal/modal";
import { Registration } from "../Registration/registration";
import { Login } from "../Login/login";
import { ResetPassword } from "../ResetPassword/reset-password";

function App() {
  const [cards, setCards] = useState([]); //состояние карточек
  const [searchQuery, setSearchQuery] = useState(""); // состояние поискового запроса
  const [userCurrent, setUserCurrent] = useState(null); ///состояние текущего пользователя
  const [isLoader, setIsLoader] = useState(true); // состояние спиненра
  const [favorites, setFavorites] = useState([]);
  const [currentSort, setCurrentSort] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 500); // задержка отправки поискового запроса
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  /* Функция отправки поискового запроса на север  */

  const handleRequest = useCallback(() => {
    setIsLoader(true);
    api
      .search(searchQuery)
      .then((newCards) => {
        setCards(newCards);
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

        const favoriteProduct = cardsData.products.filter((product) =>
          isLiked(product.likes, userInfo._id)
        );
        setFavorites(favoriteProduct);
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
    setSearchQuery(inputVal);
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
  const handleLiked = useCallback(
    (product) => {
      const isLike = isLiked(product.likes, userCurrent?._id); // устанавливает значение true/false в зависимости от того лайкал ли это пользователь это товар или нет

      return api
        .changeLikePoduct(product._id, isLike) // отправка измененений по лайкам на сервер
        .then((upDateCard) => {
          const newProducts = cards.map((card) => {
            return card._id === upDateCard._id ? upDateCard : card;
          });
          if (!isLike) {
            setFavorites((prevState) => [...prevState, upDateCard]);
          } else {
            setFavorites((prevState) =>
              prevState.filter((product) => product._id !== upDateCard._id)
            );
          }
          setCards(newProducts);
          return upDateCard;
        });
    },
    [userCurrent, cards]
  );
  /* Функция сортировки в зависимости от выбранного значения сортировки*/
  const sortedData = (currentSort) => {
    switch (currentSort) {
      case "low":
        setCards(
          cards.sort(
            (a, b) =>
              calcDiscountPrice(b.price, b.discount) -
              calcDiscountPrice(a.price, a.discount)
          )
        );
        break;
      case "cheap":
        setCards(
          cards.sort(
            (a, b) =>
              calcDiscountPrice(a.price, a.discount) -
              calcDiscountPrice(b.price, b.discount)
          )
        );
        break;
      case "sale":
        setCards(cards.sort((a, b) => b.discount - a.discount));
        break;
      default:
        setCards(
          cards.sort(
            (a, b) =>
              calcDiscountPrice(a.price, a.discount) -
              calcDiscountPrice(b.price, b.discount)
          )
        );
    }
  };
  const addContact = useCallback((dataForm) => {
    console.log(dataForm);
  }, []);

  return (
    <UserContext.Provider value={{ userCurrent, isLoader }}>
      <CardContext.Provider
        value={{
          currentSort,
          cards,
          favorites,
          handleLiked,
          sortedData,
          setCurrentSort,
        }}
      >
        <Header>
          <>
            <Logo className="logo logo__place-header" href="/" />
            <Search
              handleChangeInput={handleChangeInput}
              handleFormSubmit={handleFormSubmit}
            />
          </>
        </Header>

        <main className="container content">
          <Routes
            location={
              (backgroundLocation && {
                ...backgroundLocation,
                pathname: initialPath,
              }) ||
              location
            }
          >
            <Route
              path="/"
              element={
                <>
                  <SearchInfo searchText={searchQuery} />
                  <CatalogPage />
                </>
              }
            />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        {backgroundLocation && (
          <Routes>
            <Route
              path="/registration"
              element={
                <Modal>
                  <Registration />
                </Modal>
              }
            />
            <Route
              path="/login"
              element={
                <Modal>
                  <Login />
                </Modal>
              }
            />
            <Route
              path="/reset"
              element={
                <Modal>
                  <ResetPassword />
                </Modal>
              }
            />
          </Routes>
        )}
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
