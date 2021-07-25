import componentStyles from "./Modal.module.css";
import { useEffect, useCallback } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = ({ children, header, onClose }) => {
  const root = document.getElementById("root");
  const keyCodeEsc = 27;

  const setInvisibleOnClick = (e) => {
    if (e.target.className === componentStyles.overlay) {
      onClose();
    }
  };

  const setInvisibleOnPress = useCallback((e) => {
    if (e.keyCode === keyCodeEsc) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", setInvisibleOnPress);

    return () => {
      document.removeEventListener("keydown", setInvisibleOnPress);
    };
  }, [setInvisibleOnPress]);

  return ReactDOM.createPortal(
    <div className={componentStyles.overlay} onClick={setInvisibleOnClick}>
      <ModalOverlay header={header} onClose={onClose}>
        {children}
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
