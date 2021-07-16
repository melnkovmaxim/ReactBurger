import componentStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ModalOverlay = ({ children, header, onClose }) => {
  return (
    <div className={componentStyles.container}>
      {header 
        ? (<div className={componentStyles.headerWrapper}>
             <div className={`mt-10 ml-10 mr-10 ${componentStyles.header}`}>
               <p className="text text_type_main-large">{header}</p>
               <div className={`mr-10 ${componentStyles.closeButton}`}>
                 <CloseIcon type="primary" onClick={onClose} />
               </div>
             </div>
           </div>) 
        : (<div className={`mt-15 mr-10 ${componentStyles.closeButton}`}>
             <CloseIcon type="primary" onClick={onClose} />
          </div>
      )}
      <div>{children}</div>
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
};

export default ModalOverlay;
