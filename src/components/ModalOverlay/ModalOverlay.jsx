import { forwardRef } from "react";
import { memo } from "react";
import componentStyles from "./ModalOverlay.module.css";

const ModalOverlay = memo(forwardRef(({ onClick }, ref) => {
  return <div ref={ref} className={componentStyles.overlay} onClick={onClick}></div>;
}));

export default ModalOverlay;
