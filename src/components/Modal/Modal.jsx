import componentStyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useCallback } from 'react';
import { useEffect } from "react";
import { createRef } from "react";

const Modal = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const keyCodeEsc = 27;
  const overlayRef = createRef();

  const closeOnClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current) {
        history.goBack();
      }
    },
    [history, overlayRef]
  );

  const closeOnPress = useCallback(
    (e) => {
      if (e.keyCode === keyCodeEsc) {
        history.goBack();
      }
    },
    [history]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeOnPress);

    return () => {
      document.removeEventListener("keydown", closeOnPress);
    };
  }, [closeOnPress]);

  return ReactDOM.createPortal(
    <div className={componentStyles.container}>
      <ModalOverlay ref={overlayRef} onClick={closeOnClick}/>
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
    </div>,
    document.getElementById("modal"));
};

export default Modal;
