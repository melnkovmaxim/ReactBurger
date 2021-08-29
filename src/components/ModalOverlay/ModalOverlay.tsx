import { ForwardedRef, forwardRef } from "react";
import { memo } from "react";
import componentStyles from "./ModalOverlay.module.css";
import { IModalOverlayProps } from "../../interfaces/components/ModalOverlay/IModalOverlayProps";

const ModalOverlay = memo(forwardRef(
  ({ onClick }: IModalOverlayProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  return <div ref={ ref } className={ componentStyles.overlay } onClick={ onClick }/>;
}));

export default ModalOverlay;
