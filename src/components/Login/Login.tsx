import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/selectors';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';

const Registration: React.FC = () => {
  const jwtToken = useSelector(selectToken);

  return (
    <div className={styles.login_wrapper}>
      {jwtToken && <Redirect to="/channels" />}
      <div className={styles.login}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Registration;
