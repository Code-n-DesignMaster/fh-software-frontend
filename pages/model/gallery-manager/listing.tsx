import { PureComponent } from 'react';
import { Layout, message, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Head from 'next/head';
import { TableListGallery } from '@components/gallery/table-list';
import Page from '@components/common/layout/page';
import { SearchFilter } from '@components/common/base/search-filter';
import Link from 'next/link';
import { galleryService } from '@services/gallery.service';
import { connect } from 'react-redux';
import { IUIConfig } from 'src/interfaces';

const { Content } = Layout;

interface GalleryListingPageIProps {
  ui: IUIConfig;
}

interface GalleryListingPageIStates {
  galleries: [];
  loading: boolean;
  filters: {};
  sortBy: string;
  sort: string;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

class GalleryListingPage extends PureComponent<
  GalleryListingPageIProps,
  GalleryListingPageIStates
> {
  static authenticate = true;

  static onlyPerformer = true;

  constructor(props: GalleryListingPageIProps) {
    super(props);
    this.state = {
      galleries: [],
      loading: true,
      filters: {},
      sortBy: 'createdAt',
      sort: 'desc',
      pagination: { current: 1, pageSize: 12, total: 0 }
    };
  }

  async componentDidMount() {
    this.search();
  }

  async search() {
    try {
      const { filters, pagination, sort, sortBy } = this.state;
      const resp = await galleryService.search({
        ...filters,
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
        sort,
        sortBy
      });
      await this.setState({
        galleries: resp.data.data,
        pagination: {
          ...pagination,
          total: resp.data.total
        }
      });
    } catch (error) {
      message.error('Something went wrong. Please try again!');
    } finally {
      this.setState({ loading: false });
    }
  }

  async handleSorterChange(pagination, filters, sorter) {
    const { pagination: statePagination } = this.state;
    await this.setState({
      pagination: {
        ...statePagination,
        current: pagination.current
      },
      sortBy: sorter.field || 'createdAt',
      // eslint-disable-next-line no-nested-ternary
      sort: sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : ''
    });
    this.search();
  }

  async handleDeleteGallery(id: string) {
    try {
      this.setState({ loading: true });
      await galleryService.delete(id);
      message.success('Gallery have been deleted.');
      this.search();
    } catch (e) {
      const err = (await Promise.resolve(e)) || {};
      message.error(err.message || 'An error occurred, please try again!');
    } finally {
      this.setState({ loading: false });
    }
  }

  async handleFilter(param) {
    const { pagination } = this.state;
    await this.setState({
      filters: param,
      pagination: {
        ...pagination,
        current: 1
      }
    });
    this.search();
  }

  render() {
    const { galleries, pagination, loading } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | Gallery Management</title>
          <meta
            property="og:title"
            content="honeydrip.com - Gallery Management"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Gallery Management"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Content>
          <div className="main-container">
            <Page>
              <div className="page-heading">
                <span>Gallery Management</span>
              </div>
              <div>
                <Row>
                  <Col xl={21}>
                    <SearchFilter onSubmit={this.handleFilter.bind(this)} />
                  </Col>
                  <Col xl={3} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button className="secondary">
                      <Link href="/model/gallery-manager/create">
                        <a>
                          <PlusOutlined /> Create New
                        </a>
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </div>

              <div className="table-responsive">
                <TableListGallery
                  dataSource={galleries}
                  rowKey="_id"
                  loading={loading}
                  pagination={pagination}
                  onChange={this.handleSorterChange.bind(this)}
                  deleteGallery={this.handleDeleteGallery.bind(this)}
                />
              </div>
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
export default connect(mapStates)(GalleryListingPage);
