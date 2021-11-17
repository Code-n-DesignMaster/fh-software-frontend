/* eslint-disable jsx-a11y/label-has-associated-control */
import { PureComponent } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  Progress,
  Switch,
  DatePicker,
  Row,
  Col,
  Modal,
  Radio
} from 'antd';
import { IVideoUpdate, IVideoCreate, IUser } from 'src/interfaces';
import { CameraOutlined } from '@ant-design/icons';
import { authService, performerService, videoService } from '@services/index';
import moment from 'moment';
import './video.less';
import { debounce } from 'lodash';
import { ImageUpload } from '@components/file';
import { detection } from "@lib/deepai";

interface IProps {
  ui?: any;
  user?: IUser;
  video?: IVideoUpdate;
  submit?: Function;
  beforeUpload?: Function;
  onThumneilUploaded?: Function;
  uploading?: boolean;
  uploadPercentage?: number;
  onFileRemove?: Function;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};

const { Option } = Select;

const validateMessages = {
  required: 'This field is required!'
};

export class FormUploadVideo extends PureComponent<IProps> {
  state = {
    remainCount: 30,
    previewThumbnail: null,
    previewVisible: false,
    previewImage:null,
    previewVideo: null,
    isSale: false,
    isSchedule: false,
    scheduledAt: moment(),
    performers: [],
    fileList: [],
    showThumbnailUpload: true,
    showVideoUpload : true,
    isSendInPrivateChat : false
  };

  formRef: any;

  componentDidMount() {
    const { video, user } = this.props;    
    if (video) {
      this.setState(
        {
          fileList: video.thumbnail ? [{
            uid: video.thumbnail,
            name: 'image.png',
            status: 'done',
            url: video.thumbnail
          }] : [],
          remainCount: 30 - video.title.length,
          previewThumbnail: video.thumbnail ? video.thumbnail : null,
          previewVideo: video.video && video.video.url ? video.video.url : null,
          isSale: video.isSaleVideo,
          isSchedule: video.isSchedule,
          scheduledAt: video.scheduledAt ? moment(video.scheduledAt) : moment(),
          isSendInPrivateChat: video.isPrivateChat
        },
        () => {
          const { previewVideo } = this.state;
          if (previewVideo) {
            const videoEl = document.getElementById(
              'video'
            ) as HTMLVideoElement;
            videoEl.setAttribute('src', previewVideo);
          }
        }
      );
      this.getPerformers('', [video.participantIds]);
    } else {
      this.getPerformers('', [user._id]);
    }
  }
  
  handleNameChange (e){
    this.setState({remainCount: 30 - e.target.value.length })
  }  

  onSwitch(field: string, checked: boolean) {
    if (field === 'saleVideo') {
      this.setState({
        isSale: checked
      });
    }
    if (field === 'scheduling') {
      this.setState({
        isSchedule: checked
      });
    }
    if (field === 'isPrivateChat') {
      this.setState({
        isSendInPrivateChat: checked
      });
    }
  }

  onSchedule(val: any) {
    this.setState({
      scheduledAt: val
    });
  }

  getPerformers = debounce(async (q, performerIds) => {
    try {
      const resp = await (await performerService.search({ q, performerIds: performerIds || '' })).data;
      const performers = resp.data || [];
      this.setState({ performers });
    } catch (e) {
      const err = await e;
      message.error(err?.message || 'Error occured');
    }
  }, 500);

  beforeUpload(file: File, field: string) {
    if(field === "thumbnail"){
      this.setState({
        showThumbnailUpload: false
      });
    }
    else if(field === "video"){
      this.setState({
        showVideoUpload : false
      });
    }

    const { beforeUpload: beforeUploadHandler } = this.props;
    return beforeUploadHandler(file, field);
  }

  onThumbnailRemove = async file =>{
    this.setState({
      showThumbnailUpload: true
    });

    const { onFileRemove: onFileRemoveHandler } = this.props;
    return onFileRemoveHandler("thumbnail");
  }

  onVideoRemove = async file =>{
    this.setState({
      showVideoUpload : true
    });

    const { onFileRemove: onFileRemoveHandler } = this.props;
    return onFileRemoveHandler("video");
  }

  handleCancel() {
    this.setState({ previewVisible: false });
  }

  handlePreview = async file =>{
    this.setState({
      previewVisible: true,
      previewImage: file.thumbUrl
    });
  }

