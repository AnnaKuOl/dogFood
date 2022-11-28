
import { useContext } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/not-found";
import Product from "../../components/Product/product";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { useApi } from "../../hooks/useApi";
import api from "../../utils/api";



export const ProductPage = () => {

  const {id} = useParams();
  const {handleLiked: handleProductLike} = useContext(CardContext); 
  const handleGetProduct = useCallback((() =>  api.getProductbyId(id)), [id]) 
  const {data: product, setData: setProduct, error: errorState, loading: isLoader} = useApi(handleGetProduct);

 
  const handleLiked = useCallback(() => {

    handleProductLike(product).then((updateProduct) => {
            setProduct(updateProduct);
        });
  }, [product, handleProductLike, setProduct ]);

  return (
    <>

        <div className="content__cards">
            {isLoader 
            ? <Spinner /> 
            : !errorState && <Product {...product} onProductLike = {handleLiked}/>
            } 

            {!isLoader && errorState && <NotFound title={errorState} buttonText ="На главную"/>}

            
        </div>

    </>
  );
};
