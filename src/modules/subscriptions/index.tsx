import { message } from 'antd';
import { PureComponent } from 'react';
import { TableListSubscription } from '@components/subscription/table-list-subscription';
import { ISubscription } from 'src/interfaces';
import { subscriptionService, paymentService } from '@services/index';
import { getResponseError } from '@lib/utils';
import { connect } from 'react-redux';
import SEO from './seo';
import { Wrapper, Inner, Title, TableWrapper } from './styled';

interface IProps {
  user: any;
}
interface IStates {
  subscriptionList: ISubscription[];
  loading: boolean;
  pagination: {
    pageSize: number;
    current: number;
    total: number;
  };
  sort: string;
  sortBy: string;
  filter: {};
}

class SubscriptionPage extends PureComponent<IProps, IStates> {
  static authenticate: boolean = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      subscriptionList: [],
      loading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      },
      sort: 'decs',
      sortBy: 'updatedAt',
      filter: {}
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      await this.setState({ loading: true });
      const resp = await subscriptionService.userSearch({
        ...this.state.filter,
        sort: this.state.sort,
        sortBy: this.state.sortBy,
        limit: this.state.pagination.pageSize,
        offset:
          (this.state.pagination.current - 1) * this.state.pagination.pageSize
      });
      await this.setState({
        subscriptionList: resp.data.data,
        pagination: { ...this.state.pagination, total: resp.data.total }
      });
    } catch (error) {
      message.error(
        getResponseError(error) || 'An error occured. Please try again.'
      );
    } finally {
      this.setState({ loading: false });
    }
  }

  async handleTabChange(data) {
    this.setState((prev) => ({
      pagination: { ...prev.pagination, current: data.current }
    }));
    await this.getData();
  }

  async cancelSubscription(performerId, type) {
    try {
      if (type === 'free') {
        const resp = await (
          await subscriptionService.deleteFreeSubscribed({
            userId: this.props.user._id,
            performerId
          })
        ).data;
        if (resp !== true) {
          return message.error(
            'Cancel subscription has been fail, check our Cancelation Policy or contact us for more information'
          );
        }
      } else {
        const resp = await (
          await paymentService.cancelSubscription(performerId)
        ).data;
        if (resp && !resp.success) {
          return message.error(
            'Cancel subscription has failed, please check our Cancellation Policy or contact us for more information'
          );
        }
      }
      this.getData();
    } catch (e) {
      console.log(e);
      message.error('Error occurred, please try again later');
    }
  }

  render() {
    const { subscriptionList, pagination, loading } = this.state;
    return (
      <>
        <SEO />
        <Wrapper>
          <Inner>
            <Title>My subscriptions</Title>
            <TableWrapper>
              <TableListSubscription
                dataSource={subscriptionList}
                pagination={pagination}
                loading={loading}
                onChange={this.handleTabChange.bind(this)}
                rowKey="_id"
                cancelSubscription={this.cancelSubscription.bind(this)}
              />
            </TableWrapper>
          </Inner>
        </Wrapper>
      </>
    );
  }
}

const mapState = (state: any) => ({ user: state.user.current });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(SubscriptionPage);
