import { PureComponent } from 'react';
import { Table, Tag, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { formatDate } from '@lib/date';
import Link from 'next/link';
import { CoverGallery } from '@components/gallery/cover-gallery';

interface IProps {
  dataSource: [];
  rowKey: string;
  loading: boolean;
  pagination: {};
  onChange: Function;
  deleteGallery?: Function;
}

export class TableListGallery extends PureComponent<IProps> {
  render() {
    const {
      dataSource,
      rowKey,
      loading,
      pagination,
      onChange,
      deleteGallery
    } = this.props;
    const columns = [
      {
        title: '',
        render(data, record) {
          return <CoverGallery gallery={record} />;
        }
      },
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: true
      },
      {
        title: 'Message Only',
        dataIndex: 'isPrivateChat',
        sorter: true,
        render(isPrivateChat: boolean) {
          switch (isPrivateChat) {
            case true:
              return <Tag color="green">Y</Tag>;
            case false:
              return <Tag color="red">N</Tag>;
            default:
              return null;
          }
        }
      },
      {
        title: 'For Sale',
        dataIndex: 'isSaleGallery',
        sorter: true,
        render(isSaleGallery: boolean) {
          switch (isSaleGallery) {
            case true:
              return <Tag color="green">Y</Tag>;
            case false:
              return <Tag color="red">N</Tag>;
          }
        }
      },
      {
        title: 'Price',
        dataIndex: 'price',
        sorter: true,
        render(price: number) {
          return <span>${price}</span>;
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        sorter: true,
        render(status: string) {
          switch (status) {
            case 'active':
              return <Tag color="green">Active</Tag>;
            case 'inactive':
              return <Tag color="#FFCF00">Inactive</Tag>;
            default:
              break;
          }
          return <Tag color="default">{status}</Tag>;
        }
      },
      {
        title: 'Last update',
        dataIndex: 'updatedAt',
        sorter: true,
        render(date: Date) {
          return <span>{formatDate(date)}</span>;
        }
      },
      {
        title: 'Actions',
        dataIndex: '_id',
        render: (data, record) => (
          <div>
            <Button className="secondary-custom">
              <Link
                href={{
                  pathname: '/model/photo-manager/upload',
                  query: {
                    galleryId: record._id
                  }
                }}
              >
                <a>
                  <PlusOutlined />
                  {' '}
                  Add photos
                </a>
              </Link>
            </Button>
            <Button className="info">
              <Link
                href={{
                  pathname: '/model/gallery-manager/update',
                  query: { id: record._id }
                }}
              >
                <a>
                  <EditOutlined />
                  {' '}
                  Edit
                </a>
              </Link>
            </Button>
            <Button
              onClick={() => deleteGallery && deleteGallery(record._id)}
              className="danger"
            >
              <DeleteOutlined />
            </Button>
          </div>
        )
      }
    ];
    return (
      <div className="table-responsive">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={rowKey}
          loading={loading}
          pagination={pagination}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChange.bind(this)}
        />
      </div>
    );
  }
}
