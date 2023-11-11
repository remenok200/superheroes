import React, { useState } from 'react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';

import HashLoader from 'react-spinners/HashLoader';

import { useSelector } from 'react-redux';

import styles from './HomePage.module.scss';

import history from 'browserHistory';

const HomePage = () => {
  if(localStorage.getItem('refreshToken')) {
    setTimeout(() => {
      history.push('/heroes');
    }, 100);
  }

  const { isLoading, error } = useSelector((state) => state.user);

  const [state, setState] = useState(true);

  const buttonHandler = () => {
    setState((state) => !state);
  };

  const textButton = state ? 'SignIn' : 'SignUp';

  if (isLoading) {
    return (
      <HashLoader
        color="white"
        cssOverride={{ display: 'block', margin: '0 auto' }}
        size={400}
      />
    );
  }

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