  handleChange = info => {
    const { ui } = this.props;
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, async (imageUrl) => {
        if (ui.nudirtySwitch) {
        const resp = await detection(imageUrl) as any;
        if (resp && resp.output && resp.output.nsfw_score && (resp.output.nsfw_score  * 100)> ui.nudirtyMinScore) {
          message.error('Nudity detected. Please select another picture!');
          this.setState({
            showThumbnailUpload: true,
            previewThumbnail: ''
          });
          const { onFileRemove: onFileRemoveHandler } = this.props;
          onFileRemoveHandler("thumbnail");
          return;
        }
        }
          this.setState({
            previewThumbnail: imageUrl
          })
      });
    };
  }
  render() {
    const uploadHeaders = {
      authorization: authService.getToken()
    };
    const {
      video, submit, uploading, uploadPercentage, user, onThumneilUploaded
    } = this.props;
    const {
      remainCount,
      previewThumbnail,
      previewVisible,
      previewImage,
      previewVideo,
      performers,
      isSale,
      isSchedule,
      scheduledAt,
      showThumbnailUpload,
      showVideoUpload,
      isSendInPrivateChat
    } = this.state;
    const haveVideo = !!video;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <Form
        {...layout}
        onFinish={(values: IVideoUpdate) => {
          const data = values;
          if (isSchedule) {
            data.scheduledAt = scheduledAt;
          }
          if (!data.isSaleVideo) {
            data.price = 0;
          }
          submit(data);
        }}
        onFinishFailed={() => message.error('Please complete the required fields')}
        name="form-upload"
        validateMessages={validateMessages}
        initialValues={
          video
          || ({
            title: '',
            price: 1,
            description: '',
            tags: [],
            isSaleVideo: false,
            isSendInPrivateChat: false,
            participantIds: [user._id],
            isSchedule: false,
            status: 'active'
          } as IVideoCreate)
        }
        className="account-form"
      >
        <Row>
          <Col md={12} xs={24}>
            <Form.Item
              label="Title"
              labelCol={{ span: 24 }}
              name="title"
              rules={[
                { required: true, message: 'Please input title of video!' }
              ]}
              extra={(<p className='characters-remaining'>{`${remainCount} characters remaining`}</p>)}
            >
              <Input placeholder="Enter video title" maxLength={30} onChange={this.handleNameChange.bind(this)} />
            </Form.Item>
            <Form.Item label="Tag" labelCol={{ span: 24 }} name="tags">
              <Select
                mode="tags"
                style={{ width: '100%' }}
                size="middle"
                showArrow={false}
                defaultActiveFirstOption={false}
                placeholder="Add Tags"
              />
            </Form.Item>
            <Form.Item
              label="Participants"
              labelCol={{ span: 24 }}
              name="participantIds"
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                showSearch
                placeholder="Search performers here"
                optionFilterProp="children"
                onSearch={this.getPerformers.bind(this)}
                loading={uploading}
              >
                {performers
                  && performers.length > 0
                  && performers.map((p) => (
                    <Option key={p._id} value={p._id}>
                      {p.name}
                      /
                      {p.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="isSaleVideo"
              label="For Sale?"
              labelCol={{ span: 24 }}
            >
              <Switch
                checked={isSale}
                onChange={this.onSwitch.bind(this, 'saleVideo')}
              />
            </Form.Item>
            {isSale && (
              <Form.Item name="price" label="Price $" labelCol={{ span: 24 }}>
                <InputNumber min={1} />
              </Form.Item>
            )}
              <Form.Item
              name="isPrivateChat"
              label="Send in private chat"
              labelCol={{ span: 24 }}
            >
              <Switch
                checked={isSendInPrivateChat}
                onChange={this.onSwitch.bind(this, 'isPrivateChat')}
              />
            </Form.Item>
            <Form.Item
              name="isSchedule"
              label="Schedule activate time while status 'Inactive'"
              labelCol={{ span: 24 }}
            >
              <Switch
                checked={isSchedule}
                onChange={this.onSwitch.bind(this, 'scheduling')}
              />
            </Form.Item>
            {isSchedule && (
              <Form.Item label="Schedule at">
                <DatePicker
                  disabledDate={(currentDate) => currentDate && currentDate < moment().endOf('day')}
                  defaultValue={scheduledAt}
                  onChange={this.onSchedule.bind(this)}
                />
              </Form.Item>
            )}
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              name="description"
              label="Description"
              labelCol={{ span: 24 }}
            >
              <Input.TextArea rows={3} />
            </Form.Item>           
            <div key="thumbnail" className="ant-form-item">
              <label>Thumbnail</label>
              {!haveVideo && <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept="image/*"
                multiple={false}
                maxCount={1}
                showUploadList={previewThumbnail!==''}
                disabled={uploading || haveVideo }
                onChange = {this.handleChange}
                onPreview={this.handlePreview}
                onRemove={this.onThumbnailRemove}
                beforeUpload={(file) => this.beforeUpload(file, 'thumbnail')}
              >
                  {
                    showThumbnailUpload ? <CameraOutlined /> : ''
                    }
              </Upload>}
              {haveVideo && <ImageUpload
                    headers={uploadHeaders}
                    uploadUrl={videoService.getVideoThumnailUploadUrl(video._id)}
                    onUploaded={onThumneilUploaded}
                    imageUrl={video.thumbnail}
                    options={{ fieldName: 'thumbnail' }}
                  />
              }
                <Modal
                  visible={previewVisible}
                  bodyStyle={{paddingTop: '50px',textAlign: 'center'}}
                  footer={null}
                  onCancel={this.handleCancel.bind(this)}
                >
                  <img src={previewImage} />
                </Modal>
            </div>
            <Form.Item label="Video File" labelCol={{ span: 24 }}>
              {!previewVideo && (
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept="video/*"
                multiple={false}
                showUploadList
                disabled={uploading || haveVideo}
                onRemove={this.onVideoRemove}
                beforeUpload={(file) => this.beforeUpload(file, 'video')}
              >
                { showVideoUpload ? <CameraOutlined />: "" }
              </Upload>
              )}
              {previewVideo && <video controls id="video" style={{ width: '250px' }} />}
              {uploadPercentage ? (
                <Progress percent={Math.round(uploadPercentage)} />
              ) : null}
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please select status!' }]}
            >
              <Select>
                <Select.Option key="error" value="file-error" disabled>
                  File Error
                </Select.Option>
                <Select.Option key="active" value="active">
                  Active
                </Select.Option>
                <Select.Option key="inactive" value="inactive">
                  Inactive
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button className="primary" htmlType="submit" loading={uploading} disabled={uploading}>
            {haveVideo ? 'Update' : 'Upload'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
