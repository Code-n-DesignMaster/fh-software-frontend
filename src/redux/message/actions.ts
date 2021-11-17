import { createAction, createAsyncAction } from '@lib/redux';

export const {
  getConversations,
  getConversationsSuccess,
  getConversationsFail
} = createAsyncAction('getConversations', 'LOAD_CONVERSATIONS');

export const {
  searchConversations,
  searchConversationsSuccess,
  searchConversationsFail
} = createAsyncAction('searchConversations', 'SEARCH_CONVERSATIONS');

export const {
  readMessages
} = createAsyncAction('readMessages', 'READ_MESSAGES');

export const {
  sendMessage,
  sendMessageSuccess,
  sendMessageFail
} = createAsyncAction('sendMessage', 'SEND_MESSAGE');

export const {
  sendMediaMessage,
  sendMediaMessageSuccess,
  sendMediaMessageFail
} = createAsyncAction('sendMediaMessage', 'SEND_MEDIA_MESSAGE');

export const {
  receiveMessageSuccess
} = createAsyncAction('receiveMessageSuccess', 'RECEIVE_MESSAGE_SUCCESS');

export const {
  sentFileSuccess
} = createAsyncAction('sentFileSuccess', 'SENT_FILE_SUCCESS');

export const {
  deactiveConversation
} = createAsyncAction('deactiveConversation', 'DEACTIVE_CONVERSATION');

export const {
  clearActiveConversation
} = createAsyncAction('clearActiveConversation', 'CLEAR_ACTIVE_CONVERSTION')

export const {
  clearMessage
} = createAsyncAction('clearMessage', 'CLEAR_MESSAGE');

export const {
  setActiveConversation,
  setActiveConversationSuccess,
  setActiveConversationFail
} = createAsyncAction(
  'setActiveConversation',
  'SET_ACTIVE_CONVERSATION_RECEIVER'
);

export const {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesFail
} = createAsyncAction('loadMessages', 'LOAD_MESSAGES');

export const {
  loadMoreMessages,
  loadMoreMessagesSuccess,
  loadMoreMessagesFail
} = createAsyncAction('loadMoreMessages', 'LOAD_MORE_MESSAGES');

export const {
  getCountTotalNotRead,
  getCountTotalNotReadSuccess,
  getCountTotalNotReadFail
} = createAsyncAction('getCountTotalNotRead', 'GET_COUNT_TATALNOTREAD');

export const fetchingMessage = createAction('fetchingMessage');

export const resetMessageState = createAction('resetMessageState');

export const {
  getConversationDetail,
  getConversationDetailSuccess,
  getConversationDetailFail
} = createAsyncAction('getConversationDetail', 'LOAD_CONVERSATION_ITEM');

export const {
  getCountSystemNotRead,
  getCountSystemNotReadSuccess,
  getCountSystemNotReadFail
} = createAsyncAction('getCountSystemNotRead', 'GET_COUNT_SYSTEMNOTREAD');

export const {
  getMedias,
  getMediasSuccess,
  getMediasFail
} = createAsyncAction('getMedias', 'GET_MEDIAS');

export const {
  setSelectedValue
} = createAsyncAction('setSelectedValue', 'SET_SELECTED_VALUE');

export const {
  setSearchItems
} = createAsyncAction('setSearchItems', 'SET_SEARCH_ITEMS');

export const setCountOfSystemMessage = createAction('setCountOfSystemMessage');
