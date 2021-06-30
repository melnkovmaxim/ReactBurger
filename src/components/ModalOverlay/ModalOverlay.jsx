import componentStyles from './ModalOverlay.module.css';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const ModalOverlay = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState();
    const root = document.getElementById('root');
    const keyCodeEsc = 27;

    useImperativeHandle(ref, () => ({
      show() {
        setIsVisible(true);
      }
    }));

    const setInvisibleOnClick = (e) => {
        if (e.target.className === componentStyles.overlay) {
            setIsVisible(false);
        }
    }

    const setInvisibleOnPress = (e) => {
        if (e.keyCode === keyCodeEsc) {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", setInvisibleOnPress);

        return () => {
            document.removeEventListener("keydown", setInvisibleOnPress);
        }
    }, []);

    return ReactDOM.createPortal (
        (<div>
            { 
                isVisible && (
                    <div ref={props.ref} className={componentStyles.overlay} onClick={setInvisibleOnClick}>
                                <Modal header={props.header} onClose={() => setIsVisible(false)}>{props.children}</Modal>
                    </div>
                )
            }
        </div>)
    ,root);
});

ModalOverlay.propTypes = {
    header: PropTypes.string
};

export default ModalOverlay;