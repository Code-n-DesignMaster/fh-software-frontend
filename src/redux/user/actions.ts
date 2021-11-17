import { createAction, createAsyncAction } from '@lib/redux';

export const updateCurrentUser = createAction('updateCurrentUser');
export const updateCurrentUserAvatar = createAction('updateCurrentUserAvatar');
export const updateCurrentUserCover = createAction('updateCurrentUserCover');
export const updateCurrentUserIdVerification = createAction('updateCurrentUserIdVerification');
export const updateCurrentUserWelcomeImg = createAction('updateCurrentUserWelcomeImg');
export const updateCurrentUserWelcomeMVideo = createAction('updateCurrentUserWelcomeMVideo');
export const updateCurrentUserWelcomeVideo = createAction('updateCurrentUserWelcomeVideo');
export const updateCurrentUserIsActivateWV = createAction('updateCurrentUserIsActivateWV');

export const {
  updateUser,
  updateUserSuccess,
  updateUserFail
} = createAsyncAction('updateUser', 'UPDATE_USER');

export const { updatePerformer } = createAsyncAction(
  'updatePerformer',
  'UPDATE_PERFORMER'
);

export const setUpdating = createAction('updatingUser');

export const setReducer = createAction('setUserReducer');

export const {
  updatePassword,
  updatePasswordSuccess,
  updatePasswordFail
} = createAsyncAction('updatePassword', 'UPDATE_PASSWORD');

export const {
  updateBanking,
  updateBankingSuccess,
  updateBankingFail
} = createAsyncAction('updateBanking', 'UPDATE_BANKING');

export const setUpdatingBanking = createAction('updatingBanking');

export const updateBlockCountries = createAction('updateBlockCountries');

export const resetUser = createAction('resetUser');
