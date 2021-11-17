import { flatten } from 'lodash';
import { put } from 'redux-saga/effects';
import { createSagas } from '@lib/redux';
import { userService, authService, performerService } from '@services/index';
import { IReduxAction, IBanking } from 'src/interfaces';
import {
  updateUser,
  updateUserSuccess,
  updateUserFail,
  setUpdating,
  updatePassword,
  updatePasswordSuccess,
  updatePasswordFail,
  updatePerformer,
  updateBanking,
  updateBankingSuccess,
  updateBankingFail,
  setUpdatingBanking
} from './actions';
import { message } from 'antd';

const userSagas = [
  // TODO - defind update current user or get from auth user info to reload current user data if needed
  {
    on: updateUser,
    * worker(data: IReduxAction<any>) {
      try {
        yield put(setUpdating(true));
        const updated = yield userService.updateMe(data.payload);
        yield put(updateUserSuccess(updated.data));
      } catch (e) {
        // TODO - alert error
        const error = yield Promise.resolve(e);
        yield put(updateUserFail(error));
      } finally {
        yield put(setUpdating(false));
      }
    }
  },
  {
    on: updatePerformer,
    * worker(data: IReduxAction<any>) {
      try {
        yield put(setUpdating(true));
        const updated = yield performerService.updateMe(data.payload._id, data.payload);
        yield put(updateUserSuccess(updated.data));
        message.success('Changes saved.');
      } catch (e) {
        // TODO - alert error
        const error = yield Promise.resolve(e);
        yield put(updateUserFail(error));
        message.error(error.message);
      } finally {
        yield put(setUpdating(false));
      }
    }
  },
  {
    on: updatePassword,
    * worker(data: IReduxAction<any>) {
      try {
        yield put(setUpdating(true));
        const updated = yield authService.updatePassword(data.payload);
        yield put(updatePasswordSuccess(updated.data));
      } catch (e) {
        // TODO - alert error
        const error = yield Promise.resolve(e);
        yield put(updatePasswordFail(error));
      } finally {
        yield put(setUpdating(false));
      }
    }
  },
  {
    on: updateBanking,
    * worker(data: IReduxAction<IBanking>) {
      try {
        yield put(setUpdatingBanking(true));
        const updated = yield performerService.updateBanking(data.payload.performerId, data.payload);
        yield put(updateBankingSuccess(updated.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(updateBankingFail(error));
      } finally {
        yield put(setUpdatingBanking(false));
      }
    }
  }
];

export default flatten([createSagas(userSagas)]);
