/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import { PureComponent, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  loadMoreMessages,
  getMedias,
  clearActiveConversation,
  clearMessage,
  setSearchItems
} from '@redux/message/actions';
import Compose from './Compose';
import Message from './message';
import { LoaderInner } from '@components/loader';
import './MessageList.less';
import { SendTip } from '@components/performer/common/send-tip';
import { Button, Drawer, message, Select, Upload } from 'antd';
import { authService, messageService, paymentService } from '@services/index';
import Modal from 'antd/lib/modal/Modal';
import { MediaLibrary } from './MedieLibrary';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import SearchInput from './search-bar';
import { IUIConfig } from '@interface/ui-config';
import routes from 'server/routes';

interface IProps {
  loadMoreMessages: Function;
  getMedias: Function;
  clearActiveConversation: Function;
  clearMessage: Function;
  setSearchItems: Function;
  ui: IUIConfig;
  listMedias: any;
  message: any;
  pickListOption: string;
  conversation: any;
  currentUser: any;
  messagesRef: any;
}

class MessageList extends PureComponent<IProps> {
  messagesRef: any;

  state = {
    offset: 1,
    onloadmore: false,
    visibleSendTipModal: false,
    drawerVisible: false,
    viewedVideo: false,
    videoPath: '',
    activeMedia: {} as any,
    mediaType: 'all',
    tipOptionChecked: false
  };

  async componentDidMount() {
    if (!this.messagesRef) this.messagesRef = createRef();
    if (this.props.currentUser?.isPerformer) {
      this.getMediaData();
    }
  }

  async componentDidUpdate(prevState) {
    const { conversation } = this.props;
    if (
      prevState &&
      prevState.conversation &&
      prevState.conversation._id !== conversation._id
    ) {
      this.setState({ offset: 1, activeConversationId: conversation._id });
    }
  }

