import { Col, Layout, message, Row, Tabs } from 'antd';
import { PureComponent } from 'react';
import Page from '@components/common/layout/page';
import Loader from '@components/loader';
import { IVideo, IUIConfig, IGallery } from 'src/interfaces';
import { connect } from 'react-redux';
import { galleryService, videoService } from 'src/services';
import Router from 'next/router';
import { PerformerListVideo } from '@components/video/performer-list';
import { ProPagination } from '@components/pagination';
import Head from 'next/head';
import { PerformerListGallery } from '@components/gallery/performer-list';

const { Content } = Layout;
const { TabPane } = Tabs;

interface IProps {
  ui: IUIConfig;
  user: any;
}
interface IStates {
  loading: boolean;
  favouriteVideos: IVideo[];
  currentPage: number;
  limit: number;
  total: number;
  gloading: boolean;
  favouriteGalleries: IGallery[];
  gcurrentPage: number;
  glimit: number;
  gtotal: number;
}

class FavouriteVideoPage extends PureComponent<IProps, IStates> {
  static authenticate = true;
  static onlyPerformer = true;
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      favouriteVideos: [],
      currentPage: 1,
      limit: 1000,
      total: 0,
      gloading: true,
      favouriteGalleries: [],
      gcurrentPage: 1,
      glimit: 1000,
      gtotal: 0
    };
  }

  componentDidMount() {
    this.getFavouriteVideos();
    this.getFavouriteGalleries();
  }

  async getFavouriteVideos() {
    try {
      const resp = await videoService.getFavouriteVideos({
        limit: this.state.limit,
        offset: (this.state.currentPage - 1) * this.state.limit,
        userId: this.props.user._id ? this.props.user._id : ''
      });
      await this.setState({
        favouriteVideos: resp.data.data,
        total: resp.data.total
      });
    } catch (error) {
      message.error('Server error');
    } finally {
      this.setState({ loading: false });
    }
  }

  async handlePagechange(page: number) {
    await this.setState({ currentPage: page });
    this.getFavouriteVideos();
  }

  async getFavouriteGalleries() {
    try {
      const resp = await galleryService.getFavouriteGalleries({
        limit: this.state.glimit,
        offset: (this.state.gcurrentPage - 1) * this.state.glimit,
        userId: this.props.user._id ? this.props.user._id : ''
      });
      await this.setState({
        favouriteGalleries: resp.data.data,
        gtotal: resp.data.total
      });
    } catch (error) {
      message.error('Server error');
    } finally {
      this.setState({ gloading: false });
    }
  }

  async handleGalleryPagechange(page: number) {
    await this.setState({ gcurrentPage: page });
    this.getFavouriteGalleries();
  }

  render() {
    const {
      loading,
      gloading,
      favouriteVideos,
      favouriteGalleries,
      limit,
      glimit,
      total,
      gtotal
    } = this.state;
    const { ui } = this.props;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | My Favorites </title>
          <meta
            property="og:title"
            content={`honeydrip.com - My Favorite`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - My Favorite`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Content>
          <div className="main-container">
            <div className="model-content">
              <Tabs defaultActiveKey="video" size="large">
                <TabPane tab="Videos" key="video">
                  <Page className="favourite-page">
                    {!favouriteVideos ||
                      (favouriteVideos.length === 0 && (
                        <div style={{ textAlign: 'center' }}>
                          No video found.
                        </div>
                      ))}
                    {favouriteVideos && favouriteVideos.length > 0 && (
                      <PerformerListVideo videos={favouriteVideos} />
                    )}
                  </Page>
                </TabPane>
                <TabPane tab="Galleries" key="gallery">
                  <Page className="favourite-page">
                    {!favouriteGalleries ||
                      (favouriteGalleries.length === 0 && (
                        <div style={{ textAlign: 'center' }}>
                          No gallery found.
                        </div>
                      ))}
                    {favouriteGalleries && favouriteGalleries.length > 0 && (
                      <PerformerListGallery galleries={favouriteGalleries} />
                    )}
                  </Page>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
const mapState = (state: any) => ({ ui: state.ui, user: state.user.current });
export default connect(mapState)(FavouriteVideoPage);
