import { useEffect } from "react";
import { useCallback } from "react";
import componentStyles from "./ModalOverlay.module.css";

const ModalOverlay = ({ history }) => {
  const keyCodeEsc = 27;
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

  return (<div className={componentStyles.overlay}></div>);
};

export default ModalOverlay;
