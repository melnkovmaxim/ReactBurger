import componentStyles from '../IngredientDetails/IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
    return (
        <div className={`mb-15 ${componentStyles.content}`}>
            <img className={componentStyles.ingredientImage} src={props.image_large} alt={props.name} />
            <p className={`mt-4 text text_type_main-medium ${componentStyles.textCenter}`}>{props.name}</p>
            <div className={`mt-8 ${componentStyles.ingredientInfo} ${componentStyles.textCenter}`}>
                <div>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="mt-2 text text_type_digits-default text_color_inactive">
                        {props.calories}
                    </p>
                </div>
                <div>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="mt-2 text text_type_digits-default text_color_inactive">
                        {props.proteins}
                    </p>
                </div>
                <div>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г.
                    </p>
                    <p className="mt-2 text text_type_digits-default text_color_inactive">
                        {props.fat}
                    </p>
                </div>
                <div>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="mt-2 text text_type_digits-default text_color_inactive">
                        {props.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
};

export default IngredientDetails;