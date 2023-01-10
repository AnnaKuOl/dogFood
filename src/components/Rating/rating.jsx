import cn from "classnames";
import { useEffect, useState, useCallback } from "react";
import s from "./index.module.css";
import { ReactComponent as StarIcon } from "./star.svg";

const Rating = ({ isEditable = false, rating, setRating=null, ...props }) => {

  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));
  const constructorRating = useCallback( (currentRating) => {
      const updateRating = ratingArray.map((ratingEl, index) => {
        return (
          <StarIcon
            className={cn(s.star, {
              [s.filled]: index < currentRating,
              [s.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(index + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => changeRating(index + 1)}
          />
        );
      });
      setRatingArray(updateRating);
    },
    [rating, isEditable]
  );

  const changeDisplay = (rating) => {
    if (!isEditable) return;

    constructorRating(rating);
  };
  const changeRating = (rating) => {
    if (!isEditable || !setRating) return;
    setRating(rating);
  };

  useEffect(() => {
    constructorRating(rating);
  }, [rating, constructorRating]);

  return (
    <div className={s.rating}>
      {ratingArray.map((r, i) => <span key={i}> {r}</span>)}
    </div>
  );
};
export default Rating;
