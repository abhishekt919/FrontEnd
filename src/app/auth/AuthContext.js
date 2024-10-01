import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { getProfile } from 'app/store/userProfileSlice';
import { logoutUser, setUser } from 'app/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as React from 'react';
import AuthService from './services/AuthService';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.on('onAutoLogin', () => {
      /**
       * Sign in and retrieve user data with stored token
       */
      AuthService
        .signInWithToken()
        .then((user) => {
          success(user, '');
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    AuthService.on('onLogin', (data, type) => {
      let message = "";
      if (type === 'AccountVerified') {
        message = data.message;
      } else if (type === 'AccountCompleted') {
        message = data.message;
      } else if (type === 'LoginAs') {
        message = data.message;
      } else {
        message = 'Welcome Back';
      }
      success(data.user, message);
    });

    AuthService.on('onLogout', (message) => {
      // pass(message);

      dispatch(logoutUser());
    });

    AuthService.on('onAutoLogout', (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    AuthService.on('onNoAccessToken', () => {
      pass();
    });

    AuthService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        dispatch(getProfile(user))
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
