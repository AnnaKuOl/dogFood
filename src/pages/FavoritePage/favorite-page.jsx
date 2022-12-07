import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBack } from "../../components/ButtonBack/button-back";

import CardList from "../../components/CardList/card-list";
import { ContentHeader } from "../../components/ContentHeader/content-header";
import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

export const FavoritePage = () => {
  const navigate = useNavigate();
  const { favorites } = useContext(CardContext);
  const { isLoader } = useContext(UserContext);
  return (
    <>

      <div className="content__cards">
        {isLoader ? (
          <Spinner />
        ) : (
          <>
            <ContentHeader title="Избранные товары" />
            <div className="content__cards">
              <CardList cards={favorites} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
