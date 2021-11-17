import { PureComponent } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getBase64 } from 'src/common/utils';
import { Wrapper, Image, Overlay, Text } from './styled';

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return isLt2M;
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
}

export class AvatarUpload extends PureComponent<IProps, IState> {
  state = {
    loading: false,
    // eslint-disable-next-line react/destructuring-assignment
    imageUrl: this.props.imageUrl
  };

  static getDerivedStateFromProps(nextProps) {
    return { imageUrl: nextProps.imageUrl };
  }

  handleChange = (info) => {
    const { onUploaded } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false
        });
        onUploaded &&
          onUploaded({
            response: info.file.response,
            base64: imageUrl
          });
      });
    }
  };

  render() {
    const { loading } = this.state;
    const uploadButton = <>{loading ? <LoadingOutlined /> : '+'}</>;
    const { imageUrl } = this.state;
    const { headers, uploadUrl } = this.props;
    return (
      <div>
        <Wrapper>
          <Upload
            accept="image/*"
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action={uploadUrl}
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            headers={headers}
          >
            {imageUrl ? (
              <div className="info">
                <Image src={imageUrl} alt="avatar" />
                <Overlay>+</Overlay>
              </div>
            ) : (
              uploadButton
            )}
          </Upload>
        </Wrapper>
        <Text>Max upload size is 5MB!</Text>
      </div>
    );
  }
}
