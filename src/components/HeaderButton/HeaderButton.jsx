import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./HeaderButton.module.css";

const HeaderButton = (props) => {
  return (
    <Button {...props}>
      <div className={componentStyles.buttonChild}>
        {props.children}
        <p className={`ml-2 text text_type_main-default ${props.inactive 
          ? "text_color_inactive" 
          : componentStyles.active}`}
        >{props.text}</p>
      </div>
    </Button>
  );
};

export default HeaderButton;
