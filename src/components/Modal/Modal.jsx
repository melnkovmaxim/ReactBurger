import componentStyles from "./Modal.module.css";
import { useEffect, useCallback } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';

const Modal = ({ children }) => {
  const history = useHistory();
  const keyCodeEsc = 27;

  const closeOnClick = useCallback((e) => {
    if (e.target.className === componentStyles.overlay) {
      history.goBack();
    }
  }, [history]);

  const closeOnPress = useCallback((e) => {
    if (e.keyCode === keyCodeEsc) {
      history.goBack();
    }
  }, [history]);

  useEffect(() => {
    document.addEventListener("keydown", closeOnPress);

    return () => {
      document.removeEventListener("keydown", closeOnPress);
    };
  }, [closeOnPress]);

  return ReactDOM.createPortal(
    <div className={componentStyles.overlay} onClick={closeOnClick}>
      <ModalOverlay>
        {children}
      </ModalOverlay>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
