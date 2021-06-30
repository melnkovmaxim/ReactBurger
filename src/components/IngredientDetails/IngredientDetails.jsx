import componentStyles from '../IngredientDetails/IngredientDetails.module.css';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientDetails = forwardRef((props, ref) => {
    const [state, setState] = useState();

    useImperativeHandle(ref, (props) => ({
      show(props) {
        setState(props);
      }
    }));

    return (
        <>
            {state 
            ? ( <div className={componentStyles.overlay}>
                    <div className={componentStyles.container}>
                        <div className={`mt-10 ml-10 mr-10 mb-15 ${componentStyles.innerContainer}`}>
                            <div className={componentStyles.header}>
                                <p className="text text_type_main-large">Детали ингредиента</p>
                                <div className={`mr-10 ${componentStyles.closeButton}`}><CloseIcon type="primary" onClick={() => setState(null)} /></div>
                            </div>
                            <div className={componentStyles.content}>
                                <img className={componentStyles.ingredientImage} src={state.image} alt={state.name} />
                                <p className="mt-4 text text_type_main-medium">{state.name}</p>
                                <div className={`mt-8 ${componentStyles.ingredientInfo}`}>
                                    <div>
                                        <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                                            Калории, ккал
                                        </p>
                                        <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                                            {state.calories}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                                            Белки, г
                                        </p>
                                        <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                                            {state.proteins}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                                            Жиры, г.
                                        </p>
                                        <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                                            {state.fat}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                                            Углеводы, г
                                        </p>
                                        <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                                            {state.carbohydrates}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            : null
            }
        </>
    );
});

export default IngredientDetails;