  renderMessages = () => {
    const { message, currentUser, conversation } = this.props;
    const recipientInfo = conversation && conversation.recipientInfo;
    const messages = message.items;
    let i = 0;
    const messageCount = messages.length;
    const tempMessages = [];
    while (i < messageCount) {
      const previous = messages[i - 1];
      const current = messages[i];
      const next = messages[i + 1];
      const isMine = current.senderId === currentUser?._id;
      const currentMoment = moment(current.createdAt);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        const previousMoment = moment(previous.createdAt);
        const previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.senderId === current.senderId;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        const nextMoment = moment(next.createdAt);
        const nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.senderId === current.senderId;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }
      if (current._id) {
        tempMessages.push(
          <Message
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
            recipient={recipientInfo}
            currentUser={currentUser}
            openMVideo={this.openWelcomeMVideo.bind(this)}
            onSendTipClick={this.onSendTipClick.bind(this)}
            buyGallery={this.buyGallery.bind(this)}
            buyVideo={this.buyVideo.bind(this)}
          />
        );
      }
      // Proceed to the next message.
      i += 1;
    }
    this.scrollToBottom();
    return tempMessages;
  };

  scrollToBottom() {
    const { onloadmore } = this.state;
    if (onloadmore) {
      return;
    }
    if (this.messagesRef && this.messagesRef.current) {
      const ele = this.messagesRef.current;
      window.setTimeout(() => {
        ele.scrollTop = ele.scrollHeight;
      }, 500);
    }
  }

  async handleScroll(conversation, event) {
    const { message, loadMoreMessages: handleLoadMore } = this.props;
    const { offset } = this.state;
    const { fetching, items, total } = message;
    const canloadmore = total > items.length;
    const ele = event.target;
    if (!canloadmore) return;
    if (ele.scrollTop === 0 && conversation._id && !fetching && canloadmore) {
      this.setState({ offset: offset + 1, onloadmore: true }, () => {
        const { offset: newOffset } = this.state;
        handleLoadMore({
          conversationId: conversation._id,
          limit: 25,
          offset: newOffset * 25
        });
      });
    }
  }

  onSendTipClick() {
    this.setState({ visibleSendTipModal: true });
  }

  closeSendTip() {
    this.setState({ visibleSendTipModal: false });
  }

  async sendTip(data: any) {
    const { conversation } = this.props;
    const response = await paymentService.tip(
      conversation.recipientInfo._id,
      data
    );

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  openWelcomeMVideo(url) {
    this.setState({ viewedVideo: true, videoPath: url });
  }

  handleViewWelcomeMVideo() {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.pause();
    this.setState({ viewedVideo: false });
  }

  getMediaData() {
    const { currentUser, getMedias: roadMediaLibrary } = this.props;

    roadMediaLibrary({
      limit: 24,
      offset: 0,
      performerId: currentUser?._id,
      userId: currentUser?._id || ''
    });
  }

  setActiveMedia(activeMedia: any) {
    this.setState({ activeMedia, tipOptionChecked: false });
  }

  setPickListOption(pickListOption) {
    if (pickListOption === 'all') {
      const {
        conversation,
        clearActiveConversation: handleClearActiveConversation,
        clearMessage: handleClearMessage,
        setSearchItems: resetSearchItems
      } = this.props;
      resetSearchItems();
      handleClearActiveConversation();
      handleClearMessage({ conversationId: conversation._id });
    }
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: !this.state.drawerVisible,
      tipOptionChecked: false
    });
  };

  handleCheckbox(e) {
    this.setState({ tipOptionChecked: e.target.checked });
  }

  async buyGallery(id: string, token: string) {
    const data = {
      paymentToken: token
    };

    const response = await paymentService.purchaseGallery(id, data);

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  async buyVideo(id: string, token: string) {
    const data = {
      paymentToken: token
    };

    const response = await paymentService.purchaseVideo(id, data);

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  onClose = () => {
    this.setState({
      drawerVisible: false,
      tipOptionChecked: false,
      activeMedia: {}
    });
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.getMediaData();
    }
  };

  getAvailableMedias(mediaList, mediaType) {
    switch (mediaType) {
      case 'all':
        return mediaList.filter(
          (m) =>
            (m.isPrivateChat && m.isPrivateChat === true) ||
            (m.isSaleGallery === undefined && m.isSaleVideo === undefined)
        );
      case 'video':
        return mediaList.filter(
          (m) =>
            m.isSaleVideo !== undefined &&
            m.isPrivateChat &&
            m.isPrivateChat === true
        );
      case 'gallery':
        return mediaList.filter(
          (m) =>
            m.isSaleGallery !== undefined &&
            m.isPrivateChat &&
            m.isPrivateChat === true
        );
      case 'photo':
        return mediaList.filter(
          (m) => m.isSaleGallery === undefined && m.isSaleVideo === undefined
        );
      default:
        return mediaList.filter(
          (m) =>
            (m.isPrivateChat && m.isPrivateChat === true) ||
            (m.isSaleGallery === undefined && m.isSaleVideo === undefined)
        );
    }
  }

  render() {
    const {
      ui,
      conversation,
      message,
      currentUser,
      listMedias,
      pickListOption
    } = this.props;
    const { fetching } = message;
    const {
      visibleSendTipModal,
      viewedVideo,
      videoPath,
      drawerVisible,
      activeMedia,
      tipOptionChecked,
      mediaType
    } = this.state;
    const includeAdmin =
      (currentUser &&
        currentUser.roles &&
        currentUser.roles.includes('admin')) ||
      false;
    const mediaList =
      listMedias.items instanceof Array
        ? this.getAvailableMedias(listMedias.items, mediaType)
        : [];
    if (!this.messagesRef) this.messagesRef = createRef();
    return (
      <div
        className="message-list"
        ref={this.messagesRef}
        onScroll={this.handleScroll.bind(this, conversation)}
      >
        {(conversation && conversation._id) || pickListOption === 'all' ? (
          <>
            <div className="message-list-container">
              {conversation &&
                conversation.recipientInfo &&
                currentUser &&
                currentUser?.isPerformer && (
                  <div className="mess-recipient">
                    <SearchInput
                      // @ts-ignore
                      conversation={conversation}
                      setPickListOption={this.setPickListOption.bind(this)}
                    />
                  </div>
                )}
              {conversation &&
                conversation.recipientInfo &&
                currentUser &&
                !currentUser?.isPerformer && (
                  <div className="mess-recipient">
                    <routes.Link
                      route={`/model/${conversation.recipientInfo.username}`}
                      params={{ username: conversation.recipientInfo.username }}
                    >
                      <a>
                        <img
                          alt=""
                          src={
                            conversation.recipientInfo.avatar ||
                            '/no-avatar.png'
                          }
                        />{' '}
                        {conversation.recipientInfo.name}
                      </a>
                    </routes.Link>
                  </div>
                )}
              {fetching && (
                <div className="text-center">
                  <LoaderInner />
                </div>
              )}
              {this.renderMessages()}
              {!conversation.isBlocked ? (
                !conversation.recipientInfo?.subsribeSwitch ? (
                  !conversation.enableChat ? (
                    !fetching &&
                    !conversation.isSubscribed &&
                    !includeAdmin && (
                      <div className="sub-text">
                        This creator does not accept messages right now
                      </div>
                    )
                  ) : (
                    !fetching &&
                    !conversation.isSubscribed &&
                    !includeAdmin &&
                    !conversation.hasSentTip && (
                      <div className="sub-text">
                        <div className="text-center">
                          <p>Please send a tip to start a conversation</p>
                          <Button
                            type="primary"
                            onClick={this.onSendTipClick.bind(this)}
                          >
                            Send tip
                          </Button>
                        </div>
                      </div>
                    )
                  )
                ) : !conversation.enableChat ? (
                  !fetching &&
                  !conversation.isSubscribed &&
                  !includeAdmin && (
                    <div className="sub-text">
                      Please subscribe to this creator to start a conversation
                    </div>
                  )
                ) : (
                  !fetching &&
                  !conversation.isSubscribed &&
                  !includeAdmin &&
                  !conversation.hasSentTip && (
                    <div className="sub-text">
                      <div className="text-center">
                        <p>
                          Please subscribe to this creator to start a
                          conversation or send a tip to start a conversation
                        </p>
                        <Button
                          type="primary"
                          onClick={this.onSendTipClick.bind(this)}
                        >
                          Send tip
                        </Button>
                      </div>
                    </div>
                  )
                )
              ) : currentUser?.isPerformer ? (
                <div className="sub-text">
                  Unblock this user to resume conversation
                </div>
              ) : (
                <div className="sub-text">
                  You have been blocked by this creator
                </div>
              )}
            </div>
            <Drawer
              title={
                <div style={{ alignItems: 'center', display: 'flex' }}>
                  <p
                    style={{
                      width: '100%',
                      marginBottom: '0px',
                      textAlign: 'center'
                    }}
                  >
                    MEDIA LIBRARY
                  </p>
                  <Upload
                    accept={'image/*'}
                    name={'media-import'}
                    showUploadList={false}
                    action={messageService.getMediaUploadUrl(currentUser?._id)}
                    headers={{ authorization: authService.getToken() }}
                    onChange={this.handleChange}
                  >
                    <Button
                      style={{
                        position: 'absolute',
                        right: '120px',
                        bottom: '11px'
                      }}
                    >
                      Import
                    </Button>
                  </Upload>
                  <Select
                    style={{
                      position: 'absolute',
                      right: '10px',
                      width: '100px'
                    }}
                    defaultValue="all"
                    onChange={(e) => this.setState({ mediaType: e })}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="video">Video</Select.Option>
                    <Select.Option value="photo">Photo</Select.Option>
                    <Select.Option value="gallery">Gallery</Select.Option>
                  </Select>
                </div>
              }
              placement="bottom"
              closable={false}
              onClose={this.onClose}
              visible={drawerVisible}
              getContainer={false}
              mask={false}
              height={'69vh'}
              style={{ position: 'absolute', bottom: '52px' }}
            >
              <div className="medie-content">
                <div>
                  <MediaLibrary
                    medias={mediaList}
                    drawerVisible={drawerVisible}
                    setActiveMediaItem={this.setActiveMedia.bind(this)}
                  ></MediaLibrary>
                </div>
                {ui.tipSwitch &&
                  activeMedia &&
                  (activeMedia?.mediaType == 'photo' ||
                    activeMedia.isSale === false) && (
                    <div className="add-tip">
                      <Checkbox
                        checked={tipOptionChecked}
                        onChange={this.handleCheckbox.bind(this)}
                      >
                        Add Tip Option
                      </Checkbox>
                    </div>
                  )}
              </div>
            </Drawer>
            {!conversation.isBlocked &&
              (conversation.isSubscribed ||
                includeAdmin ||
                (!!conversation.enableChat && conversation.hasSentTip)) && (
                <Compose
                  conversation={conversation}
                  drawerVisible={drawerVisible}
                  activeMedia={activeMedia}
                  tipOptionChecked={tipOptionChecked}
                  pickListOption={pickListOption}
                  onSendTipClick={this.onSendTipClick.bind(this)}
                  showDrawer={this.showDrawer.bind(this)}
                  closeDrawer={this.onClose.bind(this)}
                />
              )}
          </>
        ) : (
          <p className="text-center">Click on conversation to start</p>
        )}
        <Modal
          key="welcome-message-video"
          width={768}
          visible={viewedVideo}
          title="Welcome message video"
          onOk={this.handleViewWelcomeMVideo.bind(this)}
          onCancel={this.handleViewWelcomeMVideo.bind(this)}
          footer={[
            <Button
              type="primary"
              onClick={this.handleViewWelcomeMVideo.bind(this)}
            >
              Close
            </Button>
          ]}
        >
          <video
            autoPlay
            src={videoPath}
            controls
            id="video"
            style={{ width: '100%' }}
          />
        </Modal>
        <SendTip
          visibleSendTip={visibleSendTipModal}
          closeSendTip={this.closeSendTip.bind(this)}
          sendTip={this.sendTip.bind(this)}
          isMessage={true}
          minAmount={conversation.tipAmount}
        ></SendTip>
      </div>
    );
  }
}

const mapStates = (state: any) => {
  const { conversationMap } = state.message;
  const { activeConversation, listMedias, pickListOption } = state.conversation;
  const messages = conversationMap[activeConversation._id]
    ? conversationMap[activeConversation._id].items || []
    : [];
  const totalMessages = conversationMap[activeConversation._id]
    ? conversationMap[activeConversation._id].total || 0
    : 0;
  const fetching = conversationMap[activeConversation._id]
    ? conversationMap[activeConversation._id].fetching || false
    : false;
  return {
    ui: state.ui,
    message: {
      items: messages,
      total: totalMessages,
      fetching
    },
    listMedias: listMedias,
    pickListOption: pickListOption,
    conversation: activeConversation,
    currentUser: state.user.current
  };
};

const mapDispatch = {
  loadMoreMessages,
  getMedias,
  clearActiveConversation,
  clearMessage,
  setSearchItems
};
export default connect(mapStates, mapDispatch)(MessageList);
