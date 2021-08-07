import componentStyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

const Modal = ({ children }) => {
  const location = useLocation();

  return ReactDOM.createPortal(
    <>
      <div className={componentStyles.container}>
        <ModalOverlay />
        <div className={componentStyles.content}>
          <div className={`mt-15 mr-10 ${componentStyles.closeButton}`}>
            <Link
              className={componentStyles.top}
              to={location.state.background.pathname}
            >
              <CloseIcon type="primary" />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
