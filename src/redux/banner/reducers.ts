import { createReducers } from '@lib/redux';
import { merge } from 'lodash';
import { getBanners, getBannersSuccess, getBannersFail } from './actions';

export type BannerState = {
  listBanners: {
    loading: boolean;
    success: boolean;
    data?: any;
    error?: any;
  };
};

const initialState = {
  listBanners: {
    loading: false,
    data: null,
    error: null,
    success: false
  }
};

const bannerReducer = [
  {
    on: getBanners,
    reducer(state: any) {
      return {
        ...state,
        listBanners: {
          loading: true,
          data: null,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: getBannersSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        listBanners: {
          loading: false,
          data: data.payload,
          error: null,
          success: true
        }
      };
    }
  },
  {
    on: getBannersFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        listBanners: {
          loading: false,
          data: null,
          error: data.payload,
          success: false
        }
      };
    }
  }
];

export default merge(
  {},
  createReducers('banner', [bannerReducer], initialState)
);
