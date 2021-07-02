import componentStyles from "./Modal.module.css";
import { useEffect, useCallback } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const root = document.getElementById("root");
  const keyCodeEsc = 27;

  const setInvisibleOnClick = (e) => {
    if (e.target.className === componentStyles.overlay) {
      props.onClose();
    }
  };

  const setInvisibleOnPress = useCallback((e) => {
    if (e.keyCode === keyCodeEsc) {
      props.onClose();
    }
  }, [props]);

  useEffect(() => {
    document.addEventListener("keydown", setInvisibleOnPress);

    return () => {
      document.removeEventListener("keydown", setInvisibleOnPress);
    };
  }, [setInvisibleOnPress]);

  return ReactDOM.createPortal(
    <div className={componentStyles.overlay} onClick={setInvisibleOnClick}>
      <ModalOverlay header={props.header} onClose={props.onClose}>
        {props.children}
      </ModalOverlay>
    </div>,
    root
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string
};

export default Modal;
