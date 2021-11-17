import { PureComponent } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Upload,
  Progress,
  message,
  Checkbox
} from 'antd';
import { IPerformer } from 'src/interfaces';
import { AvatarUpload } from '@components/user/avatar-upload';
import { ImageUpload } from '@components/file/image-upload';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!'
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: 'Must be between ${min} and ${max}'
  }
};

interface IProps {
  onFinish: Function;
  user: IPerformer;
  updating?: boolean;
  options?: {
    uploadHeaders?: any;
    avatarUploadUrl?: string;
    onAvatarUploaded?: Function;
    onAvatarDeleted?: Function;
    coverUploadUrl?: string;
    onCoverUploaded?: Function;
    onCoverDeleted?: Function;
    beforeUpload?: Function;
    videoUploadUrl?: string;
    onVideoUploaded?: Function;
    updateActivate?: Function;
    uploadPercentage?: number;
  };
}

export class PerformerProfileForm extends PureComponent<IProps> {
  state = {
    isUploadingVideo: false,
    uploadVideoPercentage: 0,
    previewVideo: null,
    checked: false
  };

  componentDidMount() {
    const { user } = this.props;
    const { previewVideo } = this.state;
    user
      && user.welcomeVideoPath
      && this.setState(
        {
          previewVideo: user.welcomeVideoPath,
          checked: user.activateWelcomeVideo
        },
        () => {
          if (previewVideo) {
            const video = document.getElementById('video') as HTMLVideoElement;
            video.setAttribute('src', previewVideo);
          }
        }
      );
  }

  handleVideoChange = (info: any) => {
    info.file
      && info.file.percent
      && this.setState({ uploadVideoPercentage: info.file.percent });
    if (info.file.status === 'uploading') {
      this.setState({ isUploadingVideo: true });
      return;
    }
    if (info.file.status === 'done') {
      message.success('Welcome video uploaded');
      this.setState(
        {
          isUploadingVideo: false,
          previewVideo: info.file.response.data && info.file.response.data.url
        },
        () => {
          const { previewVideo } = this.state;
          if (previewVideo) {
            const video = document.getElementById('video') as HTMLVideoElement;
            video.setAttribute('src', previewVideo);
            this.props.options.onVideoUploaded(info.file.response.data.url);
          }
        }
      );
    }
  };

  handleCheckbox(e) {
    this.setState({ checked: e.target.checked })
    this.props.options.updateActivate(e.target.checked)
  }

  render() {
    const {
      onFinish, user, updating, options
    } = this.props;

    const {
      uploadHeaders,
      avatarUploadUrl,
      onAvatarUploaded,
      onAvatarDeleted,
      coverUploadUrl,
      onCoverUploaded,
      onCoverDeleted,
      videoUploadUrl
    } = options;
    const {
      isUploadingVideo,
      uploadVideoPercentage,
      previewVideo,
      checked
    } = this.state;
    return (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={(values) => {
          // eslint-disable-next-line no-param-reassign
          values.activateWelcomeVideo = checked;
          onFinish(values);
        }}
        validateMessages={validateMessages}
        initialValues={user}
        labelAlign="left"
        className="account-form"
      >
        <Row>
        <Col md={24}>
            <Form.Item name="quote">
              <TextArea rows={3} placeholder="Profile Quote" />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item name="bio">
              <TextArea rows={3} placeholder="Biography" />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label="Avatar">
              <div
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <div className="avatar">
                  <AvatarUpload
                    headers={uploadHeaders}
                    uploadUrl={avatarUploadUrl}
                    onUploaded={onAvatarUploaded}
                    imageUrl={user.avatar}
                  />
                  {user.avatar && <DeleteOutlined onClick={() => onAvatarDeleted()}/>}
                </div>
                <div>Support all types of Image. Max upload size is 5MB!</div>
              </div>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label="Cover">
              <div
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <div className="cover">
                  <ImageUpload
                    headers={uploadHeaders}
                    uploadUrl={coverUploadUrl}
                    onUploaded={onCoverUploaded}
                    imageUrl={user.cover}
                    options={{ fieldName: 'cover' }}
                  />
                  {user.cover && <DeleteOutlined onClick={() => onCoverDeleted()}/>}
                </div>
                <div>Ratio dimension is 4:1 (eg 1600px:400px). Max upload size is 5MB!</div>
              </div>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label="Welcome Video">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <div className="ant-col ant-col-16 ant-form-item-control">
                  <Upload
                    accept={'video/*'}
                    name="welcome-video"
                    showUploadList={false}
                    action={videoUploadUrl}
                    headers={uploadHeaders}
                    onChange={this.handleVideoChange.bind(this)}
                  >
                    {previewVideo && (
                    <video
                      src={previewVideo}
                      controls
                      id="video"
                      style={{ width: '250px', marginBottom: '10px' }}
                    />
                    )}
                    <div className="clear" />
                    <Button>
                      <UploadOutlined />
                      {' '}
                      Select File
                    </Button>
                  </Upload>

                  {uploadVideoPercentage ? (
                    <Progress percent={Math.round(uploadVideoPercentage)} />
                  ) : null}
                </div>
              </div>
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item>
              <Checkbox
                defaultChecked={!!user.activateWelcomeVideo}
                onChange={this.handleCheckbox.bind(this)}
              >
                Activate welcome video
              </Checkbox>
            </Form.Item>
          </Col>          
        </Row>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button
            className="primary"
            type="primary"
            htmlType="submit"
            loading={updating || isUploadingVideo}
            disabled={isUploadingVideo}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
