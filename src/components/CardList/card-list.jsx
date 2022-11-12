import Card from "../Card/card";
import "./index.css";


const CardList = ({goods, onLiked, userCurrent}) => {
	return (
		<div className="cards">
			{goods.map((item)  => <Card key = {item._id} {...item} onLiked ={onLiked} userCurrent={userCurrent} />)}
		</div>
		
		
	);
};
  

export default CardList;
