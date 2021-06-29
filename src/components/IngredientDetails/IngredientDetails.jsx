import componentStyles from '../IngredientDetails/IngredientDetails.module.css';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientDetails = forwardRef((props, ref) => {
    const [isVisible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      show() {
        setVisible(true);
      }
    }));

    return (
        <div className={`${componentStyles.overlay} ${isVisible ? null : componentStyles.invisible}`}>
            <div className={componentStyles.container}>
                <div className="mt-10 ml-10 mr-10">
                    <p className="text">Детали ингредиента</p>
                    <div className={componentStyles.closeButton}><CloseIcon type="primary" onClick={() => setVisible(false)} /></div>
                </div>
                <div className={componentStyles.content}>
                    <img src={props.image} alt={props.name} />
                </div>
            </div>
        </div>
    );
});

export default IngredientDetails;