import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./index.css";

const SearchInfo = ({ searchText }) => {
  const { cards } = useContext(CardContext);

  return (
    searchText && (
      <div className="search-title">
        По вашему запросу <span>{searchText}</span> найдено{" "}
        <span>{cards.length}</span> товаров
      </div>
    )
  );
};

export default SearchInfo;
