import { merge } from 'lodash';
import { createReducers } from '@lib/redux';
import { IReduxAction } from 'src/interfaces';
import {
  getConversations,
  getConversationsSuccess,
  getConversationsFail,
  searchConversations,
  searchConversationsSuccess,
  searchConversationsFail,
  setActiveConversationSuccess,
  fetchingMessage,
  loadMessagesSuccess,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
  sendMediaMessage,
  sendMediaMessageSuccess,
  sendMediaMessageFail,
  getConversationDetailSuccess,
  receiveMessageSuccess,
  readMessages,
  sentFileSuccess,
  loadMoreMessagesSuccess,
  deactiveConversation,
  clearActiveConversation,
  clearMessage,
  resetMessageState,
  getCountTotalNotRead,
  getCountTotalNotReadSuccess,
  getCountSystemNotReadSuccess,
  setCountOfSystemMessage,
  setSearchItems,
  setSelectedValue,
  getMedias,
  getMediasSuccess,
  getMediasFail
} from './actions';

const initialConversationState = {
  list: {
    requesting: false,
    error: null,
    data: [],
    total: 0,
    success: false
  },
  listMedias: {
    items: [],
    total: 0,
    requesting: false,
    error: null,
    success: false
  },
  mapping: {},
  totalNotReadMessage: 0,
  systemNotReadMessage: 0,
  visibleSystemMessage: false,
  searchItems: [
    { label: "Subscribers (All)", value: "all" },
    // { label: "Subscribers (Paid)", value: "paid" },
    // { label: "Subscribers (Free)", value: "free" }
  ],
  selectedValue: '',
  pickListOption: 'individual',
  activeConversation: {}
};

const initialMessageState = {
  // conversationId => { fetching: boolean, items: [] }
  conversationMap: {},
  sendMessage: {},
  receiveMessage: {}
};

const conversationReducer = [
  {
    on: getCountTotalNotReadSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        totalNotReadMessage: data.payload.total
      };
    }
  },
  {
    on: getCountSystemNotReadSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        systemNotReadMessage: data.payload.total
      };
    }
  },
  {
    on: setCountOfSystemMessage,
    reducer(state: any, data: any) {
      return {
        ...state,
        systemNotReadMessage: data.payload.total
      };
    }
  },
  {
    on: resetMessageState,
    reducer(state: any) {
      let { list, mapping, activeConversation } = state;
      list = {
        requesting: false,
        error: null,
        data: [],
        total: 0,
        success: false
      };
      mapping = {};
      activeConversation = {};
      return {
        ...state,
        list,
        mapping,
        activeConversation
      };
    }
  },
  {
    on: getConversations,
    reducer(state: any) {
      const nextState = { ...state };
      nextState.list.requesting = true;
      return {
        ...nextState
      };
    }
  },
  {
    on: getConversationsSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      const { list, mapping } = nextState;
      const { data: items, total } = data.payload;
      const Ids = items.map((c) => c._id);
      list.data = Ids;
      list.total = total;
      list.success = true;
      list.requesting = false;
      list.error = false;
      items.forEach((c) => {
        mapping[c._id] = c;
      });
      return {
        ...nextState
      };
    }
  },
  {
    on: getConversationsFail,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      return {
        ...nextState,
        list: {
          requesting: false,
          error: data.payload,
          data: [],
          total: 0,
          success: false
        },
        mapping: {},
        activeConversation: {}
      };
    }
  },
  {
    on: searchConversations,
    reducer(state: any) {
      const nextState = { ...state };
      return {
        ...nextState,
        list: {
          requesting: true,
          error: null,
          data: [],
          total: 0,
          success: false
        },
        mapping: {},
        activeConversation: {}
      };
    }
  },
  {
    on: searchConversationsSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      const { list, mapping } = nextState;
      const { data: items, total } = data.payload;
      const Ids = items.map((c) => c._id);
      list.data = Ids;
      list.total = total;
      list.success = true;
      list.requesting = false;
      list.error = false;
      items.forEach((c) => {
        mapping[c._id] = c;
      });
      return {
        ...nextState
      };
    }
  },
  {
    on: searchConversationsFail,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      return {
        ...nextState,
        list: {
          requesting: false,
          error: data.payload,
          data: [],
          total: 0,
          success: false
        },
        mapping: {},
        activeConversation: {}
      };
    }
  },
  {
    on: setActiveConversationSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const conversation = data.payload;
      const list = state.list.data;
      const { mapping } = state;
      const check = list.find((c) => c === conversation._id);
      if (!check) {
        list.unshift(conversation._id);
        mapping[conversation._id] = conversation;
      }
      return {
        ...state,
        activeConversation: conversation
      };
    }
  },
  {
    on: getConversationDetailSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const { list, mapping } = state;
      const conversation = data.payload;
      if (!list.data.includes(conversation._id)) {
        list.data.unshift(conversation._id);
        mapping[conversation._id] = conversation;
      }

      return {
        ...state
      };
    }
  },
  {
    on: clearActiveConversation,
    reducer(state: any) {
      const nextState = { ...state };
      // nextState.activeConversation._id = '';
      return {
        ...nextState
      };
    }
  },
  {
    on: readMessages,
    reducer(state: any, data: IReduxAction<any>) {
      const conversationId = data.payload;
      const { mapping } = state;
      mapping[conversationId].totalNotSeenMessages = 0;
      return {
        ...state
      };
    }
  },
  {
    on: deactiveConversation,
    reducer(state: any) {
      const nextState = { ...state };
      nextState.activeConversation = {};
      return {
        ...nextState
      };
    }
  },
  {
    on: setSearchItems,
    reducer(state: any, data: any) {
      return {
        ...state,
        searchItems: data.payload ? initialConversationState.searchItems.concat(data.payload) : initialConversationState.searchItems,
        selectedValue: data.payload ? data.payload.value : '',
        pickListOption: data.payload && data.payload.value === 'all' ? 'all' : 'individual'
      };
    }
  },
  {
    on: setSelectedValue,
    reducer(state: any, data: any) {
      return {
        ...state,
        selectedValue: data.payload.selectedValue || '',
        pickListOption: data.payload.pickListOption || 'individual'
      }
    }
  },
  {
    on: getMedias,
    reducer(state: any) {
      return {
        ...state,
        listMedias: {
          items: { ...state.listMedias.items },
          total: { ...state.listMedias.total },
          requesting: true,
          error: null,
          success: false
        }
      };
    }
  },
  {
    on: getMediasSuccess,
    reducer(state: any, data: any) {
      return {
        ...state,
        listMedias: {
          requesting: false,
          items: data.payload.data,
          total: data.payload.total,
          error: null,
          success: true
        }
      };
    }
  },
  {
    on: getMediasFail,
    reducer(state: any, data: any) {
      return {
        ...state,
        listMedias: {
          items: { ...state.listMedias.items },
          total: { ...state.listMedias.total },
          requesting: false,
          error: data.payload,
          success: false
        }
      };
    }
  }
];

