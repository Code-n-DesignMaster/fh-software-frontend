import { message } from 'antd';
import { PureComponent } from 'react';
import Loader from '@components/loader';
import { paymentService } from 'src/services';
import { ITransaction } from 'src/interfaces';
import { SearchFilter } from '@components/common/search-filter';
import PaymentTableList from '@components/payment/table-list';
import { getResponseError } from '@lib/utils';
import SEO from './seo';
import { Wrapper, Inner, Title, TableWrapper } from './styled';

type Props = {};

interface IStates {
  loading: boolean;
  paymentList: ITransaction[];
  searching: boolean;
  pagination: {
    total: number;
    pageSize: number;
    current: number;
  };
  sortBy: string;
  sort: string;
  filter: {};
}

class PaymentHistoryPage extends PureComponent<Props, IStates> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      searching: false,
      paymentList: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1
      },
      sortBy: 'createdAt',
      sort: 'desc',
      filter: {}
    };
  }

  componentDidMount() {
    this.userSearchTransactions();
  }

  async userSearchTransactions() {
    try {
      const resp = await paymentService.userSearchTransactions({
        ...this.state.filter,
        sort: this.state.sort,
        sortBy: this.state.sortBy,
        limit: this.state.pagination.pageSize,
        offset:
          (this.state.pagination.current - 1) * this.state.pagination.pageSize
      });
      return await this.setState({
        paymentList: resp.data.data,
        pagination: {
          ...this.state.pagination,
          total: resp.data.total
        }
      });
    } catch (error) {
      message.error(getResponseError(error));
    } finally {
      this.setState({ loading: false });
    }
  }

  handleTableChange = async (pagination, filters, sorter) => {
    this.setState({
      pagination: { ...this.state.pagination, current: pagination.current },
      sortBy: sorter.field || 'createdAt',
      sort: sorter.order
        ? sorter.order === 'descend'
          ? 'desc'
          : 'asc'
        : 'desc'
    });
    await this.userSearchTransactions();
  };

  async handleFilter(filter) {
    this.setState({ filter });
    await this.userSearchTransactions();
  }

  render() {
    const { loading, paymentList, searching, pagination } = this.state;
    const statuses = [
      {
        key: '',
        text: 'All'
      },
      {
        key: 'success',
        text: 'Success'
      },
      {
        key: 'pending',
        text: 'Pending'
      },
      {
        key: 'cancelled',
        text: 'Suspended'
      }
    ];
    const type = [
      {
        key: '',
        text: 'All'
      },
      {
        key: 'product',
        text: 'Store'
      },
      {
        key: 'sale_video',
        text: 'VOD'
      },
      {
        key: 'sale_gallery',
        text: 'Gallery'
      },
      {
        key: 'send_tip',
        text: 'Tip'
      },
      {
        key: 'monthly_subscription',
        text: 'Monthly Subscription'
      },
      {
        key: 'yearly_subscription',
        text: 'Semiannual Subscription'
      }
    ];
    return (
      <>
        <SEO />
        <Wrapper>
          <Inner>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Title>Payment History</Title>
                <SearchFilter
                  type={type}
                  statuses={statuses}
                  onSubmit={this.handleFilter.bind(this)}
                  searchWithPerformer
                  searchWithKeyword={false}
                />
                <TableWrapper>
                  <PaymentTableList
                    dataSource={paymentList}
                    pagination={pagination}
                    onChange={this.handleTableChange.bind(this)}
                    rowKey="_id"
                    loading={searching}
                  />
                </TableWrapper>
              </>
            )}
          </Inner>
        </Wrapper>
      </>
    );
  }
}

export default PaymentHistoryPage;
