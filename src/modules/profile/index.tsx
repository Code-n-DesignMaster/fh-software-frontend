import { PureComponent } from 'react';
import { Button, message, Modal } from 'antd';
import { connect } from 'react-redux';
import {
  updateCurrentUserCover,
  updateCurrentUserAvatar
} from 'src/redux/user/actions';
import {
  performerService,
  paymentService,
  authService,
  subscriptionService
} from 'src/services';

import '@components/performer/performer.less';
import { OutlineButton } from '@components/buttons';
import VerifiedIcon from '@components/icons/verified';
import Link from 'next/link';
import Router from 'next/router';
import { redirectToErrorPage } from '@redux/system/actions';
import { IPerformer, IUIConfig } from 'src/interfaces';
import { SendTip } from '@components/performer/common/send-tip';
import _ from 'lodash';
import BuyButton from '@components/buy-button';
import SEO from './seo';
import Cover from './cover';
import Avatar from './avatar';
import Tabs from './tabs';
import ChatButton from './chat-button';
import {
  Wrapper,
  Content,
  Sidebar,
  Actions,
  Profile,
  Details,
  Body,
  Username,
  VerifiedLabel,
  Followers,
  FollowerCount,
  SubscribeButton,
  Message
} from './styled';

interface IProps {
  ui: IUIConfig;
  currentUser: any;
  performer: IPerformer;
  query: any;
  error: any;
  redirectToErrorPage: Function;
  updateCurrentUserCover: Function;
  updateCurrentUserAvatar: Function;
}

