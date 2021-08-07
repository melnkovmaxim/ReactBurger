import { useEffect } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import componentStyles from "./ModalOverlay.module.css";

const ModalOverlay = () => {
  const history = useHistory();
  const keyCodeEsc = 27;

  const closeOnPress = useCallback(
    (e) => {
      if (e.keyCode === keyCodeEsc) {
        history.goBack();
      }
    },
    [history]
  );

  const closeOnClick = useCallback(
    (e) => {
      if (e.target.className === componentStyles.overlay) {
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

  return <div className={componentStyles.overlay} onClick={closeOnClick}></div>;
};

export default ModalOverlay;
