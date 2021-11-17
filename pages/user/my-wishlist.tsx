import { Layout, message } from 'antd';
import { PureComponent } from 'react';
import Page from '@components/common/layout/page';
import Loader from '@components/loader';
import { IVideo, IUser, IUIConfig } from 'src/interfaces';
import { connect } from 'react-redux';
import { videoService } from 'src/services';
import Router from 'next/router';
import { PerformerListVideo } from '@components/video/performer-list';
import { ProPagination } from '@components/pagination';
import Head from 'next/head';

const { Content } = Layout;

interface IProps {
  ui: IUIConfig;
}
interface IStates {
  loading: boolean;
  watchLateVideos: IVideo[];
  currentPage: number;
  limit: number;
  total: number;
}

class WatchLateVideoPage extends PureComponent<IProps, IStates> {
  static authenticate = true;
  static onlyPerformer = true;
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      watchLateVideos: [],
      currentPage: 1,
      limit: 10,
      total: 0
    };
  }

  componentDidMount() {
    this.getWatchLateVideos();
  }

  async getWatchLateVideos() {
    try {
      const resp = await videoService.getWatchLateVideos({
        limit: this.state.limit,
        offset: (this.state.currentPage - 1) * this.state.limit
      });
      await this.setState({
        watchLateVideos: resp.data.data,
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
    this.getWatchLateVideos();
  }

  render() {
    const { loading, watchLateVideos, limit, total } = this.state;
    const { ui } = this.props;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | My wishlist </title>
          <meta
            property="og:title"
            content={`honeydrip.com - My wishlist`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - My wishlist`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Content>
          <div className="main-container">
            <div className="page-heading">My Wishlist</div>
            {loading ? (
              <Loader />
            ) : (
              <Page>
                {(!watchLateVideos || !watchLateVideos.length) && (
                  <div style={{ textAlign: 'center' }}>No video found.</div>
                )}
                {watchLateVideos && watchLateVideos.length > 0 && (
                  <PerformerListVideo videos={watchLateVideos} />
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
export default connect(mapState)(WatchLateVideoPage);
