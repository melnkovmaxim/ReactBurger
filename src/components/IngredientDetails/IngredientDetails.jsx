import componentStyles from '../IngredientDetails/IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
    return (
        <div className={`mb-15 ${componentStyles.content}`}>
            <img className={componentStyles.ingredientImage} src={props.ingredient.image_large} alt={props.ingredient.name} />
            <p className={`mt-4 text text_type_main-medium ${componentStyles.textCenter}`}>{props.ingredient.name}</p>
            <div className={`mt-8 ${componentStyles.ingredientInfo}`}>
                <div>
                    <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                        Калории, ккал
                    </p>
                    <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                        {props.ingredient.calories}
                    </p>
                </div>
                <div>
                    <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                        Белки, г
                    </p>
                    <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                        {props.ingredient.proteins}
                    </p>
                </div>
                <div>
                    <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                        Жиры, г.
                    </p>
                    <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                        {props.ingredient.fat}
                    </p>
                </div>
                <div>
                    <p className={`text text_type_main-default text_color_inactive ${componentStyles.textCenter}`}>
                        Углеводы, г
                    </p>
                    <p className={`mt-2 text text_type_digits-default text_color_inactive ${componentStyles.textCenter}`}>
                        {props.ingredient.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ingredientPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
});

IngredientDetails.propTypes = {
    ingredient: PropTypes.objectOf(ingredientPropType.isRequired).isRequired
};

export default IngredientDetails;