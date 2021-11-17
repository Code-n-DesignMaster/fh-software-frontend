import { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import './ConversationList.less';
import {
  searchConversations,
  getConversations,
  setActiveConversation,
  getConversationDetail,
  receiveMessageSuccess,
  getCountTotalNotRead
} from '@redux/message/actions';
import { SettingFilled } from '@ant-design/icons';
import { Event, SocketContext } from 'src/socket';
import { debounce } from 'lodash';
import { IUser, IPerformer } from 'src/interfaces';
import ConversationSearch from './ConversationSearch';
import ConversationListItem from './conversation-list-item';
import { Tooltip } from 'antd';
import Link from 'next/link';
import { LoaderInner } from '@components/loader';
import Router from 'next/router';

interface IProps {
  searchConversations: Function;
  getConversations: Function;
  setActiveConversation: Function;
  getConversationDetail: Function;
  receiveMessageSuccess: Function;
  getCountTotalNotRead: Function;
  conversation: {
    list: {
      requesting: boolean;
      error: any;
      data: any[];
      total: number;
      success: boolean;
    };
    mapping: Record<string, any>;
    activeConversation: Record<string, any>;
    pickListOption: string;
  };
  toSource: string;
  toId: string;
  message: {
    conversationMap: {};
    sendMessage: {};
  };
  user: IUser | IPerformer;
}
class ConversationList extends PureComponent<IProps> {
  conversationsRef: any;

  state = {
    conversationPage: 0,
    keyword: ''
  };

  async componentDidMount() {
    if (!this.conversationsRef) this.conversationsRef = createRef();
    const {
      getConversations: getConversationsHandler,
      setActiveConversation: setActiveConversationHandler,
      toSource,
      toId,
      user
    } = this.props;
    const { conversationPage, keyword } = this.state;
    getConversationsHandler({
      limit: 25,
      offset: conversationPage * 25,
      type: 'private',
      keyword
    });
    if (toSource && toId) {
      setTimeout(() => {
        setActiveConversationHandler({
          source: toSource,
          sourceId: toId,
          recipientId: user._id
        });
      }, 1000);
    }
  }

  onMessage = (message: { conversationId: string | number }) => {
    if (!message) {
      return;
    }
    const {
      conversation,
      getCountTotalNotRead: countTotalNotRead,
      getConversations: getConversationsHandler,
      getConversationDetail: getConversationDetailHandler,
      receiveMessageSuccess: receiveMessageSuccessHandler
    } = this.props;
    const { mapping } = conversation;
    if (!mapping[message.conversationId]) {
      getConversationDetailHandler({
        id: message.conversationId
      });
    }
    receiveMessageSuccessHandler(message);
    countTotalNotRead();
    getConversationsHandler({
      limit: 25,
      offset: 0,
      type: 'private',
      keyword: ''
    });
  };

  onSearchConversation = debounce(async (e) => {
    const { value } = e.target;
    const { searchConversations: getConversationsHandler } = this.props;
    await this.setState({ keyword: value, conversationPage: 0 });
    if (value) {
      return getConversationsHandler({
        keyword: value,
        limit: 25,
        offset: 0,
        type: 'private'
      });
    }
    return getConversationsHandler({
      limit: 25,
      offset: 0,
      type: 'private',
      keyword: value
    });
  }, 500);

  handleScroll = async (event: { target: any }) => {
    const {
      conversation,
      getConversations: getConversationsHandler
    } = this.props;
    const { requesting, data, total } = conversation.list;
    const { conversationPage, keyword } = this.state;
    const canloadmore = total > data.length;
    const ele = event.target;
    if (!canloadmore) return;
    if (
      ele.scrollHeight - ele.scrollTop === ele.clientHeight &&
      !requesting &&
      canloadmore
    ) {
      this.setState({ conversationPage: conversationPage + 1 }, () => {
        const { conversationPage: newPage } = this.state;
        getConversationsHandler({
          keyword,
          limit: 25,
          offset: newPage * 25,
          type: 'private'
        });
      });
    }
  };

  setActive = (conversationId: any) => {
    const {
      setActiveConversation: setActiveConversationHandler,
      getCountTotalNotRead: countTotalNotRead,
      conversation,
      user
    } = this.props;
    const activeConversation = conversation.mapping[conversationId];
    Router.push({
      pathname: '/messages',
      query: {
        toSource:
          activeConversation &&
          activeConversation.recipients.filter(
            (r) => activeConversation.recipientInfo._id === r.sourceId
          )[0].source,
        toId:
          activeConversation &&
          activeConversation.recipientInfo &&
          activeConversation.recipientInfo._id
      }
    });
    setActiveConversationHandler({ conversationId, recipientId: user._id });
    countTotalNotRead();
  };

  render() {
    const { conversation, user } = this.props;
    const { data: conversations, requesting } = conversation.list;
    const { mapping, activeConversation = {} } = conversation;
    if (!this.conversationsRef) this.conversationsRef = createRef();
    return (
      <div
        className="conversation-list"
        ref={this.conversationsRef}
        onScroll={this.handleScroll.bind(this)}
      >
        <Event event="message_created" handler={this.onMessage} />
        {/* <div className="user-bl">
          <img alt="avatar" src={(user && user.avatar) || '/no-avatar.png'} />
          {' '}
          <Tooltip placement='topLeft' title={user?.name}><span className="user-name">{user?.name} </span></Tooltip>
          {user?.isPerformer && <Link href={{ pathname: "/model/account", query: { selectKey: 'chat' } }} as={"/model/account"}>
            <SettingFilled />
          </Link>}
        </div> */}
        {/* <ConversationSearch
          onSearch={(e) => {
            e.persist();
            this.onSearchConversation(e);
          }}
        /> */}
        <div className="conversation-list-items">
          {conversations.length > 0 &&
            conversations.map((conversationId) => (
              <ConversationListItem
                key={conversationId}
                data={mapping[conversationId]}
                setActive={this.setActive}
                selected={
                  activeConversation._id === conversationId &&
                  conversation.pickListOption === 'individual'
                }
              />
            ))}
          {requesting && (
            <div className="text-center">
              <LoaderInner />
            </div>
          )}
          {!requesting && !conversations.length && (
            <p className="text-center">No conversation found.</p>
          )}
        </div>
      </div>
    );
  }
}

ConversationList.contextType = SocketContext;
const mapStates = (state: any) => ({
  conversation: { ...state.conversation },
  message: { ...state.message },
  user: { ...state.user.current }
});

const mapDispatch = {
  searchConversations,
  getConversations,
  setActiveConversation,
  getConversationDetail,
  receiveMessageSuccess,
  getCountTotalNotRead
};
export default connect(mapStates, mapDispatch)(ConversationList);
