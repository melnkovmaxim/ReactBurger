import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./HeaderButton.module.css";
import { IHeaderButtonProps } from "../../interfaces/components/HeaderButton/IHeaderButtonProps";

const HeaderButton = (props: IHeaderButtonProps): JSX.Element => {
  return (
    <Button { ...props }>
      <div className={ componentStyles.buttonChild }>
        { props.children }
        <p className={ `ml-2 text_type_main-default text_color_inactive` }>{ props.text }</p>
      </div>
    </Button>
  );
};

export default HeaderButton;
