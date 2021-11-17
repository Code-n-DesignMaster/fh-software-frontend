import { merge } from 'lodash';
import { updateSettings } from './actions';
import { createReducers } from '@lib/redux';

// TODO - 
const initialState = {
};

const settingReducers = [
  {
    on: updateSettings,
    reducer(state: any, data: any) {
      return {
        ...data.payload
      };
    }
  }
];

export default merge({}, createReducers('settings', [settingReducers], initialState));
