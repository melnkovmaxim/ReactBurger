import componentStyles from './OrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import accessIcon from '../../images/graphics.png';

const OrderDetails = () => {
  return (
    <div className={componentStyles.overlay}>
      <div className={componentStyles.container}>
            <div className={`mr-10 mt-15 ${componentStyles.closeButton}`}>
              <CloseIcon type="primary" />
            </div>
            <div className={`mt-30 mb-30 ${componentStyles.innerContainer}`}>
              <p className={`text text_type_digits-large ${componentStyles.orderNumber}`}>034536</p>
              <p className={`mt-8 text text_type_main-medium ${componentStyles.orderIdentifier}`}>идентификатор заказа</p>
              <img src={accessIcon} className={`mt-15 ${componentStyles.orderIcon}`}></img>
              <p className={`mt-15 text text_type_main-default ${componentStyles.orderInfo}`}>Ваш заказ начали готовить</p>
              <p className={`mt-2 text text_type_main-default text_color_inactive ${componentStyles.orderDescription}`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>
    </div>
  );
};

export default OrderDetails;
