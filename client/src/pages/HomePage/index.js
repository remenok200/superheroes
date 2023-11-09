import React, { useState } from 'react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';

import { useSelector } from 'react-redux';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const { isLoading, error } = useSelector(state => state.user);

  const [state, setState] = useState(true);

  const buttonHandler = () => {
    setState((state) => !state);
  };

  const textButton = state ? 'SignIn' : 'SignUp';
  return (
    <div className={styles.container}>
      <header>
        <button onClick={buttonHandler}>{textButton}</button>
      </header>
      <main className={styles['form-wrapper']}>
        {state ? <SignIn /> : <SignUp />}
        {error && <div className={styles.error}>{error}</div>}
      </main>
    </div>
  );
};

export default HomePage;
