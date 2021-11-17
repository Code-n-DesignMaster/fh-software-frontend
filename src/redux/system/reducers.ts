import { merge } from 'lodash';
import { setErrorSystem } from './actions';
import { createReducers } from '@lib/redux';

// TODO -
const initialState = {
  error: null
};

const systemReducers = [
  {
    on: setErrorSystem,
    reducer(state: any, data: any) {
      return {
        ...state,
        error: data.payload
      };
    }
  }
];

export default merge(
  {},
  createReducers('system', [systemReducers], initialState)
);
