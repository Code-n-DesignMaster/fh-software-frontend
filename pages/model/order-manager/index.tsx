import { PureComponent } from 'react';
import Head from 'next/head';
import { message } from 'antd';
import Page from '@components/common/layout/page';
import { orderService } from '@services/index';
import { OrderSearchFilter } from '@components/order';
import OrderTableList from '@components/order/table-list';
import { connect } from 'react-redux';
import { IPerformer, IUIConfig } from 'src/interfaces';

interface IProps {
  performerId: string;
  user: IPerformer;
  ui: IUIConfig;
}

class ModelOrderPage extends PureComponent<IProps> {
  static authenticate = true;

  static onlyPerformer = true;

  static async getInitialProps({ ctx }) {
    return ctx.query;
  }

  state = {
    pagination: {} as any,
    searching: false,
    list: [] as any,
    limit: 10,
    filter: {} as any,
    sortBy: 'createdAt',
    sort: 'desc'
  };

  async componentDidMount() {
    this.search();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { pagination: paginationState } = this.state;
    const pager = { ...paginationState };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
      sortBy: sorter.field || 'createdAt',
      // eslint-disable-next-line no-nested-ternary
      sort: sorter.order
        ? sorter.order === 'descend'
          ? 'desc'
          : 'asc'
        : 'desc'
    });
    this.search(pager.current);
  };

  async handleFilter(filter) {
    await this.setState({ filter });
    this.search();
  }

  async search(page = 1) {
    try {
      const { filter, limit, sort, sortBy, pagination } = this.state;
      await this.setState({ searching: true });
      const resp = await orderService.search({
        ...filter,
        limit,
        offset: (page - 1) * limit,
        sort,
        sortBy
      });
      await this.setState({
        searching: false,
        list: resp.data.data,
        pagination: {
          ...pagination,
          total: resp.data.total,
          pageSize: limit
        }
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
      await this.setState({ searching: false });
    }
  }

  // async deleteOrder(id: string) {
  //   if (!confirm('Are you sure you want to delete this product?')) {
  //     return false;
  //   }
  //   try {
  //     await productService.delete(id);
  //     message.success('Deleted successfully');
  //     await this.search(this.state.pagination.current);
  //   } catch (e) {
  //     const err = (await Promise.resolve(e)) || {};
  //     message.error(err.message || 'An error occurred, please try again!');
  //   }
  // }

  render() {
    const { list, searching, pagination } = this.state;
    const { ui } = this.props;
    const statuses = [
      {
        key: '',
        text: 'All'
      },
      {
        key: 'processing',
        text: 'Processing'
      },
      {
        key: 'shipping',
        text: 'Shipping'
      },
      {
        key: 'delivered',
        text: 'Delivered'
      },
      {
        key: 'refunded',
        text: 'Refunded'
      }
    ];

    return (
      <>
        <Head>
          <title>HoneyDrip | My Orders</title>
          <meta
            property="og:title"
            content={`honeydrip.com - My Orders`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - My Orders`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Page>
          <div className="main-container">
            {/* <BreadcrumbComponent
              breadcrumbs={[
                { title: 'Order manager', href: '/model/order-manager' }
              ]} /> */}
            <div className="page-heading">
              <span>My orders </span>
            </div>
            <OrderSearchFilter
              statuses={statuses}
              onSubmit={this.handleFilter.bind(this)}
            />
            <div style={{ marginBottom: '20px' }} />
            <OrderTableList
              dataSource={list}
              rowKey="_id"
              loading={searching}
              pagination={pagination}
              onChange={this.handleTableChange.bind(this)}
              // deleteProduct={this.deleteProduct.bind(this)}
            />
          </div>
        </Page>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  ui: state.ui
});
export default connect(mapStates)(ModelOrderPage);
