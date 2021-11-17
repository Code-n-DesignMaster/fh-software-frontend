import { message } from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  videoService,
  paymentService,
  subscriptionService
} from '@services/index';
import { IVideoResponse, IUIConfig } from 'src/interfaces';
import { VideoPlayer } from '@components/video';

import Router from 'next/router';
import { CartContext } from 'src/context/cart';
import Resource from '@components/resource';
import Comments from 'src/modules/comments';
import Details from 'src/modules/resource-details';
import SEO from './seo';
import { Wrapper, Inner, VideoSection, Aside, Title } from './styled';

interface IProps {
  query: any;
  user: any;
  ui: IUIConfig;
  video: IVideoResponse;
  isServer: boolean;
}

function timeDuration(s) {
  if (!s) {
    return '00:00';
  }
  const sec_num: any = parseInt(s, 10); // don't forget the second param
  let hours: any = Math.floor(sec_num / 3600);
  let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: any = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${(hours ? `${hours}:` : '') + minutes}:${seconds}`;
}

class VideoViewPage extends PureComponent<IProps> {
  static authenticate: boolean = true;

  static noredirect: boolean = true;

  static async getInitialProps({ ctx }) {
    const { query, isServer } = ctx;
    let video;
    try {
      video = (await (
        await videoService.findOne(query.id, {
          Authorization: ctx.token
        })
      ).data) as IVideoResponse;
      if (video) {
        return {
          video,
          isServer,
          query
        };
      }
    } catch (e) {
      return {
        query,
        video,
        isServer
      };
    }
  }

  state = {
    includeAdmin: false
  };

  async componentDidMount() {
    const { video, isServer, user } = this.props;
    if (!video) {
      return Router.push(
        { pathname: '/home', query: { id: user._id } },
        '/home'
      );
    }
    const includeAdmin =
      (user && user.roles && user.roles.includes('admin')) || false;
    this.setState({
      includeAdmin
    });
    if (!isServer && !includeAdmin) {
      videoService.increaseView(video._id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.video && prevProps.video._id !== this.props.video._id) {
      const { video } = this.props;
      if (!this.state.includeAdmin) {
        videoService.increaseView(video._id);
      }
    }
  }

  async buyVideo(token: string) {
    const response = await paymentService.purchaseVideo(this.props.video._id, {
      paymentToken: token
    });

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  async subscribeFree() {
    try {
      await subscriptionService.freeSubscribed({
        userId: this.props.user._id,
        performerId: this.props.video.performer._id,
        status: 'active'
      });
      window.location.reload();
    } catch (e) {
      alert('Error occurred, please try again later');
    }
  }

  async subscribeMonthly(token: string) {
    const response = await paymentService.subscribe({
      type: 'monthly',
      performerId: this.props.video.performer._id,
      paymentToken: token
    });

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  render() {
    const { video } = this.props;

    let playSource;
    let videoType;

    if (video.mux && video.mux.processing === false) {
      playSource = {
        file: `${video.mux.playbackId}.m3u8`,
        image: video && video.thumbnail ? video.thumbnail : ''
      };
      videoType = 'video/mux';
    } else {
      playSource = {
        file: video && video.video && video.video.url ? video.video.url : '',
        image: video && video.thumbnail ? video.thumbnail : ''
      };
      videoType = 'video/mp4';
    }

    const videoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: playSource.file,
          type: videoType
        }
      ]
    };

    return (
      <>
        <SEO video={video} />
        <Wrapper>
          <Inner>
            <VideoSection>
              <Resource
                user={this.props.user}
                resource={video}
                isInCart={this.context.hasItem(video._id)}
                onAddToCart={() => this.context.addItem(video)}
                onSubscribe={this.subscribeMonthly.bind(this)}
                onSubscribeFree={this.subscribeFree.bind(this)}
                onBuy={this.buyVideo.bind(this)}
              >
                <div>
                  {video && video.video && video.video.url ? (
                    <VideoPlayer {...videoJsOptions} />
                  ) : (
                    <h3>No source found.</h3>
                  )}
                </div>
              </Resource>
              <Title>
                {video.title} - {timeDuration(video.video.duration)}
              </Title>
            </VideoSection>
            <Aside>
              <Details
                resource={video}
                type="video"
                currentUser={this.props.user}
              />
              <Comments objectId={video._id} currentUser={this.props.user} />
            </Aside>
          </Inner>
        </Wrapper>
      </>
    );
  }
}

VideoViewPage.contextType = CartContext;

const mapStates = (state: any) => ({
  user: state.user.current,
  ui: { ...state.ui }
});

export default connect(mapStates)(VideoViewPage);
