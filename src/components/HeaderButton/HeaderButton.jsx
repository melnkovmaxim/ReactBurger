import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./HeaderButton.module.css";
import PropTypes from "prop-types";

const HeaderButton = (props) => {
  return (
    <Button {...props}>
      <div className={componentStyles.buttonChild}>
        {props.children}
        <p className={`ml-2 text_type_main-default text_color_inactive`}>{props.text}</p>
      </div>
    </Button>
  );
};

HeaderButton.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  inactive: PropTypes.bool,
};

export default HeaderButton;
