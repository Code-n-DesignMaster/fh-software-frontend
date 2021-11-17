import { Layout, message } from 'antd';
import { PureComponent } from 'react';
import Page from '@components/common/layout/page';
import Loader from '@components/loader';
import { IGallery, IUser, IUIConfig } from 'src/interfaces';
import { connect } from 'react-redux';
import Router from 'next/router';
import { ProPagination } from '@components/pagination';
import Head from 'next/head';
import { PerformerListGallery } from '@components/gallery/performer-list';
import { galleryService } from 'src/services';

const { Content } = Layout;

interface IProps {
  ui: IUIConfig;
}
interface IStates {
  loading: boolean;
  watchLateGalleries: IGallery[];
  currentPage: number;
  limit: number;
  total: number;
}

class WatchLateGalleryPage extends PureComponent<IProps, IStates> {
  static authenticate = true;
  static onlyPerformer = true;
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      watchLateGalleries: [],
      currentPage: 1,
      limit: 10,
      total: 0
    };
  }

  componentDidMount() {
    this.getWatchLateGalleries();
  }

  async getWatchLateGalleries() {
    try {
      const resp = await galleryService.getWatchLateGalleries({
        limit: this.state.limit,
        offset: (this.state.currentPage - 1) * this.state.limit
      });
      await this.setState({
        watchLateGalleries: resp.data.data,
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
    this.getWatchLateGalleries();
  }

  render() {
    const { loading, watchLateGalleries, limit, total } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | My wishlist Gallery </title>
        </Head>
        <Content>
          <div className="main-container">
            <div className="page-heading">My Wishlist Gallery</div>
            {loading ? (
              <Loader />
            ) : (
              <Page>
                {(!watchLateGalleries || !watchLateGalleries.length) && (
                  <div style={{ textAlign: 'center' }}>No gallery found.</div>
                )}
                {watchLateGalleries && watchLateGalleries.length > 0 && (
                  <PerformerListGallery galleries={watchLateGalleries} />
                )}
                {total > limit && (
                  <div className="paging">
                    <ProPagination
                      showQuickJumper={false}
                      defaultCurrent={1}
                      total={total}
                      pageSize={limit}
                      onChange={this.handlePagechange.bind(this)}
                    />
                  </div>
                )}
              </Page>
            )}
          </div>
        </Content>
      </Layout>
    );
  }
}
const mapState = (state: any) => ({ ui: state.ui });
export default connect(mapState)(WatchLateGalleryPage);
