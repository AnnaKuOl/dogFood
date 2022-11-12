import "./index.css";
import cn from 'classnames';
import {ReactComponent as Save} from "./save.svg";
// import save from "./save.svg";

const Card = ({name, discount, _id, likes, wight, description, pictures, price, userCurrent, onLiked}) => {
	const new_price = Math.round(price - price*discount/100);
	const isLiked = likes.some( (id) => id === userCurrent._id );
	function handleLiked() {
		onLiked({_id, likes});
	}
	

	return (
		<div className="card">
			<div className="card__sticky card__sticky_type_top-left">
				{discount !== 0 && <span className="card__discount">-{discount}%</span>}
			</div>
			<div className="card__sticky card__sticky_type_top-right">
			<button className={cn('card__favorite', {'card__favorite-active': isLiked})} onClick={handleLiked}>
					<Save className="card__favorite-icon"/>
				</button>
			</div>
			<a href="/product" className="card__link">
				<img src={pictures} alt={description} className="card__image"/>
				<div className="card__desc">
					<span className={discount !==0 ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>
					{discount !== 0 && <span className="card__price card__price_type_discount">{new_price}&nbsp;₽</span>}
					<span className="card__wight">{wight}</span>
					<p className="card__name">{name}</p>
				</div>
			</a>
			<a href="#" className="card__cart btn btn_type_primary">Добавить в корзину</a>
		</div>
	);
};
  

export default Card;
