import { PureComponent } from 'react';
import { Layout, message } from 'antd';
import Head from 'next/head';
import Page from '@components/common/layout/page';
import { IGalleryCreate, IUIConfig, IPhotos } from 'src/interfaces';
import { galleryService, photoService } from 'src/services';
import { getResponseError } from '@lib/utils';
import Router from 'next/router';
import { connect } from 'react-redux';
import { FormGallery } from '@components/gallery/form-gallery';

const { Content } = Layout;

interface IProps {
  ui: IUIConfig;
}

interface IStates {
  submitting: boolean;
  uploading: boolean;
  filesList: any[];
  uploadedPhotosList: {
    items: IPhotos[];
    total: number;
  };
  isCreate: boolean;
}

class GalleryCreatePage extends PureComponent<IProps, IStates> {
  static authenticate = true;

  static onlyPerformer = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      submitting: false,
      uploading: false,
      filesList: [],
      uploadedPhotosList: {
        items: [],
        total: 0
      },
      isCreate: true
    };
  }

  async onFinish(data: IGalleryCreate) {
    try {
      if (data.isSaleGallery && (data.price < 1 || !data.price)) {
        return message.error('Invalid price');
      }
      if (!data.isSaleGallery) {
        data.price = 0;
      }
      this.setState({ submitting: true });
      const galleryData = await galleryService.create(data);
      message.success('Gallery have been created.');
      const galleryId = galleryData && galleryData.data && galleryData.data._id;
      this.handleUploadPhotos(galleryId);
    } catch (e) {
      message.error(
        getResponseError(e) || 'An error occurred, please try again!'
      );
    } finally {
      await this.setState({ submitting: true }, () =>
        Router.push('/model/gallery-manager/listing')
      );
    }
  }

  onUploading(file, resp: any) {
    // eslint-disable-next-line no-param-reassign
    file.percent = resp.percentage;
    // eslint-disable-next-line no-param-reassign
    if (file.percent === 100) file.status = 'done';
    this.forceUpdate();
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
          items: uploadedPhotos.data.data,
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
      return; // message.error('Please select photo!')
    }
    const uploadFiles = filesList.filter(
      (f) => !['uploading', 'done'].includes(f.status)
    );
    if (!uploadFiles.length) return; // message.error('Please select new file!')
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
    // message.success('Photos has been uploaded!');
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

  removeFile(file) {
    const { filesList } = this.state;
    filesList.splice(
      filesList.findIndex((f) => f.uid === file.uid),
      1
    );
    this.setState({ filesList });
    this.forceUpdate();
  }

  render() {
    const {
      submitting,
      isCreate,
      uploading,
      filesList,
      uploadedPhotosList
    } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | Create Gallery </title>
          <meta
            property="og:title"
            content="honeydrip.com - Create Gallery"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Create Gallery"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Content>
          <div className="main-container">
            {/* <BreadcrumbComponent
              breadcrumbs={[
                { title: 'Gallery Manager', href: '/model/gallery-manager/listing' },
                { title: 'New Gallery' }
              ]}
            /> */}
            <Page>
              <div className="page-heading">
                <span>New Gallery</span>
              </div>
              <FormGallery
                submitting={submitting}
                isCreate={isCreate}
                uploading={uploading}
                filesList={filesList}
                uploadedPhotosList={uploadedPhotosList}
                handleBeforeUpload={this.handleBeforeUpload.bind(this)}
                removePhoto={this.removePhoto.bind(this)}
                removeFile={this.removeFile.bind(this)}
                onFinish={this.onFinish.bind(this)}
              />
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
export default connect(mapStates)(GalleryCreatePage);
