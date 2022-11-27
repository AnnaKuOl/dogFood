
import { useContext } from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/not-found";
import Product from "../../components/Product/product";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";


export const ProductPage = ({isLoader }) => {
  const userCurrent = useContext(UserContext);
  const {handleLiked: handleProductLike} = useContext(CardContext); 
  const [product, setProduct] = useState(null);
  const {id} = useParams();
  const [errorState, setErrorState]=useState(null)
  
  
  useEffect(()=>{
    // setIsLoader(true) 
    api.getProductbyId(id)
      .then((productData)=>{

        setProduct(productData) 
      } )      
      .catch(err => setErrorState(err) )
      // .finally(()=>{
      //   setIsLoader(false) 
      // })
    
  },[])

 
  const handleLiked = useCallback(() => {

    handleProductLike(product).then((updateProduct) => {
            setProduct(updateProduct);
        });
  }, [product, handleProductLike, userCurrent ]);

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
