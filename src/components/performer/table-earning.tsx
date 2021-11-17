import { PureComponent } from 'react';
import { Table, Tag } from 'antd';
import { formatDate } from '@lib/date';
import { IEarning } from 'src/interfaces';

interface IProps {
  dataSource: IEarning[];
  rowKey: string;
  pagination: {};
  onChange: Function;
}

export class TableListEarning extends PureComponent<IProps> {
  render() {
    const columns = [
      {
        title: 'User name',
        // sorter: true,
        render(data, record: IEarning) {
          return (
            <span>
              {record.userInfo
                && `${record.userInfo.firstName} ${record.userInfo.lastName}`}
            </span>
          );
        }
      },
      // {
      //   title: 'User e-mail',
      //   sorter: true,
      //   render(data, record: IEarning) {
      //     return <span>{record.userInfo && record.userInfo.email}</span>;
      //   }
      // },
      {
        title: 'Type',
        dataIndex: 'sourceType',
        sorter: true,
        render(sourceType: string) {
          switch (sourceType) {
            case 'gallery':
             return <Tag color="#fc7060">Gallery</Tag>;
            case 'performer':
              return <Tag color="#936dc9">Subscription</Tag>;
            case 'video':
              return <Tag color="#00dcff">VOD</Tag>;
            case 'product':
              return <Tag color="#FFCF00">Store</Tag>;
            case 'tip':
              return <Tag color="#ff8100">Tip</Tag>;
            default: return <Tag color="#936dc9">Subscription</Tag>;
          }
        }
      },
      {
        title: 'Gross Price',
        dataIndex: 'netPrice',
        render(netPrice: number) {
          return (
            <span>
              $
              {netPrice.toFixed(2)}
            </span>
          );
        }
      },
      {
        title: 'Commission',
        dataIndex: 'commission',
        render(commission: number) {
          return (
            <span>
              {commission * 100}
              %
            </span>
          );
        }
      },
      {
        title: 'Net Price',
        dataIndex: 'grossPrice',
        render(grossPrice: number) {
          return (
            <span>
              $
              {grossPrice.toFixed(2)}
            </span>
          );
        }
      },
      // {
      //   title: 'Status',
      //   dataIndex: 'isPaid',
      //   sorter: true,
      //   render(isPaid: boolean) {
      //     switch (isPaid) {
      //       case true:
      //         return <Tag color="green">Paid</Tag>;
      //       case false:
      //         return <Tag color="orange">Pending</Tag>;
      //     }
      //   }
      // },
      // {
      //   title: 'Paid At',
      //   dataIndex: 'paidAt',
      //   sorter: true,
      //   render(date: Date) {
      //     return <span>{date ? formatDate(date) : null}</span>;
      //   }
      // },
      {
        title: 'Last update',
        dataIndex: 'updatedAt',
        sorter: true,
        render(date: Date) {
          return <span>{formatDate(date)}</span>;
        }
      }
    ];
    const {
      dataSource, rowKey, pagination, onChange
    } = this.props;
    return (
      <div className="table-responsive">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={rowKey}
          pagination={pagination}
          onChange={onChange.bind(this)}
        />
      </div>
    );
  }
}
