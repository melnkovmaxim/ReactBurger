import componentStyles from './FeedStatistics.module.css';
import PropTypes from "prop-types";
import { IFeedStatisticsProps } from "../../interfaces/components/FeedStatistics/IFeedStatisticsProps";

const FeedStatistics = ({ orders, total, totalToday }: IFeedStatisticsProps): JSX.Element => {
  return (
    <div className={ componentStyles.container }>
      <div className={ componentStyles.currentOrders }>
        <div className={ componentStyles.orders }>
          <p className="pb-6 text text_type_main-medium">Готовы:</p>
          { orders.filter(order => order.status === "done").slice(0, 9).map(doneOrder =>
              (<p key={doneOrder._id} className={ `pb-2 text text_type_digits-default ${ componentStyles.readyOrder }` }>{ doneOrder.number }</p>)
          )}
        </div>
        <div className="pl-9"/>
        <div className={ componentStyles.orders }>
          <p className="pb-6 text text_type_main-medium">В работе:</p>
          { orders.filter(order => order.status === "pending").slice(0, 9).map(createdOrder =>
            (<p key={createdOrder._id} className="pb-2 text text_type_digits-default">{ createdOrder.number }</p>)
          )}
        </div>
      </div>
      <div className={ `mt-15` }>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={ `text text_type_digits-large ${ componentStyles.textShadow }` }>{total}</p>
      </div>
      <div className={ `mt-15` }>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={ `text text_type_digits-large ${ componentStyles.textShadow }` }>{totalToday}</p>
      </div>
    </div>
  );
}

export default FeedStatistics;