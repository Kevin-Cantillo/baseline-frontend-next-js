/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import Icon from '@components/Commons/Icon';

import styles from './input.module.scss';

const Input = props => {
  const { label, type, name, placeholder, icon, errorMessage, style, onClick = () => {} } = props;

  const [focus, setFocus] = useState(false);
  const [viewPass, setViewPass] = useState(false);
  const [propsModified, setPropsModified] = useState({});

  useEffect(() => {
    let propsTemp = {};
    for (const key in props) {
      if (key !== 'errorMessage' && key !== 'icon' && key !== 'onClick') {
        propsTemp = { ...propsTemp, [key]: props[key] };
      }
    }
    setPropsModified(propsTemp);
  }, [props]);

  const inputIcon = focus ? `${styles.inputGroupIcon} ${styles.inputFocus}` : styles.inputGroupIcon;
  const inputGroup = icon ? `${styles.inputGroup} ${styles.inputIcon}` : styles.inputGroup;
  const inputType = type || 'text';

  const InputField = (
    <input
      className={`${styles.inputForm} ${errorMessage ? styles.inputError : ''}`}
      {...propsModified}
      type={viewPass ? 'text' : inputType}
      name={name}
      value={props.value ? props.value : ''}
      onChange={props.onChange}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      autoComplete='off'
    />
  );

  const TextAreaField = (
    <textarea
      className={`${styles.inputForm} ${errorMessage ? styles.inputError : ''} ${styles.textarea}`}
      {...propsModified}
      // type={viewPass ? 'text' : inputType}
      name={name}
      value={props.value ? props.value : ''}
      onChange={props.onChange}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );

  const returnInput = () => {
    if (icon !== undefined) {
      return (
        <div className={`${inputIcon} ${errorMessage ? styles.inputError : ''}`} style={style}>
          {inputType === 'textarea' ? TextAreaField : InputField}
          <div className={styles.inputGroupAppend}>
            {type === 'password' ? (
              <span onClick={() => setViewPass(!viewPass)} className={style.cursorPointer}>
                <Icon name={viewPass ? 'viewOff' : 'view'} />
              </span>
            ) : (
              <span onClick={e => onClick(e)}>
                <Icon name={icon} />
              </span>
            )}
          </div>
        </div>
      );
    }
    return inputType === 'textarea' ? TextAreaField : InputField;
  };

  return (
    <div
      className={inputGroup}
      // style={style}
    >
      {label !== undefined && <label htmlFor={name}>{label}</label>}
      {returnInput()}
      {errorMessage && <span className={styles.inputErrorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
