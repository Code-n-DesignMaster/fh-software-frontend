import { PureComponent } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { message, Layout } from 'antd';
import Page from '@components/common/layout/page';
import { videoService } from '@services/video.service';
import { FormUploadVideo } from '@components/video/form-upload';
import Router from 'next/router';
import { IUIConfig, IUser } from 'src/interfaces';
import { getResponseError } from '@lib/utils';

interface IProps {
  ui: IUIConfig;
  user: IUser;
}
interface IFiles {
  fieldname: string;
  file: File;
}

interface IResponse {
  data: { _id: string };
}

const { Content } = Layout;

class UploadVideo extends PureComponent<IProps> {
  static authenticate = true;

  static onlyPerformer = true;

  state = {
    uploading: false,
    // preview: null,
    uploadPercentage: 0
  };

  _files: {
    thumbnail: File;
    video: File;
  } = {
    thumbnail: null,
    video: null
  };

  onUploading(resp: any) {
    this.setState({ uploadPercentage: resp.percentage });
  }

  beforeUpload(file: File, field: string) {
    this._files[field] = file;
  }

  onFileRemove(field: string) {
    this._files[field] = null;
  }

  async submit(data: any) {
    if (!this._files.video) {
      return message.error('Please select video!');
    }

    if (
      (data.isSaleVideo && !data.price) ||
      (data.isSaleVideo && data.price < 1)
    ) {
      return message.error('Invalid price');
    }
    // eslint-disable-next-line no-param-reassign
    data.tags = [...[], ...data.tags];
    // eslint-disable-next-line no-param-reassign
    data.participantIds = [...[], ...data.participantIds];
    const files = Object.keys(this._files).reduce((f, key) => {
      if (this._files[key]) {
        f.push({
          fieldname: key,
          file: this._files[key] || null
        });
      }
      return f;
    }, [] as IFiles[]) as [IFiles];

    await this.setState({
      uploading: true
    });
    try {
      (await videoService.uploadVideo(
        files,
        data,
        this.onUploading.bind(this)
      )) as IResponse;
      message.success('Video has been uploaded');
      // TODO - process for response data?
      Router.push('/model/video-manager');
      return this.setState({
        uploading: false
      });
    } catch (error) {
      message.error(
        getResponseError(error) || 'An error occurred, please try again!'
      );
      return this.setState({
        uploading: false
      });
    }
  }

  render() {
    const { uploading, uploadPercentage } = this.state;
    const { ui, user } = this.props;
    return (
      <>
        <Head>
          <title>HoneyDrip | Upload video</title>
          <meta
            property="og:title"
            content={`honeydrip.com - Upload video`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - Upload video`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Content>
          <div className="main-container">
            <Page>
              <div className="page-heading">
                <span>Video Upload</span>
              </div>
              <FormUploadVideo
                ui={ui}
                user={user}
                submit={this.submit.bind(this)}
                beforeUpload={this.beforeUpload.bind(this)}
                onFileRemove={this.onFileRemove.bind(this)}
                uploading={uploading}
                uploadPercentage={uploadPercentage}
              />
            </Page>
          </div>
        </Content>
      </>
    );
  }
}
const mapStates = (state: any) => ({
  ui: state.ui,
  user: state.user.current
});
export default connect(mapStates)(UploadVideo);
