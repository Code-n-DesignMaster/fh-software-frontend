import React from 'react';
import { flatten } from 'lodash';
import { put } from 'redux-saga/effects';
import { createSagas } from '@lib/redux';
import Router from 'next/router';
import { authService, userService, performerService } from 'src/services';
import {
  ILogin,
  IFanRegister,
  IForgot,
  IPerformerRegister
} from 'src/interfaces';
import { message, Modal } from 'antd';
import * as _ from 'lodash';
import routes from 'server/routes';
import { clearCart } from '@redux/cart/actions';
import { updateCurrentUser, resetUser } from '../user/actions';
import {
  login,
  loginSuccess,
  logout,
  loginFail,
  registerFanFail,
  registerFan,
  registerFanSuccess,
  registerPerformerFail,
  registerPerformer,
  registerPerformerSuccess,
  loginPerformer,
  forgot,
  forgotSuccess,
  forgotFail,
  resetAuth
} from './actions';

const handleSendEmail = async (url) => {
  message.destroy();
  try {
    const data = await authService
      .resendEmail(url)
      .then((resp) => resp.data)
      .catch((err) => {
        err.then((p) => {
          message.info({
            content: p.message,
            style: { fontSize: '16px' },
            duration: 5
          });
        });
      });
    if (data) {
      message.info({
        content: data.message,
        style: { fontSize: '16px' }
      });
    }
  } catch (e) {
    message.error({
      content: 'Bad request!',
      style: { fontSize: '16px' }
    });
  }
};

const authSagas = [
  {
    on: login,
    * worker(data: any) {
      try {
        const payload = data.payload as ILogin;
        const resp = (yield authService.login(payload)).data;
        // store token, update store and redirect to dashboard page
        yield authService.setToken(
          resp.token,
          resp.usertype === 0 ? 'user' : 'performer'
        );
        const path = localStorage.getItem('loginUrl') || '';
        if (resp.usertype === 0) {
          const userResp = (yield userService.me()).data;
          yield put(updateCurrentUser(userResp));
          yield put(loginSuccess());
          if (path !== '') {
            Router.push({ pathname: path }, path);
          } else {
            Router.push(
              { pathname: '/home', query: { id: userResp._id } },
              '/home'
            );
          }
        } else if (resp.usertype === 1) {
          const userResp = (yield performerService.me()).data;
          yield put(updateCurrentUser(userResp));
          yield put(loginSuccess());
          if (path !== '') {
            Router.push({ pathname: path }, path);
          } else {
            Router.push(
              {
                pathname: '/model',
                query: { username: userResp.username }
              },
              `/model/${userResp.username}`
            );
          }
        }
      } catch (e) {
        const error = yield Promise.resolve(e);
        error && error.message
          ? error.type === 'EMAIL_NOT_VERIFIED'
            ? message.info({
              content: React.createElement(
                'a',
                {
                  id: 'EMAIL_NOT_VERIFIED',
                  onClick: () => handleSendEmail(error.link)
                },
                'Please verify your email. Click here to resend verification link.'
              ),
              style: { fontSize: '16px' },
              duration: 10
            })
            : error.type === 'ACCOUNT_NOT_APPROVED'
              ? Modal.info({
                title: error.message,
                width: 520
              })
              : message.info({
                content: error.message,
                style: { fontSize: '16px' },
                duration: 10
              })
          : message.error('Incorrect credentials!');
        yield put(loginFail(error));
      }
    }
  },

  {
    on: loginPerformer,
    * worker(data: any) {
      try {
        const payload = data.payload as ILogin;
        const resp = (yield authService.loginPerformer(payload)).data;
        // store token, update store and redirect to dashboard page
        yield authService.setToken(resp.token, 'performer');
        const userResp = (yield performerService.me()).data;
        yield put(updateCurrentUser(userResp));
        yield put(loginSuccess());
        routes.Router.pushRoute(
          '/model',
          { username: userResp.username }
        );
      } catch (e) {
        const error = yield Promise.resolve(e);
        message.error(
          error && error.message ? error.message : 'Incorrect credentials!',
          5
        );
        yield put(loginFail(error));
      }
    }
  },

  {
    on: registerFan,
    * worker(data: any) {
      try {
        const payload = data.payload as IFanRegister;
        const resp = (yield authService.register(payload)).data;
        message.success(resp && resp.message, 5);
        Router.push('/');
        yield put(registerFanSuccess(resp));
      } catch (e) {
        const error = yield Promise.resolve(e);
        message.error(error.message || 'Username or email has been taken.');
        yield put(registerFanFail(error));
      }
    }
  },

  {
    on: registerPerformer,
    * worker(data: any) {
      try {
        const verificationFiles = [
          {
            fieldname: 'idVerification',
            file: data.payload.idVerificationFile
          },
          {
            fieldname: 'documentVerification',
            file: data.payload.documentVerificationFile
          }
        ];
        const payload = _.pick(data.payload, [
          'name',
          'username',
          'password',
          'gender',
          'email',
          'firstName',
          'lastName',
          'age',
          'country'
        ]) as IPerformerRegister;
        const resp = (yield authService.registerPerformer(
          verificationFiles,
          payload,
          () => {
            // put progressing to view
          }
        )).data;
        message.success(resp && resp.message, 5);
        Router.push('/');
        yield put(registerPerformerSuccess(resp));
      } catch (e) {
        const error = yield Promise.resolve(e);
        message.error(
          error.message || 'This Username or email ID has been already taken.',
          5
        );
        yield put(registerPerformerFail(error));
      }
    }
  },

  {
    on: logout,
    * worker() {
      try {
        yield authService.removeToken();
        yield put(resetAuth());
        yield put(resetUser());
        yield put(clearCart());
        message.success(
          'You have logged out. Our models upload new photos and videos daily. Come back soon for more..'
        );
        // yield put(resetAppState());
        Router.push('/');
      } catch (e) {
        message.error('Something went wrong.');
      }
    }
  },

  {
    on: forgot,
    * worker(data: any) {
      try {
        const payload = data.payload as IForgot;
        const resp = (yield authService.resetPassword(payload)).data;
        message.success(
          "We've sent an email to reset your password, please check your inbox/spam.",
          5
        );
        yield put(forgotSuccess(resp));
      } catch (e) {
        const error = yield Promise.resolve(e);

        message.error(
          (error && error.message)
            || 'Something went wrong. Please try again later',
          5
        );
        yield put(forgotFail(error));
      }
    }
  }
];

export default flatten([createSagas(authSagas)]);
