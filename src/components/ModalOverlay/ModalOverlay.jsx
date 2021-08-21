import { forwardRef } from "react";
import { memo } from "react";
import componentStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = memo(forwardRef(({ onClick }, ref) => {
  return <div ref={ ref } className={ componentStyles.overlay } onClick={ onClick }/>;
}));

ModalOverlay.propTypes = PropTypes.shape({
  onClick: PropTypes.func.isRequired
}).isRequired;

export default ModalOverlay;
