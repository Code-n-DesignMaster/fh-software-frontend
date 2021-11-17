/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { PureComponent } from 'react';
import { Layout, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { getPhotos, editPhoto, deletePhoto } from '@redux/photo/actions';
import Page from '@components/common/layout/page';
import { SearchFilter } from '@components/common/base/search-filter';
import { TableListPhotos } from '@components/photo/table-list';
import { IUIConfig } from 'src/interfaces';

const { Content } = Layout;

interface PhotoManagerPageIProps {
  loading: boolean;
  error: any;
  success: boolean;
  data: [];
  getPhotos: Function;
  editPhoto: Function;
  deletePhoto: Function;
  ui: IUIConfig;
}

interface PhotoManagerPageIStates {
  filter: {};
  pagination: {};
  currentPage: number;
  sortBy: string;
  sort: string;
  limit: number;
}

class PhotoManagerPage extends PureComponent<
  PhotoManagerPageIProps,
  PhotoManagerPageIStates
> {
  static authenticate: boolean = true;

  static onlyPerformer = true;

  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      pagination: {},
      currentPage: 1,
      sortBy: 'createdAt',
      sort: 'desc',
      limit: 12
    };
  }

  async search(page) {
    const { filter, limit, currentPage, sort, sortBy, pagination } = this.state;
    const { getPhotos: getPhotosHandler } = this.props;
    const param = {
      ...filter,
      page,
      limit,
      offset: (currentPage - 1) * limit,
      sort,
      sortBy
    };
    await getPhotosHandler(param);
    // TODO - get total item and write to pagination.total
    this.setState({
      pagination: {
        ...pagination,
        // total: resp.data.total,
        pageSize: limit
      }
    });
  }

  handleDeletePhoto(id: string) {
    if (!window.confirm('Are you sure to delete this photo?')) {
      return;
    }
    const { deletePhoto: deletePhotoHandler } = this.props;
    deletePhotoHandler(id);
  }

  handleTableChange(pagination: any, sorter: any) {
    const { currentPage } = this.state;
    this.setState({
      currentPage: pagination.current,
      sortBy: sorter.field || '',
      // eslint-disable-next-line no-nested-ternary
      sort: sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : ''
    });
    this.search(currentPage);
  }

  handleFilter(filter) {
    const { currentPage } = this.state;
    this.setState({ currentPage: 1 });
    this.setState({ filter });
    this.search(currentPage);
  }

  render() {
    const statuses = [
      {
        key: '',
        text: 'Status'
      },
      {
        key: 'active',
        text: 'Active'
      },
      {
        key: 'inactive',
        text: 'Inactive'
      }
    ];
    const { loading, data, ui } = this.props;
    const { pagination } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | Photo Management</title>
          <meta
            property="og:title"
            content="honeydrip.com - Photo Management"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Photo Management"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Content>
          <div className="photo-manager-page">
            <div className="main-container">
              <div className="page-heading">
                <span>Photo Management</span>
              </div>
              <div>
                <Button>
                  <Link href="/model/photo-manager/upload">
                    <a>
                      Upload new <PlusOutlined />
                    </a>
                  </Link>
                </Button>
              </div>
              <Page>
                <SearchFilter
                  statuses={statuses}
                  onSubmit={this.handleFilter.bind(this)}
                />
                <div style={{ marginBottom: '20px' }} />
                <div className="table-responsive">
                  <TableListPhotos
                    dataSource={data}
                    rowKey="_id"
                    loading={loading}
                    pagination={pagination}
                    onChange={this.handleTableChange.bind(this)}
                    onDelete={this.handleDeletePhoto.bind(this)}
                  />
                </div>
              </Page>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}
const mapState = (state: any) => ({ ...state.photo.listPhotos, ui: state.ui });
const mapDispatch = { getPhotos, editPhoto, deletePhoto };
export default connect(mapState, mapDispatch)(PhotoManagerPage);
