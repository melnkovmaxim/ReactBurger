import componentStyles from './ModalOverlay.module.css';
import { forwardRef, useImperativeHandle, useState } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

const ModalOverlay = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState();

    useImperativeHandle(ref, () => ({
      show() {
        setIsVisible(true);
      }
    }));

    return (
        <>
            { 
                isVisible && (
                    <div ref={props.ref} className={componentStyles.overlay}>
                                <Modal header={props.header} onClose={() => setIsVisible(false)}>{props.children}</Modal>
                    </div>
                )
            }
        </>
    );
});

ModalOverlay.propTypes = {
    header: PropTypes.string
};

export default ModalOverlay;