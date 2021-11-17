/* eslint-disable react/require-default-props */
import React from 'react';
import { Table, Tag, Button } from 'antd';
import { ISubscription } from 'src/interfaces';
import { formatDate } from '@lib/date';

interface IProps {
  dataSource: ISubscription[];
  pagination?: any;
  rowKey?: string;
  onChange: any;
  loading: boolean;
  blockUser?: Function;
  unblockUser?: Function;
}

export const TableListSubscription = ({
  dataSource,
  pagination,
  rowKey,
  onChange,
  loading,
  blockUser,
  unblockUser
}: IProps) => {
  const columns = [
    {
      title: 'User',
      dataIndex: 'userInfo',
      render(data, records) {
        return <span>{ records.userInfo === null ?  records.performerInfo && records.performerInfo.username : records.userInfo.name}</span>;
      }
    },
    {
      title: 'Type',
      dataIndex: 'subscriptionType',
      render(subscriptionType: string) {
        switch (subscriptionType) {
          case 'free':
            return <Tag color="orange">Free Subscription</Tag>;
          case 'monthly':
            return <Tag color="#936dc9">Monthly Subscription</Tag>;
          case 'semiannual':
            return <Tag color="#00dcff">Semiannual Subscription</Tag>;
          case 'system':
            return <Tag color="#FFCF00">System</Tag>;
          default:
            return null;
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(status: string) {
        switch (status) {
          case 'active':
            return <Tag color="#00c12c">Active</Tag>;
          case 'deactivated':
            return <Tag color="#FFCF00">Deactivated</Tag>;
          default:
          return <Tag color="pink" style={{textTransform: 'capitalize'}}>{status}</Tag>;
        }
      }
    },
    {
      title: 'Expired Date',
      dataIndex: 'expiredAt',
      render(date: Date) {
        return <span>{date !== undefined && date !== null ? <span>{formatDate(date)}</span> : null}</span>;
      }
    },
    {
      title: 'Last updated at',
      dataIndex: 'updatedAt',
      sorter: true,
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (data, record) => (!record.blockedUser ? (
        <Button
          className="primary"
          onClick={() => blockUser({ userId: record.userId })}
        >
          Block
        </Button>
      ) : (
        <Button
          className="secondary"
          onClick={() => unblockUser(record.userId)}
        >
          Unblock
        </Button>
      ))
    }
  ];
  return (
    <div className="table-responsive">
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={pagination}
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};
