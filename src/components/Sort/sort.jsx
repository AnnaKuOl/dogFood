import "./index.css";
import cn from "classnames";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";

const Sort = () => {
  const tabs = [
    {
      id: "low",
      title: "Сначало дорогие",
    },
    {
      id: "cheap",
      title: "Сначало дешевые",
    },
    {
      id: "sale",
      title: "По скидке",
    },
  ];
  const { currentSort, sortedData, setCurrentSort } = useContext(CardContext);
  const handleClick = (e, tab) => {
    e.preventDefault();
    setCurrentSort(tab.id);
    sortedData(tab.id);
  };

  return (
    <>
      <div className="sort content__sort">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn("sort__link", {
              sort__link_selected: currentSort === tab.id,
            })}
            id={tab.id}
          >
            <a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sort;
