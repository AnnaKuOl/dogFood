
import { useContext } from "react";
import CardList from "../../components/CardList/card-list";
import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

export const CatalogPage = () => {
  const {cards} = useContext(CardContext);
  const {isLoader} = useContext(UserContext);
  
  return (
 

    <>
      <Sort />
      <div className="content__cards">
        {isLoader ? (
          <Spinner />
        ) : (
          <CardList cards={cards}/>
        )}
      </div>
    </>
    
  );
};
