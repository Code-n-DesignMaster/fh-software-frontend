import { createAsyncAction, createAction } from '@lib/redux';

export const { login, loginSuccess, loginFail } = createAsyncAction(
  'login',
  'LOGIN'
);

export const { loginPerformer } = createAsyncAction(
  'loginPerformer',
  'LOGINPERFORMER'
);

export const { registerFan, registerFanSuccess, registerFanFail } = createAsyncAction(
  'registerFan',
  'REGISTERFAN'
);

export const { registerPerformer, registerPerformerSuccess, registerPerformerFail } = createAsyncAction(
  'registerPerformer',
  'REGISTERPERFORMER'
);

export const { forgot, forgotSuccess, forgotFail } = createAsyncAction(
  'forgot',
  'FORGOT'
);

export const resetAuth = createAction('resetAuth');

export const logout = createAction('logout');
