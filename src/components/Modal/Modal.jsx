import componentStyles from "./Modal.module.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState();
  const root = document.getElementById("root");
  const keyCodeEsc = 27;

  useImperativeHandle(ref, () => ({
    show() {
      setIsVisible(true);
    },
  }));

  const setInvisibleOnClick = (e) => {
    if (e.target.className === componentStyles.overlay) {
      setIsVisible(false);
    }
  };

  const setInvisibleOnPress = (e) => {
    if (e.keyCode === keyCodeEsc) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", setInvisibleOnPress);

    return () => {
      document.removeEventListener("keydown", setInvisibleOnPress);
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      {isVisible && (
        <div className={componentStyles.overlay} onClick={setInvisibleOnClick}>
          <ModalOverlay header={props.header} onClose={() => setIsVisible(false)}>
            {props.children}
          </ModalOverlay>
        </div>
      )}
    </div>,
    root
  );
});

Modal.propTypes = {
  header: PropTypes.string,
};

export default Modal;
