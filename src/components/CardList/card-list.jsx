import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Card from "../Card/card";
import NotFound from "../NotFound/not-found";
import "./index.css";

const CardList = ({ cards }) => {
  const navigate = useNavigate();
  const { isLoader } = useContext(UserContext);

  return (
    <>
      {!cards.length && !isLoader && (
        <NotFound
          title="По вашему запросу ничего не найдено"
          buttonText="Назад"
          buttonAction={() => {
            navigate(-1);
          }}
        />
      )}

      <div className="cards">
        {cards.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardList;
