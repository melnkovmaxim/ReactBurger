import componentStyles from './OrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {
  return (<div className={componentStyles.container}>
      <div className={`mr-10 mt-15 ${componentStyles.closeButton}`}>
        <CloseIcon type="primary" />
      </div>
      <div className={`mt-30 mb-30 ${componentStyles.innerContainer}`}>
        <p>034536</p>
        <p className="mt-8">идентификатор заказа</p>
        <p className="mt-15"></p>
        <p className="mt-15">Ваш заказ начали готовить</p>
        <p className="mt-2">Дождитесь готовности на орбитальной станции</p>
      </div>
  </div>);
};

export default OrderDetails;
