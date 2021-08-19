import componentStyles from './FeedTap.module.css';
import FeedTapOrder from "../FeedTapOrder/FeedTapOrder";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/IngredientActions";

const FeedTap = ({ orders, originalIngredients }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!originalIngredients) {
      dispatch(getIngredients());
    }
  }, [dispatch, originalIngredients]);

  return (
    <div className={ componentStyles.container }>
      <div className={ `pr-2 ${ componentStyles.orderListWrapper }` }>
        { originalIngredients.length > 0 && orders && orders.map((item, index) =>
          (<div key={ item._id } className={`${index !== orders.length - 1 && 'mb-4'}`}>
            <FeedTapOrder order={ item } originalIngredients={ originalIngredients }/>
          </div>)
        ) }
      </div>
    </div>
  );
}

export default FeedTap;