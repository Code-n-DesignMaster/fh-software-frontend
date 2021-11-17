import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { IReduxAction, IUser, IReducerFieldUpdate } from 'src/interfaces';
import {
  updateCurrentUser,
  updateUserSuccess,
  setUpdating,
  updateCurrentUserAvatar,
  setReducer,
  updateUserFail,
  updatePasswordSuccess,
  updatePasswordFail,
  setUpdatingBanking,
  updateBanking,
  updateBankingSuccess,
  updateBankingFail,
  updateCurrentUserCover,
  updateCurrentUserIdVerification,
  updateCurrentUserWelcomeImg,
  updateCurrentUserWelcomeMVideo,
  updateCurrentUserWelcomeVideo,
  updateCurrentUserIsActivateWV,
  updateBlockCountries,
  resetUser
} from './actions';

export type UserState = {
  current: {
    _id?: string;
    avatar: string;
    cover?: string;
    name: string;
    email: string;
    gender: 'male' | 'female';
    roles?: readonly string[];
    isPerformer?: boolean;
  };
  error?: string;
  updateSuccess: boolean;
  updating: boolean;
};

const initialState: UserState = {
  current: null,
  error: null,
  updateSuccess: false,
  updating: false
};

const userReducers = [
  {
    on: updateCurrentUser,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: data.payload
      };
    }
  },
  {
    on: updateCurrentUserIdVerification,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: {
          ...state.current,
          idVerification: {
            url: data.payload.url
          },
          idVerificationId: data.payload._id
        }
      };
    }
  },
  {
    on: updateCurrentUserAvatar,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: {
          ...state.current,
          avatar: data.payload
        }
      };
    }
  },
  {
    on: updateCurrentUserCover,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: {
          ...state.current,
          cover: data.payload
        }
      };
    }
  },
  {
    on: updateCurrentUserWelcomeImg,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: {
          ...state.current,
          welcomeImgPath: data.payload.url,
          welcomeMessageMimeType: data.payload.mimeType
        }
      };
    }
  },
  {
    on: updateCurrentUserWelcomeMVideo,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: {
          ...state.current,
          welcomeMessageVideoPath: data.payload.url,
          welcomeMessageMimeType: data.payload.mimeType
        }
      };
    }
  },
  {
    on: updateCurrentUserWelcomeVideo,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: {
          ...state.current,
          welcomeVideoPath: data.payload
        }
      };
    }
  },
  {
    on: updateCurrentUserIsActivateWV,
    reducer(state: any, data: any) {
      return {
        ...state,
        current: {
          ...state.current,
          activateWelcomeVideo: data.payload
        }
      };
    }
  },
  {
    on: updateUserSuccess,
    reducer(state: any, data: IReduxAction<IUser>) {
      return {
        ...state,
        current: data.payload,
        updateSuccess: true,
        error: null
      };
    }
  },
  {
    on: updateUserFail,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        updateUser: null,
        updateSuccess: false,
        error: data.payload
      };
    }
  },
  {
    on: setUpdating,
    reducer(state: any, data: IReduxAction<boolean>) {
      return {
        ...state,
        updating: data.payload,
        updateSuccess: false
      };
    }
  },
  {
    on: setReducer,
    reducer(state: any, data: IReduxAction<IReducerFieldUpdate<any>>) {
      return {
        ...state,
        [data.payload.field]: data.payload.data
      };
    }
  },
  {
    on: updatePasswordSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        updateSuccess: true,
        updatedPassword: data.payload,
        error: null
      };
    }
  },
  {
    on: updatePasswordFail,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        updateSuccess: false,
        updatedPassword: null,
        error: data.payload
      };
    }
  },
  // Update banking
  // TODO add interface
  {
    on: setUpdatingBanking,
    reducer(state: any, data: IReduxAction<boolean>) {
      return {
        ...state,
        updating: data.payload,
        updateSuccess: false
      };
    }
  },
  {
    on: updateBanking,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        updateSuccess: false,
        updatedPassword: null,
        error: data.payload
      };
    }
  },
  {
    on: updateBankingSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        updateSuccess: true,
        updatedBanking: data.payload,
        current: { ...state.current, ...{ bankingInformation: data.payload } },
        error: null,
        updating: false
      };
    }
  },
  {
    on: updateBankingFail,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        updateSuccess: false,
        error: data.payload,
        updating: false
      };
    }
  },
  {
    on: updateBlockCountries,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        current: { ...state.current, ...{ blockCountries: data.payload } }
      };
    }
  },
  {
    on: resetUser,
    reducer(state: any) {
      return {
        ...state,
        current: null,
        error: null,
        updateSuccess: false,
        updating: false
      };
    }
  }
];

export default merge({}, createReducers('user', [userReducers], initialState));
