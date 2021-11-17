/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { PureComponent } from 'react';
import { Layout, message } from 'antd';
import Head from 'next/head';
import { IGallery, IGalleryCreate, IPhotos, IUIConfig } from 'src/interfaces';
import { BreadcrumbComponent } from '@components/common/breadcrumb';
import Page from '@components/common/layout/page';
import { galleryService } from 'src/services';
import Router from 'next/router';
import Loading from '@components/loader';
import { getResponseError } from '@lib/utils';
import { connect } from 'react-redux';
import { photoService } from '@services/index';
import { detection, getBase64 } from '@lib/deepai';
import { FormGallery } from '@components/gallery/form-gallery';

const { Content } = Layout;

interface IProps {
  id: string;
  ui: IUIConfig;
}

interface IStates {
  hasChanged: boolean;
  submitting: boolean;
  gallery: IGallery;
  loading: boolean;
  photos: IPhotos[];
  isCreate: boolean;
  // isUpdating: boolean;
}

class GalleryUpdatePage extends PureComponent<IProps, IStates> {
  static authenticate = true;

  static onlyPerformer = true;

  static async getInitialProps({ ctx }) {
    return ctx.query;
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasChanged: false,
      submitting: false,
      gallery: null,
      loading: true,
      photos: [],
      isCreate: false
      // isUpdating: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  async onFinish(data: IGalleryCreate) {
    try {
      const { id } = this.props;
      this.setState({ loading: true });
      if (data.isSaleGallery && (data.price < 1 || !data.price)) {
        return message.error('Invalid price');
      }
      if (!data.isSaleGallery) {
        data.price = 0;
      }
      this.saveChange();
      await galleryService.update(id, data);
      message.success('Changes saved.');
    } catch (e) {
      message.error(getResponseError(e));
    } finally {
      await this.setState({ loading: false });
      Router.push('/model/gallery-manager/listing');
    }
  }

  async getData() {
    try {
      const { id } = this.props;
      const [gallery, photos] = await Promise.all([
        galleryService.findById(id),
        photoService.searchPhotosInGallery({ galleryId: id })
      ]);
      const newPhotosList = photos.data.data.sort(
        (a, b) => a.position - b.position
      );
      await this.setState({ gallery: gallery.data, photos: newPhotosList });
    } catch (e) {
      message.error('Can not find gallery!');
    } finally {
      this.setState({ loading: false });
    }
  }

  async removePhoto(id: string) {
    if (window.confirm('Are you sure to delete this photo')) {
      try {
        const { photos } = this.state;
        await photoService.delete(id);
        message.success('Delete successfully');
        this.setState({ photos: photos.filter((p) => p._id !== id) });
      } catch (error) {
        message.error(getResponseError(error));
      }
    }
  }

  async saveChange() {
    try {
      const { photos, hasChanged } = this.state;
      if (!hasChanged) return;
      const data = photos.map((p, index) => {
        return { _id: p._id, position: index };
      });
      await photoService.updatePhotoSort(data);
      this.setState({ hasChanged: false });
    } catch (e) {
      message.error(getResponseError(e));
    }
  }

  reorderList(newList) {
    const a = newList.map((n) => {
      return n._id;
    });
    const b = this.state.photos.map((n) => {
      return n._id;
    });
    if (a.toString() !== b.toString()) {
      this.setState({ hasChanged: true, photos: newList });
    }
  }

  async makeCoverPhoto(id: string) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to make this as cover photo')) {
      try {
        const { photos, gallery } = this.state;
        const { ui } = this.props;
        const imageUrl = photos.filter((i) => i._id == id)[0].photo.url;
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
          galleryId: gallery._id
        });
        message.success('Select successfully');
        this.setState({
          photos: uploadedPhotos.data.data
        });
      } catch (error) {
        message.error(getResponseError(error));
      }
    }
  }

  render() {
    const { gallery, submitting, loading, photos, isCreate } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | Update Gallery </title>
          <meta
            property="og:title"
            content="honeydrip.com - Update Gallery"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Update Gallery"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Content>
          <div className="main-container">
            {/* <BreadcrumbComponent
              breadcrumbs={[
                { title: 'Gallery Manager', href: '/model/gallery-manager/listing'},
                {
                  title:
                    gallery && gallery.name ? gallery.name : 'Gallery Detail'
                },
                { title: 'Update' }
              ]}
            /> */}
            <Page>
              <div className="page-heading">
                <span>Update Gallery</span>
              </div>
              {loading ? (
                <Loading />
              ) : (
                <FormGallery
                  gallery={gallery}
                  onFinish={this.onFinish.bind(this)}
                  submitting={submitting}
                  isCreate={isCreate}
                  // isUpdating={isUpdating}
                  makeCoverPhoto={this.makeCoverPhoto.bind(this)}
                  removePhoto={this.removePhoto.bind(this)}
                  photosList={photos}
                  reorderList={this.reorderList.bind(this)}
                />
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
export default connect(mapStates)(GalleryUpdatePage);
