import { PureComponent } from 'react';
import { Table, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from '@lib/date';
import Link from 'next/link';

interface IProps {
  dataSource: [];
  rowKey: string;
  loading: boolean;
  pagination: {};
  onChange: Function;
  onDelete: Function;
}

export class TableListVideo extends PureComponent<IProps> {
  render() {
    const {
      dataSource,
      rowKey,
      loading,
      pagination,
      onChange,
      onDelete
    } = this.props;
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
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
        dataIndex: 'isSaleVideo',
        sorter: true,
        render(isSaleVideo: boolean) {
          switch (isSaleVideo) {
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
        title: 'Price',
        dataIndex: 'price',
        sorter: true,
        render(price: number) {
          return (
            <span>
              $
              {price}
            </span>
          );
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
              return <Tag color="default">Inactive</Tag>;
            default:
              return <Tag color="red">{status}</Tag>;
          }
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
        render: (id: string) => (
          <>
            <Button className="info">
              <Link
                href={{
                  pathname: '/model/video-manager/update',
                  query: { id }
                }}
                as={`/model/video-manager/update?id=${id}`}
              >
                <a>
                  <EditOutlined />
                </a>
              </Link>
            </Button>
            <Button onClick={onDelete.bind(this, id)} className="danger">
              <DeleteOutlined />
            </Button>
          </>
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
          onChange={onChange.bind(this)}
        />
      </div>
    );
  }
}
