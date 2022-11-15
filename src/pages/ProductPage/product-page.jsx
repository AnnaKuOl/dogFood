import { useState } from "react";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Logo from "../../components/Logo/logo";
import Product from "../../components/Product/product";
import Search from "../../components/Search/search";

import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";

export const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userCurrent, setUserCurrent] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const handleRequest = () => {
    setIsLoader(true);
    api
      .search(searchQuery)
      .then((newCards) => {
        console.log(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => { 
        setIsLoader(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };
  const handleLiked = (product) => {
    const isLike = isLiked(product.likes, userCurrent?._id);

    api.changeLikePoduct(product._id, isLike)
        .then((newProduct) => {
            setProduct(newProduct);
        });
  };

  return (
    <>
      <Header>
        <>
          <Logo className="logo logo__place-header" />
          <Search onSubmit={handleFormSubmit} />
        </>
      </Header>
      <main className="container content">
        <Sort />
        <div className="content__cards">
            {isLoader 
            ? <Spinner /> 
            : <Product/>
            } 
        </div>
      </main>
      <Footer />
    </>
  );
};
