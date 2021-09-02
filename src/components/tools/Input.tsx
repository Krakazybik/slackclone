import React from 'react';
import { FieldInputProps } from 'react-final-form';
import styles from './tools.module.scss';

interface IInputProperties {
  width: number;
  placeholder?: string;
  type?: string;
  src?: string;
  label?: string;
  callback?: (data: string) => void;
  autofocus?: boolean;
  input?: FieldInputProps<string, HTMLElement>;
}

const Input: React.FC<IInputProperties> = ({
  type = 'text',
  width,
  placeholder = '',
  src,
  label,
  callback,
  autofocus = false,
  input,
}) => (
  <div className={styles.input_wrapper}>
    {label && (
      <div className={styles.label} style={{ width }}>
        {label}
      </div>
    )}
    <input
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...input}
      /* eslint-disable-next-line jsx-a11y/no-autofocus */
      autoFocus={autofocus}
      onKeyPress={(event) =>
        event.key === 'Enter' && callback && callback(event.currentTarget.value)
      }
      style={{ width: src ? width - 34 : width, color: label && '#343A40' }}
      className={styles.input}
      placeholder={placeholder}
      type={type}
      width={width}
    />
    {src && (
      <img
        className={styles.image}
        src={src}
        alt={src}
        height="16px"
        style={{ bottom: label && '10px' }}
      />
    )}
    <div className={styles.input_underline} style={{ width }} />
  </div>
);

export default Input;
