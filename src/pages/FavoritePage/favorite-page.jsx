import { useContext } from "react";
import CardList from "../../components/CardList/card-list";
import { ContentHeader } from "../../components/ContentHeader/content-header";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

export const FavoritePage = () => {
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
