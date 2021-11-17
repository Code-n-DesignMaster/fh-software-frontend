/* eslint-disable react/destructuring-assignment */
import { Upload, message } from 'antd';
import { LoadingOutlined, PaperClipOutlined, PictureFilled } from '@ant-design/icons';
import { PureComponent } from 'react';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!');
  }
  return isLt5M;
}

interface IState {
  loading: boolean;
  imageUrl: string;
}

interface IProps {
  imageUrl?: string;
  uploadUrl?: string;
  headers?: any;
  onUploaded?: Function;
  onFileReaded?: Function;
  options?: any;
  messageData?: any;
}

export class ImageMessageUpload extends PureComponent<IProps, IState> {
  state = {
    loading: false,
    imageUrl: this.props.imageUrl
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.props.onFileReaded
        && this.props.onFileReaded(info.file.originFileObj);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false
        });
        this.props.onUploaded
          && this.props.onUploaded({
            response: info.file.response,
            base64: imageUrl
          });
      });
    }
  };

  render() {
    const { options = {} } = this.props;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PaperClipOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const { headers, uploadUrl, messageData } = this.props;
    return (
      <Upload
        accept={'image/*'}
        name={options.fieldName || 'file'}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={uploadUrl}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={headers}
        data={messageData}
      >
        <PictureFilled />
        {/* {imageUrl ? (
          <img src={imageUrl} alt="file" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )} */}
      </Upload>
    );
  }
}
