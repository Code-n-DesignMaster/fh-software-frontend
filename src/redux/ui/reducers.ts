import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { IUIConfig } from '@interface/ui-config';
import { updateUIValue, loadUIValue } from './actions';

// TODO -
const initialState: IUIConfig = {
  shopCartSwitch: true,
  tipSwitch: false,
  nudirtyMinScore: 80,
  nudirtySwitch: false,
  rightClickPrintSwitch: false,
  couponSwitch: false,
  collapsed: false,
  theme: 'light',
  siteName: 'HoneyDrip',
  logo: '/logo.png',
  fixedHeader: false,
  menus: [],
  minVisibleSubscribersCount: 20
};

const uiReducers = [
  {
    on: updateUIValue,
    reducer(state: any, data: any) {
      if (process.browser) {
        Object.keys(data.payload).forEach(
          (key) => localStorage && localStorage.setItem(key, data.payload[key])
        );
      }
      return {
        ...state,
        ...data.payload
      };
    }
  },
  {
    on: loadUIValue,
    reducer(state: any) {
      const newVal = {};
      if (process.browser) {
        Object.keys(initialState).forEach((key) => {
          const val = localStorage.getItem(key);
          if (val) {
            newVal[key] = val;
          }
        });
      }
      return {
        ...state,
        ...newVal
      };
    }
  }
];

export default merge({}, createReducers('ui', [uiReducers], initialState));
