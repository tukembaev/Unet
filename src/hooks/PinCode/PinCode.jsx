import React, { useRef, useState } from 'react';
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import styles from './PinCode.module.scss';
const PinCode = ({setPinCode , passwordVisible}) => {
 
  

  const handleOnChange = (res) => {
    setPinCode(res);
  };

  return (
    <AuthCode
    length={4}
    onChange={handleOnChange}
    allowedCharacters={'numeric'}
    isPassword={passwordVisible}
      containerClassName={styles.container}
      inputClassName={styles.inputs}
    />
  );
};
export default PinCode 