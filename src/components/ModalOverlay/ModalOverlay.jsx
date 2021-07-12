import componentStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ModalOverlay = (props) => {
  return (
    <div className={componentStyles.container}>
      {props.header 
        ? (<div className={componentStyles.headerWrapper}>
             <div className={`mt-10 ml-10 mr-10 ${componentStyles.header}`}>
               <p className="text text_type_main-large">{props.header}</p>
               <div className={`mr-10 ${componentStyles.closeButton}`}>
                 <CloseIcon type="primary" onClick={props.onClose} />
               </div>
             </div>
           </div>) 
        : (<div className={`mt-15 mr-10 ${componentStyles.closeButton}`}>
             <CloseIcon type="primary" onClick={props.onClose} />
          </div>
      )}
      <div>{props.children}</div>
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
};

export default ModalOverlay;
