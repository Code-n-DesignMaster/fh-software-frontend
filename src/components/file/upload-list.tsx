/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { PureComponent } from 'react';
import {
  PictureOutlined,
  DeleteOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Progress } from 'antd';

interface IProps {
  remove: Function;
  files: any[];
}

interface IState {
  previews: Record<string, any>;
}

export default class UploadList extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      previews: {} as Record<string, any>
    };
  }

  renderPreview(file) {
    const { previews } = this.state;
    if (file.status === 'uploading') {
      return <LoadingOutlined />;
    }
    if (previews[file.uid]) {
      return <img alt="File" src={previews[file.uid]} />;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({
        ...previews,
        [file.uid]: reader.result
      });
    });
    reader.readAsDataURL(file);
    return <PictureOutlined />;
  }

  render() {
    const { files, remove } = this.props;
    return (
      <div className="ant-upload-list ant-upload-list-picture">
        {files.map((file) => (
          <div
            className="ant-upload-list-item ant-upload-list-item-uploading ant-upload-list-item-list-type-picture"
            key={file.uid}
            style={{ height: 'auto' }}
          >
            <div className="ant-upload-list-item-info">
              <span className="ant-upload-span">
                <div className="ant-upload-list-item-thumbnail ant-upload-list-item-file">
                  {this.renderPreview(file)}
                </div>
                <span className="ant-upload-list-item-name">
                  <span>
                    <b>{file.name}</b>
                  </span>
                  {' '}
                  |
                  {' '}
                  <span>
                    {(file.size / (1024 * 1024)).toFixed(2)}
                    {' '}
                    MB
                  </span>
                </span>
                {file.percent !== 100 && (
                  <span className="ant-upload-list-item-card-actions picture">
                    <a onClick={remove.bind(this, file)}>
                      <DeleteOutlined />
                    </a>
                  </span>
                )}

                {file.percent && (
                  <Progress style={{ position: 'absolute', bottom: '0px', right: '0px' }} percent={Math.round(file.percent)} />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
