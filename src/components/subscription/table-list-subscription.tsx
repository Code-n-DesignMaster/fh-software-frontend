import React from 'react';
import { Table, Tag, Button } from 'antd';
import { ISubscription } from 'src/interfaces';
import { formatDate, formatDateNoTime } from '@lib/date';
import routes from 'server/routes';

interface IProps {
  dataSource: ISubscription[];
  // eslint-disable-next-line react/require-default-props
  pagination?: any;
  // eslint-disable-next-line react/require-default-props
  rowKey?: string;
  onChange: any;
  loading: boolean;
  cancelSubscription: Function;
}

export const TableListSubscription = ({
  dataSource,
  pagination,
  rowKey,
  onChange,
  loading,
  cancelSubscription
}: IProps) => {
  const onCancel = (value, type) => {
    if (
      !window.confirm(
        type !== 'free'
          ? 'Please confirm if you want to cancel your automatic renewal of this performer.  You will continue to have access until the current expiration date.'
          : 'Please confirm if you want to cancel your subscription of this performer.'
      )
    ) {
      return;
    }
    cancelSubscription(value, type);
  };
  const columns = [
    {
      title: 'Model',
      dataIndex: 'performerInfo',
      render(data, records) {
        return (
          <routes.Link
            route={`/model/${records.performerInfo.username}`}
            params={{ username: records.performerInfo.username }}
          >
            <a>
              {`${records.performerInfo.firstName} ${records.performerInfo.lastName}`}
            </a>
          </routes.Link>
        );
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
            return <Tag color="orange">Monthly Subscription</Tag>;
          case 'semiannual':
            return <Tag color="orange">Semiannual Subscription</Tag>;
          case 'system':
            return <Tag color="orange">System</Tag>;
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
            return <Tag color="success">Active</Tag>;
          case 'deactivated':
            return <Tag color="default">Cancelled</Tag>;
          default:
            return <Tag color="default">{status}</Tag>;
        }
      }
    },
    {
      title: 'Expired Date',
      dataIndex: 'expiredAt',
      render(date: Date) {
        return date !== undefined && date !== null ? (
          <span>{formatDateNoTime(date)}</span>
        ) : null;
      }
    },
    {
      title: 'Next Recurring Date',
      dataIndex: 'expiredAt',
      render(date: Date, record) {
        return record.status !== 'deactivated' &&
          date !== undefined &&
          date !== null ? (
          <span>{formatDateNoTime(date)}</span>
        ) : null;
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
      sorter: false,
      render(_id, record) {
        return (
          <>
            {((record.subscriptionType !== 'system' &&
              record.nextRecurringDate !== undefined &&
              record.status !== 'deactivated') ||
              (record.subscriptionType === 'free' &&
                record.status === 'active')) && (
              <Button
                danger
                onClick={() =>
                  onCancel(record.performerId, record.subscriptionType)
                }
              >
                Cancel subscription
              </Button>
            )}
          </>
        );
      }
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
