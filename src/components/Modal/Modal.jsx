import componentStyles from "./Modal.module.css";
import { useCallback } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

const Modal = ({ children }) => {
  const history = useHistory();

  const closeOnClick = useCallback(
    (e) => {
      if (e.target.className === componentStyles.overlay) {
        history.goBack();
      }
    },
    [history]
  );

  return ReactDOM.createPortal(
    <>
      <ModalOverlay history={history} />
      <div className={componentStyles.overlay} onClick={closeOnClick}>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
