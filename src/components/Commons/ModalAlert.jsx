import React /* , {useEffect, useRef} */ from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Commons/Icon';

import styles from './modalAlert.module.scss';

const ModalAlert = ({
  open,
  size,
  mode,
  title,
  content,
  hiddenButtons,
  textCancelButton,
  textConfirmButton,
  onCancel,
  onConfirm
}) => {
  // const refContent = useRef(null);

  // useEffect(() => {
  //   console.log(content);
  //   if (!refContent.current) return;
  //   //refContent.current.innerHTML = content;
  //   return () => {
  //     //refContent.current.innerHTML = '';
  //   };
  // }, [content]);
  const styleSize = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;

      default:
        return styles.medium;
    }
  };

  return (
    open && (
      <div className={`${styles.bgModalAlert} `}>
        <div className={`${styles.modalAlert} ${styleSize()}`}>
          <div className={styles.content}>
            <div className={styles.contentContainer}>
              <div className={styles.iconBackgroundTop}>
                <Icon name='close' size={28} clickeable onClick={() => onCancel()} />
              </div>
              {title && (
                <div className={styles.modalHead}>
                  <p>{title}</p>
                </div>
              )}
              <div className={styles.modalBody}>{content}</div>
              {!hiddenButtons && (
                <div className={styles.modalFooter}>
                  {mode === 'confirm' && (
                    <button onClick={() => onCancel()} className='btn btn-primary'>
                      {textCancelButton}
                    </button>
                  )}
                  <button className='btn bg-primary-color' onClick={() => onConfirm()}>
                    {textConfirmButton}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

ModalAlert.defaultProps = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  mode: PropTypes.oneOf(['alert', 'confirm']),
  hiddenButtons: false,
  textCancelButton: 'Cancelar',
  textConfirmButton: 'Acceptar',
  onCancel: () => {},
  onConfirm: () => {}
};

ModalAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  size: PropTypes.string,
  mode: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.element,
  hiddenButtons: PropTypes.bool,
  textCancelButton: PropTypes.string,
  textConfirmButton: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func.isRequired
};

export default ModalAlert;
