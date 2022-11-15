export const isLiked = (likes, userID) => likes.some( (id) => id === userID ); //функция проверяет есть или id текущего пользователя в массиве c id пользователей, которые лайкнули данный продукт. Возвращает true/false
export const calcDiscountPrice = (price, discount) =>{
    return Math.round(price - price*discount/100);} //расчет цены со скидкой