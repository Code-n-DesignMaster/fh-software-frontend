import React from 'react';
import { Table, Tag } from 'antd';
import { ITransaction } from 'src/interfaces';
import { formatDate } from '@lib/date';
import Link from 'next/link';

interface IProps {
  dataSource: ITransaction[];
  pagination: {};
  rowKey: string;
  loading: boolean;
  onChange: Function;
}

const PaymentTableList = ({
  dataSource,
  pagination,
  rowKey,
  loading,
  onChange
}: IProps) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: 'id',
      render(data, record) {
        return (
          <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>
            {record._id.slice(16, 24)}
          </span>
        );
      }
    },
    {
      title: 'Creator',
      dataIndex: 'performer',
      key: 'performer',
      sorter: true,
      render(data, record) {
        return (
          <span>
            {record.performerInfo
              ? record.performerInfo.name
              : 'N/A'}
          </span>
        );
      }
    },
    {
      title: 'Description',
      render(data, record) {
        if(record.type === 'send_tip'){
          return (
            <span key={record._id}>
              Outbound Tip to {record.performerInfo.username}
            </span>
          );
        }
        else
        return record.products.map((re) => (
          <span key={record._id}>
            {re.productType === 'video' ? (
              <Link
                key={re.productId}
                href={{ pathname: '/video', query: { id: re.productId } }}
              >
                <a target="_blank">{re.description}</a>
              </Link>
            ) : re.productType === 'gallery' ? (
              <Link
              key={re.productId}
              href={{ pathname: '/gallry', query: { id: re.productId, performerId: record.performerId}}}
              as={`/gallery?id=${re.productId}&performerId=${record.performerId}`}
              >
              <a target="_blank">{re.description}</a>
              </Link>
            ) : (
              <span key={re.productId}>{re.description}</span>
            )}
          </span>
        ));
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      render(type: string) {
        switch (type) {
          case 'monthly_subscription':
            return <Tag color="#936dc9">Monthly Subscription</Tag>;
          case 'yearly_subscription':
            return <Tag color="#dc3545">Semiannual Subscription</Tag>;
          case 'sale_video':
            return <Tag color="#00dcff">VOD</Tag>;
          case 'sale_gallery':
            return <Tag color="#fc7060">Gallery</Tag>;
          case 'product':
            return <Tag color="#FFCF00">Store</Tag>;
          case 'send_tip':
            return <Tag color="#00c12c">Tip</Tag>;
          default: return null;
        }
      }
    },
    {
      title: 'Original price',
      dataIndex: 'originalPrice',
      sorter: true,
      render(data, record) {
        return (
          <span>
            $
            {(record.originalPrice && record.originalPrice.toFixed(2))
              || record.totalPrice.toFixed(2)}
          </span>
        );
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
      title: 'Discount',
      dataIndex: 'couponInfo',
      sorter: true,
      render(data, record) {
        return record.couponInfo ? (
          <span>
            {`${record.couponInfo.value * 100}%`}
            {' '}
            - $
            {(record.originalPrice * record.couponInfo.value).toFixed(2)}
          </span>
        ) : (
          ''
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(status: string) {
        switch (status) {
          case 'success':
            return <Tag color="success">Success</Tag>;
          case 'pending':
            return <Tag color="warning">Pending</Tag>;
          case 'cancelled':
            return <Tag color="danger">Suspended</Tag>;
          default: break;
        }
        return <Tag color="default">{status}</Tag>;
      }
    },
    {
      title: 'Purchased at',
      dataIndex: 'createdAt',
      sorter: true,
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
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
export default PaymentTableList;
