import componentStyles from './FeedStatistics.module.css';

const FeedStatistics = () => {
  return (
    <div className={componentStyles.container}>
      <div className={componentStyles.currentOrders}>
        <div className={componentStyles.orders}>
          <p className="pb-6 text text_type_main-medium">Готовы:</p>
          <p className={`pb-2 text text_type_digits-default ${componentStyles.readyOrder}`}>034533</p>
          <p className={`pb-2 text text_type_digits-default ${componentStyles.readyOrder}`}>034532</p>
          <p className={`pb-2 text text_type_digits-default ${componentStyles.readyOrder}`}>034530</p>
          <p className={`pb-2 text text_type_digits-default ${componentStyles.readyOrder}`}>034527</p>
          <p className={`pb-2 text text_type_digits-default ${componentStyles.readyOrder}`}>034525</p>
        </div>
        <div className="pl-9"/>
        <div className={componentStyles.orders}>
          <p className="pb-6 text text_type_main-medium">В работе:</p>
          <p className="pb-2 text text_type_digits-default">034538</p>
          <p className="pb-2 text text_type_digits-default">034541</p>
          <p className="pb-2 text text_type_digits-default">034542</p>
        </div>
      </div>
      <div className={`mt-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${componentStyles.textShadow}`}>28 752</p>
      </div>
      <div className={`mt-15`}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${componentStyles.textShadow}`}>138</p>
      </div>
    </div>
  );
}

export default FeedStatistics;