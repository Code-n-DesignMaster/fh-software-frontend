/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import {
  setActiveConversation,
  getCountTotalNotRead,
  setSearchItems,
  sendMessage,
  sendMediaMessage,
  sentFileSuccess,
  getConversations
} from '@redux/message/actions';
import {
  DollarOutlined,
  SmileOutlined,
  SendOutlined,
  PictureFilled
} from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { ImageMessageUpload } from '@components/messages/uploadPhoto';
import { authService, messageService } from '@services/index';
import Emotions from './emotions';
import './Compose.less';
import { Input } from 'antd';
import Router from 'next/router';
import { IUIConfig } from '@interface/ui-config';

interface IProps {
  sendMessage: Function;
  sendMediaMessage: Function;
  sentFileSuccess: Function;
  sendMessageStatus: any;
  setActiveConversation: Function;
  getCountTotalNotRead: Function;
  setSearchItems: Function;
  getConversations: Function;
  ui: IUIConfig;
  conversations: any;
  conversation: any;
  currentUser: any;
  onSendTipClick: Function;
  showDrawer: Function;
  closeDrawer: Function;
  drawerVisible: boolean;
  activeMedia: any;
  tipOptionChecked: boolean;
  pickListOption: string;
}

class Compose extends PureComponent<IProps> {
  _input: any;

  state = { text: '', visibleSendTipModal: false };

  componentDidMount() {
    if (!this._input) this._input = createRef();
  }

  componentDidUpdate(previousProps) {
    const { sendMessageStatus } = this.props;
    if (previousProps.sendMessageStatus.success !== sendMessageStatus.success) {
      this.setState({ text: '' });
      this._input && this._input.focus();
    }
  }

  onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      this.send();
    }
  };

  onChange = (evt) => {
    this.setState({ text: evt.target.value });
  };

  onEmojiClick = (emojiObject) => {
    const { text } = this.state;
    this.setState({ text: text + emojiObject.emoji });
  };

  onPhotoUploaded = (data: any) => {
    if (!data || !data.response) {
      return;
    }
    const imageUrl =
      (data.response.data && data.response.data.imageUrl) || data.base64;
    this.props.sentFileSuccess({ ...data.response.data, ...{ imageUrl } });
  };

  send() {
    const {
      conversation,
      pickListOption,
      drawerVisible,
      activeMedia,
      closeDrawer,
      tipOptionChecked,
      getConversations: getConversationsHandler
    } = this.props;
    if (!this.state.text && isEmpty(activeMedia)) return;
    if (drawerVisible && !isEmpty(activeMedia)) {
      let request = {
        data: {
          recepients: [
            {
              recipientId: conversation.recipientInfo._id,
              recipientType: conversation.recipients.filter(
                (item) => item.sourceId === conversation.recipientInfo._id
              )[0].source
            }
          ],
          pickListOption: pickListOption,
          text: this.state.text,
          file: {
            _id: activeMedia.coverPhotoId,
            mimeType: activeMedia.mediaType !== 'video' ? 'image' : 'video',
            type:
              activeMedia.mediaType !== 'video'
                ? 'message-photo'
                : 'message-video',
            path: activeMedia.mediaCoverPhoto
          },
          mediaId: activeMedia.mediaId
        }
      } as any;
      if (activeMedia.mediaType === 'photo' || activeMedia.isSale === false) {
        request.data = { ...request.data, isTipOption: tipOptionChecked };
      }
      this.props.sendMediaMessage(request);
      closeDrawer();
    } else {
      this.props.sendMessage({
        data: {
          recepients: [
            {
              recipientId: conversation.recipientInfo._id,
              recipientType: conversation.recipients.filter(
                (item) => item.sourceId === conversation.recipientInfo._id
              )[0].source
            }
          ],
          pickListOption: pickListOption,
          text: this.state.text
        }
      });
    }
    if (pickListOption === 'all') {
      const {
        setActiveConversation: setActiveConversationHandler,
        getCountTotalNotRead: countTotalNotRead,
        setSearchItems,
        conversations
      } = this.props;
      const activeConversation =
        conversations.mapping[conversations.list.data[0]];
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
      setTimeout(() => {
        setActiveConversationHandler({
          conversationId: conversations.list.data[0],
          recipientId: activeConversation.recipientInfo._id
        });
        getConversationsHandler({
          limit: 25,
          offset: 0,
          type: 'private',
          keyword: ''
        });
      }, 1000);
      countTotalNotRead();
      setSearchItems({
        label: activeConversation.recipientInfo.name,
        value: activeConversation.recipientInfo._id
      });
    } else {
      setTimeout(() => {
        getConversationsHandler({
          limit: 25,
          offset: 0,
          type: 'private',
          keyword: ''
        });
      }, 1000);
    }
  }

  render() {
    const { text } = this.state;
    const {
      ui,
      sendMessageStatus: status,
      conversation,
      currentUser,
      onSendTipClick: handleClick,
      showDrawer: handleDrawer,
      pickListOption
    } = this.props;
    const uploadHeaders = {
      authorization: authService.getToken()
    };
    const isSendToUser =
      conversation.recipients &&
      conversation.recipients.filter(
        (i) => i.sourceId === conversation.recipientInfo._id
      )[0].source === 'user';
    if (!this._input) this._input = createRef();
    return (
      <div className="compose">
        <div
          style={{
            display: 'flex',
            height: '42px',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            alignItems: 'center',
            background: 'white',
            flex: 1
          }}
        >
          <Input.TextArea
            value={text}
            className="compose-input"
            placeholder="Write your message..."
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            disabled={
              status.sending ||
              (!conversation._id && pickListOption === 'individual')
            }
            autoFocus
            autoSize={{ minRows: 1, maxRows: 1 }}
            ref={(c) => {
              this._input = c;
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            height: '42px',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            background: 'white'
          }}
        >
          {ui.tipSwitch && !isSendToUser && (
            <div className="grp-icons opt">
              <div className="grp-send-tip">
                <DollarOutlined onClick={() => handleClick()} />
              </div>
            </div>
          )}

          <div className="grp-icons opt">
            <div className="grp-emotions">
              <SmileOutlined />
              <Emotions onEmojiClick={this.onEmojiClick.bind(this)} />
            </div>
          </div>

          {currentUser && !currentUser.isPerformer && (
            <div className="grp-icons opt">
              <div className="grp-pict">
                <ImageMessageUpload
                  headers={uploadHeaders}
                  uploadUrl={messageService.getMessageUploadUrl()}
                  onUploaded={this.onPhotoUploaded}
                  options={{ fieldName: 'message-photo' }}
                  messageData={{
                    text: 'sent a photo',
                    conversationId: conversation && conversation._id,
                    recipients: [
                      {
                        recipientId:
                          conversation &&
                          conversation.recipientInfo &&
                          conversation.recipientInfo._id,
                        recipientType: conversation.recipients.filter(
                          (item) =>
                            item.sourceId === conversation.recipientInfo._id
                        )[0].source
                      }
                    ],
                    pickListOption: 'individual'
                  }}
                />
              </div>
            </div>
          )}
          {currentUser && currentUser.isPerformer && (
            <div className="grp-icons opt">
              <div className="grp-pict">
                <PictureFilled onClick={() => handleDrawer()} />
              </div>
            </div>
          )}
        </div>
        <div className="grp-icons send">
          <div className="grp-send" onClick={this.send.bind(this)}>
            <SendOutlined />
          </div>
        </div>
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  ui: state.ui,
  conversations: state.conversation,
  sendMessageStatus: state.message.sendMessage,
  currentUser: state.user.current
});

const mapDispatch = {
  setActiveConversation,
  getCountTotalNotRead,
  setSearchItems,
  sendMessage,
  sendMediaMessage,
  sentFileSuccess,
  getConversations
};
export default connect(mapStates, mapDispatch)(Compose);
