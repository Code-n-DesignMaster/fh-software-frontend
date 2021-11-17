import { PureComponent, createRef } from 'react';
import { Layout, message, Form, Button, Upload } from 'antd';
import {
  InboxOutlined,
  DeleteOutlined,
  SelectOutlined
} from '@ant-design/icons';
import Head from 'next/head';
import Page from '@components/common/layout/page';
import Loader from '@components/loader';
import { BreadcrumbComponent } from '@components/common/breadcrumb';
import { galleryService, photoService } from 'src/services';
import { IGallery, IPhotos, IUIConfig } from 'src/interfaces';
import UploadList from '@components/file/upload-list';
import Router from 'next/router';
import { connect } from 'react-redux';
import { getResponseError } from '@lib/utils';
import './photo.less';
import { detection, getBase64 } from '@lib/deepai';
import { ReactSortable } from 'react-sortablejs';

const { Content } = Layout;
const { Dragger } = Upload;

interface IProps {
  galleryId?: string;
  ui: IUIConfig;
}

interface IStates {
  gallery: IGallery;
  loading: boolean;
  uploading: boolean;
  filesList: any[];
  // uploadPercentage: Number;
  // isShow: boolean;
  // isDisable: boolean;
  uploadedPhotosList: {
    items: IPhotos[];
    total: number;
  };
  hasChanged: boolean;
}

class PhotoUploadPage extends PureComponent<IProps, IStates> {
  static authenticate = true;

  static onlyPerformer = true;

