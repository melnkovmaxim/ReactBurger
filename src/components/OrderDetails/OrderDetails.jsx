import componentStyles from './OrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import accessIcon from '../../images/graphics.png';
import { forwardRef, useState, useImperativeHandle } from 'react';
 
const OrderDetails = forwardRef((props, ref) => {
  const [isVisible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    }
  }));

  return (
    <>
      { isVisible
        ? ( <div ref={props.ref} className={componentStyles.overlay}>
              <div className={componentStyles.container}>
                    <div className={`mr-10 mt-15 ${componentStyles.closeButton}`} >
                      <CloseIcon type="primary" onClick={() => setVisible(false)} />
                    </div>
                    <div className={`pt-30 pb-30 ${componentStyles.innerContainer}`}>
                      <p className={`text text_type_digits-large ${componentStyles.orderNumber}`}>034536</p>
                      <p className={`mt-8 text text_type_main-medium ${componentStyles.orderIdentifier}`}>идентификатор заказа</p>
                      <img src={accessIcon} alt="Заказ готов" className="mt-15"></img>
                      <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
                      <p className="mt-2 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                    </div>
                </div>
            </div>)
        : null
      }
    </>
  );
});

export default OrderDetails;
