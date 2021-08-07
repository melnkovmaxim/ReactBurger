import componentStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';

const ModalOverlay = ({ children, header }) => {
  return (
    <div className={componentStyles.container}>
    {header ? (
      <div className={componentStyles.headerWrapper}>
        <div className={`mt-10 ml-10 mr-10 ${componentStyles.header}`}>
          <p className="text text_type_main-large">{header}</p>
          <div className={`mr-10 ${componentStyles.closeButton}`}>
            <Link to='/'><CloseIcon type="primary" /></Link>
          </div>
        </div>
      </div>
    ) : (
      <div className={`mt-15 mr-10 ${componentStyles.closeButton}`}>
        <CloseIcon type="primary" />
      </div>
    )}
    <div>{children}</div>
  </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  header: PropTypes.string,
};

export default ModalOverlay;
