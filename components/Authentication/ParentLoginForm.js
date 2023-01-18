import { useTranslation } from 'next-i18next';

import {  useState } from 'react';

import { useEffect } from 'react';

import { Transition } from '@mantine/core';

import { LoginForm } from './LoginForm';
import { PasswordlessForm } from './PasswordLessForm';
import { ForgotForm } from './ForgotForm';
import { PostWrapper } from '../PostWrapper/PostWrapper';
import { Layout } from '../Layout/Layout';

export default function ParentLoginForm({parentCloseCallback}) {
  const { t } = useTranslation(['common']);
  
  //const { classes } = useStyles();

  

  const passwordless = () => {
    setScreen('passwordless');
  }

  const returnToLogin = () => {
    setScreen('login');
  }

  const passwordForgotCallback = () => {
    setScreen('forgot');
  }

  const closeCallback = async () => {
    parentCloseCallback()
  }

  const [screen, setScreen] = useState('login');

  return (
    <>
    <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
      <div style={{width: '100%'}}>
      
        <Transition mounted={screen === 'login'} duration={0}  >
          {(styles) => (
            
              <div style={{height: '100%', width: '100%', ...styles}}><LoginForm  passwordlessCallback={passwordless} passwordForgotCallback={passwordForgotCallback} closeCallback={closeCallback}/></div>
             
          )}
        </Transition>

        <Transition mounted={screen === 'passwordless'} duration={0} >
          {(styles) => (
              
                <div style={{height: '100%', width: '100%', ...styles}}><PasswordlessForm returnToLogin={returnToLogin}/></div>
              
          )}
        </Transition>

        <Transition mounted={screen === 'forgot'} duration={0} >
          {(styles) => (
              
                <div style={{height: '100%', width: '100%', ...styles}}><ForgotForm returnToLogin={returnToLogin}/></div>
              
          )}
        </Transition>
        
      </div>
    </div>
        
        
    </>
  );
}
