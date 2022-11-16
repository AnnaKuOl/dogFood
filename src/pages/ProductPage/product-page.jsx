
import { useEffect, useState, useCallback } from "react";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Logo from "../../components/Logo/logo";
import Product from "../../components/Product/product";
import Search from "../../components/Search/search";

import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";

const ID_PRODUCT = '622c779c77d63f6e70967d1c';

export const ProductPage = () => {
  const [product, setProduct] = useState(null);
 
  const [userCurrent, setUserCurrent] = useState(null);
  const [isLoader, setIsLoader] = useState(true);

  const handleRequest = useCallback((searchQuery) => {
    setIsLoader(true);
    api.search(searchQuery)
      .then((newCards) => {
        console.log(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => { 
        setIsLoader(false);
      });
  }, [])

 
  useEffect(()=>{
    setIsLoader(true) 
    Promise.all([api.getProductbyId(ID_PRODUCT), api.getUserInfo()])
      .then(([productData, userInfo])=>{
        setUserCurrent(userInfo) 
        setProduct(productData) 
      } )
      .catch(err => console.log (err) )
      .finally(()=>{
        setIsLoader(false) 
      })
    
  },[])

  const handleLiked = useCallback(() => {
    const isLike = isLiked(product.likes, userCurrent?._id);
    api.changeLikePoduct(product._id, isLike)
        .then((newProduct) => {
            setProduct(newProduct);
        });
  }, [product, userCurrent]);

  return (
    <>
      <Header>
        <>
          <Logo className="logo logo__place-header" />
          <Search onSubmit={handleRequest} />
        </>
      </Header>
      <main className="container content">
        <Sort />
        <div className="content__cards">
            {isLoader 
            ? <Spinner /> 
            : <Product {...product} currentUser = {userCurrent} onProductLike = {handleLiked}/>
            } 
        </div>
      </main>
      <Footer />
    </>
  );
};
