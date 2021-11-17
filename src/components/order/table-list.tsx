import React from 'react';
import { Table, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IOrder } from 'src/interfaces';
import { formatDate } from '@lib/date';
import Link from 'next/link';

interface IProps {
  dataSource: IOrder[];
  pagination: {};
  rowKey: string;
  loading: boolean;
  onChange: Function;
}

const OrderTableList = ({
  dataSource,
  pagination,
  rowKey,
  loading,
  onChange
}: IProps) => {
  const columns = [
    {
      title: 'User',
      dataIndex: 'userInfo',
      key: 'userInfo',
      sorter: true,
      render(data, record) {
        return (
          <span>
            {record.userInfo && `${record.userInfo.firstName} ${record.userInfo}` && record.userInfo.lastName}
          </span>
        );
      }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: true,
      render(quantity) {
        return <span>{quantity}</span>;
      }
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      sorter: true,
      render(data, record) {
        return (
          <span>
            $
            {record.totalPrice && record.totalPrice.toFixed(2)}
          </span>
        );
      }
    },
    {
      title: 'Delivery Status',
      dataIndex: 'deliveryStatus',
      render(status: string) {
        switch (status) {
          case 'processing':
            return <Tag color="#FFCF00">Processing</Tag>;
          case 'shipping':
            return <Tag color="#00dcff">Shipping</Tag>;
          case 'delivered':
            return <Tag color="#00c12c">Delivered</Tag>;
          case 'refunded':
            return <Tag color="danger">Refunded</Tag>;
          default: return null;
        }
      }
    },
    {
      title: 'Last updated at',
      dataIndex: 'createdAt',
      sorter: true,
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    },
    {
      title: '#',
      dataIndex: '_id',
      sorter: true,
      render(id: string) {
        return (
          <Link href={{ pathname: '/model/order-manager/detail', query: { id } }}>
            <a>
              <EyeOutlined />
            </a>
          </Link>
        );
      }
    }
  ];
  return (
    <div className="table-responsive">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        rowKey={rowKey}
        loading={loading}
        onChange={onChange.bind(this)}
      />
    </div>
  );
};
export default OrderTableList;