class PerformerProfile extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    isFreeSubscribed: false,
    isSubscribed: false,
    viewedVideo: true,
    visibleSendTipModal: false
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;

    try {
      const performer = (await (
        await performerService.findOne(query.username || query.id, {
          Authorization: ctx.token || ''
        })
      ).data) as IPerformer;

      if (!performer) {
        return Router.push('/error/404');
      }

      return {
        performer,
        query
      };
    } catch (e) {
      const error = await Promise.resolve(e);
      return { error };
    }
  }

  async componentDidMount() {
    const { performer, currentUser } = this.props;
    this.checkBlock();
    this.setState({
      isSubscribed: performer.isSubscribed,
      isFreeSubscribed: performer.isFreeSubscribed
    });
    const includeAdmin =
      (currentUser &&
        currentUser.roles &&
        currentUser.roles.includes('admin')) ||
      false;
    if (!includeAdmin) {
      performerService.increaseView(performer.username);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { performer } = nextProps;
    if (performer !== prevState.performer) {
      return {
        isSubscribed: performer.isSubscribed,
        isFreeSubscribed: performer.isFreeSubscribed
      };
    }
    return null;
  }

  async componentDidUpdate(prevProps) {
    const { performer, currentUser } = this.props;
    if (
      prevProps.performer &&
      prevProps.performer._id &&
      performer._id !== prevProps.performer._id
    ) {
      this.checkBlock();
      const includeAdmin =
        (currentUser &&
          currentUser.roles &&
          currentUser.roles.includes('admin')) ||
        false;
      if (!includeAdmin) {
        performerService.increaseView(performer.username);
      }
    }
  }

  async checkBlock() {
    const {
      redirectToErrorPage: redirectToErrorPageHandler,
      error
    } = this.props;
    if (error && process.browser) {
      redirectToErrorPageHandler({
        url: '/error',
        error: {
          ...error,
          message:
            // eslint-disable-next-line no-nested-ternary
            error.message === 'BLOCKED_BY_PERFORMER'
              ? 'You have been blocked by this performer, please contact us for any questions'
              : error.message === 'BLOCK_COUNTRY'
              ? 'You cannot view the profile of this model. This model has blocked access from your country'
              : error.message
        }
      });
    }
  }
  openSendTip() {
    if (!this.props.currentUser) {
      return Router.push('/auth/fan-register');
    }
    this.setState({ visibleSendTipModal: true });
  }

  closeSendTip() {
    this.setState({ visibleSendTipModal: false });
  }

  async sendTip(data: any) {
    const { performer } = this.props;
    const response = await paymentService.tip(performer._id, data);

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  async subscribeFree() {
    try {
      if (!this.props.currentUser) {
        return Router.push('/auth/fan-register');
      }
      const response = await subscriptionService.freeSubscribed({
        userId: this.props.currentUser._id,
        performerId: this.props.performer?._id,
        status: 'active'
      });
      const subscription = response.data;
      if (subscription) {
        window.location.reload();
        this.setState({ isFreeSubscribed: subscription.status === 'active' });
      }
    } catch (e) {
      const err = await e;
      message.error(err.message || 'error occurred, please try again later');
    }
  }

  async subscribe(token: string) {
    if (!this.props.currentUser) {
      return Router.push('/auth/fan-register');
    }

    const response = await paymentService.subscribe({
      type: 'monthly',
      performerId: this.props.performer._id,
      paymentToken: token
    });

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  handleViewWelcomeVideo() {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.pause();
    if (this.props.currentUser && this.props.performer) {
      let oldWvUserId = localStorage.getItem(
        `wv_${this.props.performer.welcomeVideoPath}`
      ) as any;
      oldWvUserId =
        oldWvUserId && oldWvUserId.length ? JSON.parse(oldWvUserId) : [];
      localStorage.setItem(
        `wv_${this.props.performer.welcomeVideoPath}`,
        JSON.stringify(
          _.uniqBy([...oldWvUserId, { _id: this.props.currentUser._id }], '_id')
        )
      );
    }
    this.setState({ viewedVideo: false });
  }

  render() {
    const { ui, currentUser, performer } = this.props;
    const {
      viewedVideo,
      isSubscribed,
      isFreeSubscribed,
      visibleSendTipModal
    } = this.state;
    const isCurrentUser =
      currentUser?.isPerformer && performer?.username === currentUser?.username;

    let hasViewWv = false;
    if (process.browser) {
      let wvUserId = localStorage.getItem(
        `wv_${performer.welcomeVideoPath}`
      ) as any;
      wvUserId = wvUserId && wvUserId.length ? JSON.parse(wvUserId) : [];
      hasViewWv = wvUserId.filter((w) => w._id === currentUser._id).length > 0;
    }

    return (
      <>
        <SEO performer={performer} />
        <Wrapper>
          <Cover
            canEdit={
              currentUser?.isPerformer &&
              performer?.username === currentUser?.username
            }
            performer={performer}
          />
          <Content>
            <Sidebar>
              <Profile>
                <Avatar imageUrl={performer?.avatar} canEdit={isCurrentUser} />
                <Details>
                  <Username>@{performer?.username}</Username>
                  <VerifiedLabel>
                    <VerifiedIcon />
                    verified member
                  </VerifiedLabel>
                  <Followers>
                    <FollowerCount>{performer.stats.subscribers}</FollowerCount>
                    Followers
                  </Followers>
                </Details>
              </Profile>
              <Actions>
                {currentUser ? (
                  <>
                    {currentUser._id !== (performer?._id || '') &&
                      !isSubscribed &&
                      Boolean(performer?.subsribeSwitch) &&
                      performer?.monthlyPrice && (
                        <BuyButton onComplete={this.subscribe.bind(this)}>
                          <SubscribeButton>
                            Subscribe Monthly $
                            {performer?.monthlyPrice.toFixed(2)}
                          </SubscribeButton>
                        </BuyButton>
                      )}
                    {currentUser._id !== (performer?._id || '') &&
                      !isSubscribed &&
                      !isFreeSubscribed &&
                      Boolean(performer?.freeSubsribeSwitch) && (
                        <SubscribeButton
                          onClick={
                            !isFreeSubscribed
                              ? this.subscribeFree.bind(this)
                              : null
                          }
                        >
                          Subscribe For Free
                        </SubscribeButton>
                      )}
                    {ui.tipSwitch &&
                      (!!performer?.enableChat || performer?.isSubscribed) &&
                      currentUser._id !== (performer?._id || '') && (
                        <OutlineButton onClick={this.openSendTip.bind(this)}>
                          Send a Tip
                        </OutlineButton>
                      )}
                    <ChatButton
                      currentUser={currentUser}
                      performer={performer}
                    />
                  </>
                ) : (
                  <>
                    <Message>
                      You&apos;re navigating as a guest user. Only members can
                      subscribe, see photos, watch videos and interact with the
                      models
                    </Message>
                    <Link href="/">
                      <SubscribeButton as="a">Sign in</SubscribeButton>
                    </Link>
                  </>
                )}
              </Actions>
            </Sidebar>
            <Body>
              <Tabs performer={performer} currentUser={currentUser} />
            </Body>
          </Content>
          {performer &&
            performer.welcomeVideoPath &&
            performer.activateWelcomeVideo && (
              <Modal
                key="welcome-video"
                width={768}
                visible={!hasViewWv && viewedVideo}
                title="Welcome video"
                onOk={this.handleViewWelcomeVideo.bind(this)}
                onCancel={this.handleViewWelcomeVideo.bind(this)}
                footer={[
                  <Button
                    type="primary"
                    onClick={this.handleViewWelcomeVideo.bind(this)}
                  >
                    Close
                  </Button>
                ]}
              >
                <video
                  autoPlay
                  src={performer.welcomeVideoPath}
                  controls
                  id="video"
                  style={{ width: '100%' }}
                />
              </Modal>
            )}
          <SendTip
            visibleSendTip={visibleSendTipModal}
            closeSendTip={this.closeSendTip.bind(this)}
            sendTip={this.sendTip.bind(this)}
            isMessage={false}
            minAmount={performer.tipAmount}
          ></SendTip>
        </Wrapper>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  ui: state.ui,
  currentUser: state.user.current
});

const mapDispatch = {
  updateCurrentUserCover,
  redirectToErrorPage,
  updateCurrentUserAvatar
};
export default connect(mapStates, mapDispatch)(PerformerProfile);
