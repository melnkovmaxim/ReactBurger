import { memo } from "react";
import componentStyles from "./ModalOverlay.module.css";

const ModalOverlay = memo(({ onClick }) => {
  return <div className={componentStyles.overlay} onClick={onClick}></div>;
});

export default ModalOverlay;
