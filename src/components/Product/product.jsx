import s from "./index.module.css";
import cn from "classnames"
import {calcDiscountPrice} from "../../utils/product.js"
const Product = ({pictures, likes, tags, _id, name, price, discount, wight, description, reviews, currentUser }) => {
    const newPrice = calcDiscountPrice(price, discount); 
    return (
        <>
            <div>
                <a href="#" className="button-back">Назад</a>
                <h1 className={s.productTitle}>{name}</h1>
                <div>
                <span>Артикул:</span> <b>2388907</b>
                </div>
                
            </div>
            <div className={s.product}>
                <div className={s.imgWrapper}>
                    <img src={pictures} alt={name} />
                </div>
                {discount && <span className={cn(s.price, 'card__price_type_discount')}>{newPrice}&nbsp;₽</span>}
            </div>
        
        </>
    )
   
}
export default Product;