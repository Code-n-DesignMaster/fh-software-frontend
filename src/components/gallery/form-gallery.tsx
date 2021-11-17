/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Form, Input, Button, Select, Row, Col, Switch, InputNumber, Radio, Upload, message } from 'antd';
import { DeleteOutlined, InboxOutlined, SelectOutlined } from '@ant-design/icons';
import { IGallery, IPhotos } from 'src/interfaces';
import Router from 'next/router';
import './gallery.less';
import { PureComponent, createRef } from 'react';
import UploadList from '@components/file/upload-list';
import { ReactSortable } from "react-sortablejs";

const { Dragger } = Upload;
interface IProps {
  gallery?: IGallery;
  onFinish: Function;
  submitting: boolean;
  photosList?: IPhotos[];
  makeCoverPhoto?: Function;
  removePhoto?: Function;
  reorderList?: Function;
  handleBeforeUpload?: Function;
  removeFile?: Function;
  uploading?: boolean;
  filesList?: any[];
  uploadedPhotosList?: {
    items: IPhotos[];
    total: number;
  };
  isCreate:boolean
}

export class FormGallery extends PureComponent<IProps> {
  state = { 
    remainCount: 30,
    isSale: false,
    isSendInPrivateChat: false
    };
  formRef: any;

  componentDidMount() {
    if (!this.formRef) this.formRef = createRef();
    const { gallery } = this.props;
    if (gallery) {
      this.setState(
        {
          remainCount: 30 - gallery.name.length,
          isSale: gallery.isSaleGallery,
          isSendInPrivateChat: gallery.isPrivateChat
        }
      );
    }
  }

  handleNameChange (e){
    this.setState({remainCount: 30 - e.target.value.length })
  }  

onSwitch(field: string, checked: boolean){
  if (field === 'saleGallery') {
    this.setState({
      isSale: checked
    });
  }
  if (field === 'isPrivateChat') {
    this.setState({
      isSendInPrivateChat: checked
    });
  }
}

render() {
  if (!this.formRef) this.formRef = createRef();
  const {onFinish,submitting,gallery,removePhoto,reorderList,photosList,
    makeCoverPhoto, 
    handleBeforeUpload,
    removeFile,
    uploading,
    filesList,
    uploadedPhotosList,
    isCreate
    } = this.props;
  const {
    remainCount,
    isSale, 
    isSendInPrivateChat
  } = this.state;
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <>
      <Form
        name="galleryForm"
        onFinish={onFinish.bind(this)}
        initialValues={
          gallery || { name: '', price: 1, status: 'active', description: '' }
        }
        ref={this.formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="account-form"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input name of gallery!' }]}
          label="Name"
          labelCol={{ span: 24 }}
          extra={(<p className='characters-remaining'>{`${remainCount} characters remaining`}</p>)}
        >
          <Input placeholder="Enter gallery's name" maxLength={30} onChange={this.handleNameChange.bind(this)} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          labelCol={{ span: 24 }}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="isSaleGallery" label="Is Sale?"
          labelCol={{ span: 24 }}>
          <Switch checked={isSale} onChange={this.onSwitch.bind(this, 'saleGallery')} />
        </Form.Item>
        { isSale && <Form.Item name="price" label="Price $" labelCol={{ span: 24 }}>
          <InputNumber min={1} />
        </Form.Item>}
        <Form.Item name="isPrivateChat" label="Send in private chat"
          labelCol={{ span: 24 }}>
          <Switch checked={isSendInPrivateChat} onChange={this.onSwitch.bind(this, 'isPrivateChat')} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select>
            <Select.Option key="active" value="active">
              Active
            </Select.Option>
            <Select.Option key="inactive" value="inactive">
              Inactive
            </Select.Option>
          </Select>
        </Form.Item>
        { isCreate && <Form.Item
          name="UploadPhotos"
          label="Upload Photos"
          labelCol={{ span: 24 }}
        >
              <Dragger
                accept="image/*"
                multiple
                showUploadList={false}
                listType="picture"
                disabled={uploading}
                beforeUpload={handleBeforeUpload.bind(this)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload, image file only.
                </p>
              </Dragger>
              {filesList && filesList.length > 0 && (
                <UploadList
                  files={filesList}
                  remove={removeFile.bind(this)}
                />
              )}
              <div className="grid-photos">
                {uploadedPhotosList
                    && uploadedPhotosList.items.length > 0
                    && uploadedPhotosList.items.map((photo) => (
                      <div className="grid-item" key={photo._id}>
                        <img
                          alt={photo.title}
                          src={photo.photo.url || photo.photo.thumbnails[0]}
                        />
                        {!photo.isGalleryCover ? (
                          <div className="remove-section">
                            <DeleteOutlined
                              onClick={removePhoto.bind(this, photo._id)}
                            />
                          </div>
                        ) : (
                          <div className="cover-section">Cover Photo</div>
                        )}
                      </div>
                    ))}
              </div>
        </Form.Item>}
        <Form.Item>
          <Button
            className="primary"
            htmlType="submit"
            loading={submitting}
            style={{ marginRight: '20px' }}
          >
            Submit
          </Button>
          <Button
            className="secondary"
            onClick={() => Router.push('/model/gallery-manager/listing')}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
      {photosList 
      && photosList.length > 0
      && <ReactSortable
        className='grid-photos'
        list={photosList as []}
        setList={(newList) => reorderList(newList)}
      >
        {photosList.map((photo) => (
          <div className="grid-item">
            <img
              draggable={false}
              alt={photo.title}
              src={photo.photo.url || photo.photo.thumbnails[0]}
            />
            {!photo.isGalleryCover ? (
              <div>
                <div className="select-section">
                  <SelectOutlined onClick={makeCoverPhoto.bind(this, photo._id)} />
                </div>
                <div className="remove-section">
                  <DeleteOutlined onClick={removePhoto.bind(this, photo._id)} />
                </div>
              </div>
            ) : (
              <div className="cover-section">Cover Photo</div>
            )}
          </div>
        ))}
      </ReactSortable>}
    </>
  );
};
}
