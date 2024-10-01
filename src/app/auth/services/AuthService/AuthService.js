import axios from 'axios';
import FuseUtils from '@fuse/utils/FuseUtils';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

/* eslint-disable camelcase */
class AuthService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid accessToken');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(accessToken)) {
      this.setSession(accessToken);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'Access Token expired');
    }
  };

  signInWithUserNameEmail = (inputJson) => {
    return new Promise((resolve, reject) => {
      axios.post('user-auth/login', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          if (response.data.accessToken) {
            this.setSession(response.data.accessToken);
            resolve(response.data.user);
            this.emit('onLogin', response.data, 'Login');
          } else {
            resolve(response.data);
          }
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  signInWithMobilePhone = (inputJson) => {
    return new Promise((resolve, reject) => {
      axios.post('user-auth/login-mobile', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          if (response.data.accessToken) {
            this.setSession(response.data.accessToken);
            resolve(response.data.user);
            this.emit('onLogin', response.data, 'Login');
          } else {
            resolve(response.data);
          }
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  signUpWithEmailAndPassword = (inputJson) => {
    return new Promise((resolve, reject) => {
      axios.post('user-auth/sign-up', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  completeYourAccount = (inputJson) => {
    return new Promise((resolve, reject) => {
      axios.post('user-auth/complete-account', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          // resolve(response.data);
          this.setSession(response.data.accessToken);
          resolve(response.data.user);
          this.emit('onLogin', response.data, 'AccountCompleted');
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  checkUserName = (inputJson) => {
    return new Promise((resolve, reject) => {
      axios.post('user-auth/check-username', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data.message);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  checkEmail = (inputJson) => {
    return new Promise((resolve, reject) => {
      axios.post('user-auth/check-email', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  checkMobilePhone = (inputJson) => {
    return new Promise((resolve, reject) => {
      axios.post('user-auth/check-mobile-phone', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  loginInAsUser = (email, switchUserEmail) => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        email: email,
        switchUserEmail: switchUserEmail
      };
      axios.post('user-auth/login-as', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          if (response.data.accessToken) {
            this.setSession(response.data.accessToken);
            resolve(response.data.user);
            this.emit('onLogin', response.data, 'LoginAs');
          } else {
            resolve(response.data);
          }
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        accessToken: this.getAccessToken()
      };

      axios.post('access-token/get', inputJson)
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.accessToken);
            resolve(response.data.user);
          } else {
            this.logout();
            reject(new Error('Your session has expired. Please signin again.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Your session has expired. Please signin again.'));
        });
    });
  };

  switchToSuperAdmin = (email) => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        email: email
      };
      axios.post('company/switch-to-super-admin', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data);
          Cookies.remove('_SecureMyMachineOnline', { domain: process.env.REACT_APP_DOMAIN_NAME });
          Cookies.remove('_SuperMyMachineOnline', { domain: process.env.REACT_APP_DOMAIN_NAME });
          Cookies.set('_SAMyMachineOnline', response.data.accessToken, { domain: process.env.REACT_APP_DOMAIN_NAME, expires: 30 });
          window.open(response.data.redirectUrl, '_self');
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  setSession = (accessToken) => {
    if (accessToken) {
      Cookies.set('_SecureMyMachineOnline', accessToken, { domain: process.env.REACT_APP_DOMAIN_NAME, expires: 30 });
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      Cookies.remove('_SecureMyMachineOnline', { domain: process.env.REACT_APP_DOMAIN_NAME });
      delete axios.defaults.headers.common.Authorization;
    }
  };

  getAccessToken = () => {
    return Cookies.get('_SecureMyMachineOnline');
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Signed Out');
  };

  isAuthTokenValid = (accessToken) => {
    if (!accessToken) {
      return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return false;
    }

    return true;
  };

  verifyAccount = (email, verificationCode) => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        email: email,
        verificationCode: verificationCode
      };
      axios.post('user-auth/email-verification', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          this.setSession(response.data.accessToken);
          resolve(response.data);
          this.emit('onLogin', response.data, 'AccountVerified');
        } else if (response.data.messageId === 201) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  verifyMobilePhone = (mobilePhone, verificationCode) => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        mobilePhone: mobilePhone,
        verificationCode: verificationCode
      };
      axios.post('user-auth/mobile-verification', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        email: email
      };
      axios.post('user-auth/forgot-password', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data.message);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  resetPassword = (token, password) => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        token: token,
        password: password
      };
      axios.post('user-auth/reset-password', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data.message);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  changePassword = (currentPassword, password, _id) => {
    return new Promise((resolve, reject) => {
      let inputJson = {
        currentPassword: currentPassword,
        password: password,
        _id: _id
      };
      axios.patch('user-auth/change-password', inputJson).then((response) => {
        if (response.data.messageId === 200) {
          resolve(response.data.message);
        } else {
          reject(response.data.message);
        }
      });
    });
  };
}

const instance = new AuthService();

export default instance;
