import { useState } from 'react';
import Icon from '@components/Commons/Icon';

import styles from './input.module.scss';

const Select = props => {
  const { label, options = [], name, placeholder, icon, errorMessage, style } = props;

  const [focus, setFocus] = useState(false);

  const inputIcon = focus ? `${styles.inputGroupIcon} ${styles.inputFocus}` : styles.inputGroupIcon;
  const inputGroup = icon ? `${styles.inputGroup} ${styles.inputIcon}` : styles.inputGroup;

  const SelectField = (
    <select
      className={`${styles.inputForm} ${errorMessage ? styles.inputError : ''}`}
      name={name}
      value={props.value ? props.value : ''}
      onChange={props.onChange}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      autoComplete='off'
    >
      {placeholder && <option value=''>{placeholder}</option>}
      {options.map(({ text, value }) => (
        <option selected={props.value === value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );

  return (
    <div className={`${styles.select} ${inputGroup}`} style={{ width: '100%', ...style }}>
      {label !== undefined && <label htmlFor={name}>{label}</label>}
      {icon !== undefined ? (
        <div className={inputIcon}>
          <div
            className={styles.inputGroupAppend}
            style={{ marginLeft: '10px', marginRight: '-15px' }}
          >
            <span>
              <Icon name={icon} />
            </span>
          </div>
          {SelectField}
        </div>
      ) : (
        SelectField
      )}
      {errorMessage && <span className={styles.inputErrorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default Select;