const messageReducer = [
  {
    on: fetchingMessage,
    reducer(state: any, data: IReduxAction<any>) {
      const { conversationMap } = state;
      const { conversationId } = data.payload;
      conversationMap[conversationId] = {
        ...conversationMap[conversationId],
        fetching: true
      };
      return { ...state };
    }
  },
  {
    on: clearMessage,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      const { conversationId } = data.payload;
      nextState.conversationMap[conversationId] = {
        items: [],
        total:0,
        fetching: false
      };
      return {
        ...nextState
      };
    }
  },
  {
    on: loadMessagesSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const { conversationMap } = state;
      const { conversationId, items, total } = data.payload;
      conversationMap[conversationId] = {
        items: [...items.reverse()],
        total,
        fetching: false
      };
      return { ...state };
    }
  },
  {
    on: loadMoreMessagesSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const { conversationMap } = state;
      const { conversationId, items, total } = data.payload;
      conversationMap[conversationId] = {
        items: [
          ...items.reverse(),
          ...conversationMap[conversationId].items || []
        ],
        total,
        fetching: false
      };
      return { ...state };
    }
  },
  {
    on: sendMessage,
    reducer(state: any) {
      return {
        ...state,
        sendMessage: {
          sending: true
        }
      };
    }
  },
  {
    on: sendMessageSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      if (!nextState.conversationMap[data.payload.conversationId] || !nextState.conversationMap[data.payload.conversationId].items) {
        nextState.conversationMap[data.payload.conversationId].items = [];
      }
      nextState.conversationMap[data.payload.conversationId].items.push(
        data.payload
      );
      return {
        ...nextState,
        sendMessage: {
          sending: false,
          success: true,
          data: data.payload
        }
      };
    }
  },
  {
    on: sendMessageFail,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        sendMessage: {
          sending: false,
          success: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: sendMediaMessage,
    reducer(state: any) {
      return {
        ...state,
        sendMessage: {
          sending: true
        }
      };
    }
  },
  {
    on: sendMediaMessageSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      if (!nextState.conversationMap[data.payload.conversationId] || !nextState.conversationMap[data.payload.conversationId].items) {
        nextState.conversationMap[data.payload.conversationId].items = [];
      }
      nextState.conversationMap[data.payload.conversationId].items.push(
        data.payload
      );
      return {
        ...nextState,
        sendMessage: {
          sending: false,
          success: true,
          data: data.payload
        }
      };
    }
  },
  {
    on: sendMediaMessageFail,
    reducer(state: any, data: IReduxAction<any>) {
      return {
        ...state,
        sendMessage: {
          sending: false,
          success: false,
          error: data.payload
        }
      };
    }
  },
  {
    on: receiveMessageSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      if (!nextState.conversationMap[data.payload.conversationId]) {
        return { ...nextState };
      }
      nextState.conversationMap[data.payload.conversationId].items.push(
        data.payload
      );
      return {
        ...nextState,
        receiveMessage: data.payload
      };
    }
  },
  {
    on: sentFileSuccess,
    reducer(state: any, data: IReduxAction<any>) {
      const nextState = { ...state };
      if (!nextState.conversationMap[data.payload.conversationId] || !nextState.conversationMap[data.payload.conversationId].items) {
        nextState.conversationMap[data.payload.conversationId].items = [];
      }
      nextState.conversationMap[data.payload.conversationId].items.push(
        data.payload
      );
      return {
        ...nextState,
        sendMessage: {
          sending: false,
          success: true,
          data: data.payload
        }
      };
    }
  }
];

export default merge(
  {},
  createReducers(
    'conversation',
    [conversationReducer],
    initialConversationState
  ),
  createReducers('message', [messageReducer], initialMessageState)
);
