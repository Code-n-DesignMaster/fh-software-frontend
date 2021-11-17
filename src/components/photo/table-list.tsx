/* eslint-disable react/prop-types */
import React from 'react';
import { Table, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDate } from '@lib/date';
import Link from 'next/link';
import './photo.less';

interface TableListPhotosIProp {
  dataSource: [];
  rowKey: string;
  loading: boolean;
  pagination: {};
  onChange: Function;
  onDelete: Function;
}

export const TableListPhotos = ({
  dataSource,
  rowKey,
  loading,
  pagination,
  onChange,
  onDelete
}: TableListPhotosIProp) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true
    },
    {
      title: 'For Sale',
      dataIndex: 'isSalePhoto',
      key: 'isSalePhoto',
      sorter: true,
      render(isSaleVideo: boolean) {
        switch (isSaleVideo) {
          case true:
            return <Tag color="green">Yes</Tag>;
          case false:
            return <Tag color="red">No</Tag>;
          default: return null;
        }
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
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
      key: 'status',
      sorter: true,
      render(status: string) {
        switch (status) {
          case 'active':
            return <Tag color="green">Active</Tag>;
          case 'inactive':
            return <Tag color="red">Inactive</Tag>;
          default: return <Tag color="default">{status}</Tag>;
        }
      }
    },
    {
      title: 'Last update',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: '_id',
      render: (id: string) => (
        <>
          <Button>
            <Link
              href={{
                pathname: '/model/video-manager/update',
                query: { id }
              }}
              as={`/model/video-manager/update/${id}`}
            >
              <a>
                <EditOutlined />
                {' '}
                Update
              </a>
            </Link>
          </Button>
          <Button onClick={onDelete.bind(this, id)}>
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
};
