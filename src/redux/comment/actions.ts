import { createAsyncAction } from '@lib/redux';

export const {
  getComments,
  getCommentsSuccess,
  getCommentsFail
} = createAsyncAction('getComments', 'GET_COMMENTS');

export const {
  moreComment, moreCommentSuccess, moreCommentFail
} = createAsyncAction('moreComment', 'MORE_COMMENT');

export const {
  createComment, createCommentSuccess, createCommentFail
} = createAsyncAction('createComment', 'CREATE_COMMENT');
