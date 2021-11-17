import { PureComponent } from 'react';
import Head from 'next/head';
import Page from '@components/common/layout/page';
import { connect } from 'react-redux';
import { videoService } from '@services/video.service';
import { FormUploadVideo } from '@components/video/form-upload';
import { IVideoUpdate, IUIConfig, IUser } from 'src/interfaces';
import Loader from '@components/loader';
import Router from 'next/router';
import { message } from 'antd';
import { getResponseError } from '@lib/utils';
import { detection } from '@lib/deepai';

interface IProps {
  id: string;
  ui: IUIConfig;
  user: IUser;
  onFileRemove: Function;
}
class VideoUpdate extends PureComponent<IProps> {
  static authenticate = true;

  static onlyPerformer = true;

  static async getInitialProps({ ctx }) {
    return ctx.query;
  }

  state = {
    submitting: false,
    fetching: true,
    video: {} as IVideoUpdate
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      const resp = await videoService.findById(id);
      this.setState({ video: resp.data });
    } catch (e) {
      message.error('Video not found!');
    } finally {
      this.setState({ fetching: false });
    }
  }

  async submit(data: any) {
    try {
      const { id } = this.props;
      if (data.isSaleVideo && (data.price < 1 || !data.price)) {
        return message.error('Invalid price');
      }
      if (data.isSchedule && !data.scheduledAt) {
        return message.error('Invalid schedule date');
      }
      this.setState({ submitting: true });
      let submitData = {
        ...data,
        thumbnail: this.state.video.thumbnail
      };
      if (!this.state.video.thumbnail) {
        submitData = {
          ...submitData,
          thumbnailId: null
        };
      }

      await videoService.update(id, submitData);
      this.setState({ submitting: false });
      message.success('Changes saved.');
      return Router.push('/model/video-manager');
    } catch (e) {
      // TODO - check and show error here
      message.error(
        getResponseError(e) || 'Something went wrong, please try again!'
      );
      return this.setState({ submitting: false });
    }
  }

  beforeUpload(file: File, field: string) {
    let { video } = this.state;
    video[field] = file;
    this.setState({ video: video });
  }

  async handleThumbnailUploaded(data: any) {
    let { video } = this.state;
    const { ui } = this.props;
    let newVideo = JSON.parse(JSON.stringify(video));
    if (ui.nudirtySwitch) {
      const resp = (await detection(data.base64)) as any;
      if (
        resp &&
        resp.output &&
        resp.output.nsfw_score &&
        resp.output.nsfw_score * 100 > ui.nudirtyMinScore
      ) {
        message.error('Nudity detected. Please select another picture!');
        newVideo['thumbnail'] = null;
        newVideo['thumbnailId'] = null;
        this.setState({ video: newVideo });
        return;
      }
    }
    newVideo['thumbnail'] = data.response.data.url;
    message.success('Changes saved.');
    this.setState({ video: newVideo });
  }

  render() {
    const { video, submitting, fetching } = this.state;
    const { ui, user } = this.props;
    return (
      <>
        <Head>
          <title>HoneyDrip | Update Video</title>
          <meta
            property="og:title"
            content={`honeydrip.com - Update Video`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - Update Video`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>

        <div className="main-container">
          {/* <BreadcrumbComponent
            breadcrumbs={[
              { title: 'Video management', href: '/model/video-manager' },
              { title: video.title ? video.title : 'Detail video' },
              { title: 'Update' }
            ]}
          /> */}

          <Page>
            <div className="page-heading">
              <span>Video Update</span>
            </div>
            {fetching ? (
              <Loader />
            ) : (
              <FormUploadVideo
                user={user}
                video={video}
                submit={this.submit.bind(this)}
                beforeUpload={this.beforeUpload.bind(this)}
                uploading={submitting}
                onThumneilUploaded={this.handleThumbnailUploaded.bind(this)}
              />
            )}
          </Page>
        </div>
      </>
    );
  }
}
const mapStates = (state: any) => ({
  ui: state.ui,
  user: state.user.current
});
export default connect(mapStates)(VideoUpdate);