  static async getInitialProps({ ctx }) {
    return ctx.query;
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      gallery: null,
      loading: true,
      uploading: false,
      filesList: [],
      // uploadPercentage: 0,
      // isShow: false,
      // isDisable: false,
      uploadedPhotosList: {
        items: [],
        total: 0
      },
      hasChanged: false
    };
  }

  componentDidMount() {
    const { galleryId } = this.props;
    if (galleryId) {
      this.getInitialData(galleryId);
      // this.setState({ isDisable: true });
    }
  }

  onUploading(file, resp: any) {
    // this.setState({ uploadPercentage: resp.percentage });
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
    this.forceUpdate();
  }

  async getInitialData(id: string) {
    try {
      const [gallery] = await Promise.all([
        (await galleryService.findById(id)).data
        // this.getPhotosInGallery(id)
      ]);
      this.setState({
        gallery
      });
    } catch (error) {
      message.error('Error occured');
    } finally {
      this.setState({ loading: false });
    }
  }

  async getPhotosInGallery(galleryId: string) {
    try {
      const { uploadedPhotosList } = this.state;
      const uploadedPhotos = await photoService.searchPhotosInGallery({
        galleryId
      });
      this.setState({
        uploadedPhotosList: {
          ...uploadedPhotosList,
          items: uploadedPhotos.data.data.sort(
            (a, b) => a.position - b.position
          ),
          total: uploadedPhotos.data.total
        }
      });
    } catch (error) {
      message.error('Error while getting photos');
    }
  }

  handleBeforeUpload(file, files) {
    const { filesList } = this.state;
    this.setState({ filesList: [...filesList, ...files] });
    return false;
  }

  async handleUploadPhotos(galleryId) {
    const data = {
      galleryId,
      status: 'active'
    };
    const { filesList } = this.state;
    if (!filesList.length) {
      return message.error('Please select photo!');
    }
    const uploadFiles = filesList.filter(
      (f) => !['uploading', 'done'].includes(f.status)
    );
    if (!uploadFiles.length) return message.error('Please select new file!');
    await this.setState({ uploading: true });
    // eslint-disable-next-line no-restricted-syntax
    for (const file of uploadFiles) {
      try {
        // eslint-disable-next-line no-continue
        if (['uploading', 'done'].includes(file.status)) continue;
        file.status = 'uploading';
        // eslint-disable-next-line no-await-in-loop
        await photoService.uploadImages(
          file,
          data,
          this.onUploading.bind(this, file)
        );
      } catch (e) {
        file.status = 'error';
        message.error(`File ${file.name} error!`);
      }
    }
    message.success('Photos has been uploaded!');
    await this.setState({ uploading: false });
    return this.getPhotosInGallery(data.galleryId);
  }

  async removePhoto(id: string) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this photo')) {
      try {
        const { uploadedPhotosList } = this.state;
        await photoService.delete(id);
        message.success('Delete successfully');
        const items = uploadedPhotosList.items.filter((p) => p._id !== id);
        this.setState({
          uploadedPhotosList: { ...uploadedPhotosList, items }
        });
      } catch (error) {
        message.error(getResponseError(error));
      }
    }
  }

  async makeCoverPhoto(id: string) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to make this as cover photo')) {
      try {
        const { uploadedPhotosList } = this.state;
        const { ui, galleryId } = this.props;
        const imageUrl = uploadedPhotosList.items.filter((i) => i._id == id)[0]
          .photo.url;
        if (ui.nudirtySwitch) {
          const res = (await getBase64(imageUrl)) as string;
          const resp = (await detection(res)) as any;
          if (
            resp &&
            resp.output &&
            resp.output.nsfw_score &&
            resp.output.nsfw_score * 100 > ui.nudirtyMinScore
          ) {
            message.error(
              'Nudity detected. Please select another picture as the cover photo!'
            );
            return;
          }
        }
        await photoService.updateCover(id);
        const uploadedPhotos = await photoService.searchPhotosInGallery({
          galleryId
        });
        message.success('Select successfully');
        this.setState({
          uploadedPhotosList: {
            ...uploadedPhotosList,
            items: uploadedPhotos.data.data,
            total: uploadedPhotos.data.total
          }
        });
      } catch (error) {
        message.error(getResponseError(error));
      }
    }
  }

  removeFile(file) {
    const { filesList } = this.state;
    filesList.splice(
      filesList.findIndex((f) => f.uid === file.uid),
      1
    );
    this.setState({ filesList });
    this.forceUpdate();
  }

  reorderList(newList) {
    const { uploadedPhotosList } = this.state;
    const a = newList.map((n) => {
      return n._id;
    });
    const b = uploadedPhotosList.items.map((n) => {
      return n._id;
    });
    if (a.toString() != b.toString()) {
      this.setState({
        hasChanged: true,
        uploadedPhotosList: {
          ...uploadedPhotosList,
          items: newList,
          total: uploadedPhotosList.total
        }
      });
    }
  }

  async saveChange() {
    try {
      const { uploadedPhotosList, hasChanged } = this.state;
      if (!hasChanged) return;
      const data = uploadedPhotosList.items.map((p, index) => {
        return { _id: p._id, position: index };
      });
      await photoService.updatePhotoSort(data);
      message.success('Change Saved!');
      this.setState({ hasChanged: false });
    } catch (e) {
      message.error(getResponseError(e));
    }
  }

  render() {
    const {
      loading,
      gallery,
      uploading,
      filesList,
      uploadedPhotosList
    } = this.state;
    const { galleryId } = this.props;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | Upload Photos </title>
          <meta
            property="og:title"
            content="honeydrip.com - Upload Photos"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Upload Photos"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Content>
          <div className="main-container">
            <BreadcrumbComponent
              breadcrumbs={[
                {
                  title: 'Gallery Photo',
                  href: '/model/gallery-manager/listing'
                },
                {
                  title: gallery ? gallery.name : '',
                  href: `/model/gallery-manager/update?id=${galleryId}`
                },
                { title: 'Upload New' }
              ]}
            />
            <Page>
              <Dragger
                accept="image/*"
                multiple
                showUploadList={false}
                listType="picture"
                disabled={uploading}
                beforeUpload={this.handleBeforeUpload.bind(this)}
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
                  remove={this.removeFile.bind(this)}
                />
              )}
              <div className="text-center">
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={this.handleUploadPhotos.bind(this, galleryId)}
                  >
                    Upload
                  </Button>
                  &nbsp;
                  <Button
                    onClick={() => {
                      this.saveChange();
                      Router.back();
                    }}
                    type="default"
                  >
                    Back
                  </Button>
                </Form.Item>
              </div>
              {loading && <Loader />}
              {uploadedPhotosList && uploadedPhotosList.items.length > 0 && (
                <ReactSortable
                  className="grid-photos"
                  list={uploadedPhotosList.items as []}
                  setList={(newList) => this.reorderList(newList)}
                >
                  {uploadedPhotosList.items.map((photo) => (
                    <div className="grid-item" key={photo._id}>
                      <img
                        alt={photo.title}
                        src={photo.photo.url || photo.photo.thumbnails[0]}
                      />
                      {!photo.isGalleryCover ? (
                        <div>
                          <div className="select-section">
                            <SelectOutlined
                              onClick={() => this.makeCoverPhoto(photo._id)}
                            />
                          </div>
                          <div className="remove-section">
                            <DeleteOutlined
                              onClick={() => this.removePhoto(photo._id)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="cover-section">Cover Photo</div>
                      )}
                    </div>
                  ))}
                </ReactSortable>
              )}
            </Page>
          </div>
        </Content>
      </Layout>
    );
  }
}
const mapStates = (state: any) => ({
  ui: state.ui
});
export default connect(mapStates)(PhotoUploadPage);
