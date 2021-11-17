import { Layout, message } from 'antd';
import { PureComponent } from 'react';
import Page from '@components/common/layout/page';
import Loader from '@components/loader';
import { IGallery, IUIConfig } from 'src/interfaces';
import { connect } from 'react-redux';
import { galleryService } from 'src/services';
import Router from 'next/router';
import { ProPagination } from '@components/pagination';
import Head from 'next/head';
import { PerformerListGallery } from '@components/gallery/performer-list';

const { Content } = Layout;

interface IProps {
  ui: IUIConfig;
}
interface IStates {
  loading: boolean;
  favouriteGalleries: IGallery[];
  currentPage: number;
  limit: number;
  total: number;
}

class FavouriteGalleryPage extends PureComponent<IProps, IStates> {
  static authenticate = true;
  static onlyPerformer = true;
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      favouriteGalleries: [],
      currentPage: 1,
      limit: 2,
      total: 0
    };
  }

  componentDidMount() {
    this.getFavouriteGalleries();
  }

  async getFavouriteGalleries() {
    try {
      const resp = await galleryService.getFavouriteGalleries({
        limit: this.state.limit,
        offset: (this.state.currentPage - 1) * this.state.limit
      });
      await this.setState({
        favouriteGalleries: resp.data.data,
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
    this.getFavouriteGalleries();
  }

  render() {
    const { loading, favouriteGalleries, limit, total } = this.state;
    const { ui } = this.props;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | My Favorite Gallery </title>
          <meta
            property="og:title"
            content={`honeydrip.com - My Favorite Gallery`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - My Favorite Gallery`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Content>
          <div className="main-container">
            <div className="page-heading">My Favorite Gallery</div>
            {loading ? (
              <Loader />
            ) : (
              <Page>
                {!favouriteGalleries ||
                  (favouriteGalleries.length === 0 && (
                    <div style={{ textAlign: 'center' }}>No gallery found.</div>
                  ))}
                {favouriteGalleries && favouriteGalleries.length > 0 && (
                  <PerformerListGallery galleries={favouriteGalleries} />
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
export default connect(mapState)(FavouriteGalleryPage);
