import { PureComponent } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, CameraOutlined, EditOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!');
  }
  return isJpgOrPng && isLt5M;
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
}

export class ImageUpload extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      imageUrl: props.imageUrl
    };
  }

  static getDerivedStateFromProps( nextProps ){
    return { imageUrl: nextProps.imageUrl };
  }

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { onFileReaded, onUploaded } = this.props;
      onFileReaded && onFileReaded(info.file.originFileObj);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false
        });
        onUploaded
          && onUploaded({
            response: info.file.response,
            base64: imageUrl
          });
      });
    }
  };

  render() {
    const { options = {}, headers, uploadUrl } = this.props;
    const { loading, imageUrl } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <CameraOutlined />}
        {/* <div className="ant-upload-text">Upload</div> */}
      </div>
    );
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
      >
        {imageUrl ? (
          <div className='info'>
            <span className='actions'><EditOutlined /></span>
            <img src={imageUrl} alt="file" style={{ width: '100%' }} />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
