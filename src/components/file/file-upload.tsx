/* eslint-disable react/destructuring-assignment */
import { Upload, message } from 'antd';
import { LoadingOutlined, CameraOutlined, FileDoneOutlined } from '@ant-design/icons';
import { PureComponent } from 'react';

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
}

interface IState {
  loading: boolean;
  fileUrl: string;
}

interface IProps {
  fieldName?: string;
  fileUrl?: string;
  uploadUrl?: string;
  headers?: any;
  onUploaded?: Function;
  onFileReaded?: Function;
}

export class FileUpload extends PureComponent<IProps, IState> {
  state = {
    loading: false,
    fileUrl: this.props.fileUrl
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.props.onFileReaded
      && this.props.onFileReaded(info.file.originFileObj);
      // Get this url from response in real world.
      this.setState({
        loading: false,
        fileUrl: info.file.response.data ? info.file.response.data.url : 'Done!'
      });
      this.props.onUploaded
        && this.props.onUploaded({
          response: info.file.response
        });
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <CameraOutlined />}
        {/* <div className="ant-upload-text">Upload</div> */}
      </div>
    );
    const { fileUrl } = this.state;
    const { headers, uploadUrl, fieldName = 'file' } = this.props;
    return (
      <Upload
        name={fieldName}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={uploadUrl}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={headers}
      >
        {fileUrl ? (
          <FileDoneOutlined style={{ fontSize: '28px', color: '#00ce00' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
