
import CardList from "../../components/CardList/card-list";
import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";

export const CatalogPage = ({isLoader}) => {

  
  return (
    <>
      <Sort />
      <div className="content__cards">
        {isLoader ? (
          <Spinner />
        ) : (
          <CardList/>
        )}
      </div>
    </>
  );
};
