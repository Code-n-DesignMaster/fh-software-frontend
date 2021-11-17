import { flatten } from 'lodash';
import { put } from 'redux-saga/effects';
import { createSagas } from '@lib/redux';
import { commentService } from '@services/index';
import { IReduxAction } from 'src/interfaces';
import { message } from 'antd';
import {
  getComments, getCommentsFail, getCommentsSuccess, moreCommentFail, moreCommentSuccess, moreComment,
  createComment, createCommentSuccess, createCommentFail
} from './actions';

const commentSagas = [
  {
    on: getComments,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield commentService.search(data.payload);
        yield put(getCommentsSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(getCommentsFail(error));
      }
    }
  },
  {
    on: moreComment,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield commentService.search(data.payload);
        yield put(moreCommentSuccess(resp.data));
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield put(moreCommentFail(error));
      }
    }
  },
  {
    on: createComment,
    * worker(data: IReduxAction<any>) {
      try {
        const resp = yield commentService.create(data.payload);
        yield put(createCommentSuccess(resp.data));
        yield message.success('Thank for your commenting');
      } catch (e) {
        const error = yield Promise.resolve(e);
        yield message.error('Error occured, please try again later');
        yield put(createCommentFail(error));
      }
    }
  }
];

export default flatten([createSagas(commentSagas)]);
