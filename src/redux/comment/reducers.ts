import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import {
  getComments, getCommentsFail, getCommentsSuccess, moreComment, moreCommentFail, moreCommentSuccess,
  createComment, createCommentSuccess
} from './actions';

const initialState = {
  comments: {
    requesting: false,
    error: null,
    success: false,
    items: [],
    total: 0
  },
  comment: {
    requesting: false,
    error: null,
    success: false,
    data: null
  }
};

const commentReducers = [
  {
    on: getComments,
    reducer(state: any) {
      return {
        ...state,
        comments: {
          ...state.comments,
          requesting: true
        }
      };
    }
  },
  {
    on: getCommentsSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        comments: {
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          success: true
        }
      };
    }
  },
  {
    on: getCommentsFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        comments: {
          ...state.comments,
          requesting: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: moreComment,
    reducer(state: any) {
      return {
        ...state,
        comments: {
          ...state.comments,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: moreCommentSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        products: {
          requesting: false,
          total: data.payload.total,
          items: [...state.products.items, ...data.payload.data],
          success: true
        }
      };
    }
  },
  {
    on: moreCommentFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        comments: {
          ...state.comments,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  },
  {
    on: createComment,
    reducer(state: any) {
      return {
        ...state,
        comment: {
          ...state.comment,
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: createCommentSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        comment: {
          requesting: false,
          data: data.payload,
          error: null,
          success: true
        },
        comments: {
          total: state.comments.total + 1,
          items: [data.payload, ...state.comments.items]
        }
      };
    }
  },
  {
    on: moreCommentFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        comment: {
          ...state.comment,
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  }
];

export default merge({}, createReducers('comment', [commentReducers], initialState));
