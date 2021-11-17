import { PureComponent, createRef } from 'react';
import Head from 'next/head';

import { Form, message, Layout, Button, Col, Row, Upload } from 'antd';
import Page from '@components/common/layout/page';
import { FormInstance } from 'antd/lib/form';
import { UploadOutlined } from '@ant-design/icons';
import VideoUploadList from '@components/file/video-upload-list';
import { videoService } from '@services/video.service';
import { connect } from 'react-redux';
import Router from 'next/router';
import { IUIConfig } from 'src/interfaces';

interface IProps {
  ui: IUIConfig;
}

const validateMessages = {
  required: 'This field is required!'
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};
const { Content } = Layout;
const { Dragger } = Upload;

class BulkUploadVideo extends PureComponent<IProps> {
  static authenticate = true;

  static onlyPerformer = true;

  static async getInitialProps({ ctx }) {
    return ctx.query;
  }

  state = {
    uploading: false,
    fileList: []
  };

  formRef: any;

  componentDidMount() {
    if (!this.formRef) this.formRef = createRef();
  }

  onUploading(file, resp: any) {
    // this.setState({ uploadPercentage: resp.percentage });
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
    this.forceUpdate();
  }

  setFormVal(field: string, val: any) {
    const instance = this.formRef.current as FormInstance;
    instance.setFieldsValue({
      [field]: val
    });
  }

  beforeUpload(file, fileList) {
    this.setState({ fileList });
    return false;
  }

  remove(file) {
    const { fileList } = this.state;
    fileList.splice(
      fileList.findIndex((f) => f.uid === file.uid),
      1
    );
    this.setState({ fileList });
    this.forceUpdate();
  }

  async submit() {
    const { fileList } = this.state;
    if (!fileList.length) {
      return message.error('Please select video!');
    }

    const uploadFiles = fileList.filter(
      (f) => !['uploading', 'done'].includes(f.status)
    );
    if (!uploadFiles.length) return message.error('Please select new video!');

    await this.setState({ uploading: true });
    // eslint-disable-next-line no-restricted-syntax
    for (const file of uploadFiles) {
      try {
        // eslint-disable-next-line no-continue
        if (['uploading', 'done'].includes(file.status)) continue;
        file.status = 'uploading';
        // eslint-disable-next-line no-await-in-loop
        await videoService.uploadVideo(
          [
            {
              fieldname: 'video',
              file
            }
          ],
          {
            title: file.name,
            price: 0,
            description: '',
            tags: [],
            isSaleVideo: false,
            isSchedule: false,
            status: 'inactive'
          },
          this.onUploading.bind(this, file)
        );
      } catch (e) {
        message.error(`File ${file.name} error!`);
      }
    }
    message.success('Files has been uploaded!');
    await this.setState({ uploading: false }, () =>
      window.setTimeout(() => {
        Router.push('/model/video-manager');
      }, 1000)
    );
    return undefined;
  }

  render() {
    if (!this.formRef) this.formRef = createRef();
    const { uploading, fileList } = this.state;
    const { ui } = this.props;
    return (
      <>
        <Head>
          <title>HoneyDrip | Bulk upload video</title>
          <meta
            property="og:title"
            content={`honeydrip.com - Bulk upload video`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - Bulk upload video`}
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
                <span>Bulk upload video</span>
              </div>
              <Form
                {...layout}
                onFinish={this.submit.bind(this)}
                validateMessages={validateMessages}
                ref={this.formRef}
              >
                <Row className="ant-form-item">
                  <Col span={24}>
                    <div>
                      <Dragger
                        accept="video/*"
                        beforeUpload={this.beforeUpload.bind(this)}
                        multiple
                        showUploadList={false}
                        disabled={uploading}
                        listType="picture"
                      >
                        <p className="ant-upload-drag-icon">
                          <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag-drop files to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          Support video format only
                        </p>
                      </Dragger>
                      <VideoUploadList
                        files={fileList}
                        remove={this.remove.bind(this)}
                      />
                    </div>
                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    className="secondary"
                    htmlType="submit"
                    loading={uploading}
                    disabled={uploading || !fileList.length}
                  >
                    Upload All
                  </Button>
                </Form.Item>
              </Form>
            </Page>
          </div>
        </Content>
      </>
    );
  }
}
const mapStates = (state: any) => ({
  ui: state.ui
});
export default connect(mapStates)(BulkUploadVideo);
