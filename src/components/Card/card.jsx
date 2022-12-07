import "./index.css";
import cn from "classnames";
import { ReactComponent as Save } from "./save.svg";
import { calcDiscountPrice, isLiked } from "../../utils/product";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import ContentLoader from "react-content-loader";
// import save from "./save.svg";

const Card = ({
  name,
  discount,
  _id,
  likes,
  wight,
  description,
  pictures,
  price,
}) => {
  const { userCurrent, isLoader } = useContext(UserContext);
  const { handleLiked: onLiked } = useContext(CardContext);
  const newPrice = calcDiscountPrice(price, discount);
  const isLike = isLiked(likes, userCurrent?._id); // есть лайк или нет
  const handleLiked = () => {
    onLiked({ _id, likes });
  };


  return (
    <>
    
          <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
              {discount !== 0 && (
                <span className="card__discount">-{discount}%</span>
              )}
            </div>
            <div className="card__sticky card__sticky_type_top-right">
              <button
                className={cn("card__favorite", {
                  "card__favorite-active": isLike,
                })}
                onClick={handleLiked}
              >
                <Save className="card__favorite-icon" />
              </button>
            </div>
            <Link to={`/product/${_id}/#`} className="card__link">
              <img src={pictures} alt={description} className="card__image" />
              <div className="card__desc">
                <span
                  className={discount !== 0 ? "card__old-price" : "card__price"}
                >
                  {price}&nbsp;₽
                </span>
                {discount !== 0 && (
                  <span className="card__price card__price_type_discount">
                    {newPrice}&nbsp;₽
                  </span>
                )}
                <span className="card__wight">{wight}</span>
                <p className="card__name">{name}</p>
              </div>
            </Link>
            <a href="#" className="card__cart btn btn_type_primary">
              Добавить в корзину
            </a>
          </div>
      
    </>
  );
};

export default Card;
