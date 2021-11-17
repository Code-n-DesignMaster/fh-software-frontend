import { PureComponent } from 'react';
import { Layout, message, Input, Select, Button } from 'antd';
import Head from 'next/head';
import { IOrder, IUIConfig } from 'src/interfaces';
import { BreadcrumbComponent } from '@components/common/breadcrumb';
import Page from '@components/common/layout/page';
import { orderService } from 'src/services';
import { connect } from 'react-redux';
import Router from 'next/router';
import { getResponseError } from '@lib/utils';

const { Content } = Layout;

interface IProps {
  id: string;
  ui: IUIConfig;
}

interface IStates {
  submitting: boolean;
  order: IOrder;
  loading: boolean;
  isUpdating: boolean;
  shippingCode: string;
  deliveryStatus: string;
}

class OrderDetailPage extends PureComponent<IProps, IStates> {
  static authenticate = true;

  static onlyPerformer = true;

  static async getInitialProps({ ctx }) {
    return ctx.query;
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      submitting: false,
      order: null,
      // eslint-disable-next-line react/no-unused-state
      loading: true,
      // eslint-disable-next-line react/no-unused-state
      isUpdating: true,
      shippingCode: '',
      deliveryStatus: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  async onUpdate() {
    const { deliveryStatus, shippingCode } = this.state;
    const { id } = this.props;
    if (!shippingCode) {
      return message.error('Missing shipping code');
    }
    try {
      // this.setState({ loading: true });
      await orderService.update(id, { deliveryStatus, shippingCode });
      message.success('Changes saved.');
    } catch (e) {
      message.error(getResponseError(e));
    } finally {
      // await this.setState({ loading: false });
      Router.push('/model/order-manager');
    }
    return undefined;
  }

  async getData() {
    try {
      const { id } = this.props;
      const order = await orderService.findById(id);
      await this.setState({
        order: order.data,
        shippingCode: order.data.shippingCode,
        deliveryStatus: order.data.deliveryStatus
      });
    } catch (e) {
      message.error('Can not find order!');
    } finally {
      // this.setState({ loading: false });
    }
  }

  render() {
    const { order } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | My Order </title>
          <meta
            property="og:title"
            content={`honeydrip.com - My Order`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - My Order`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Content>
          <div className="main-container">
            <BreadcrumbComponent
              breadcrumbs={[
                { title: 'My orders', href: '/model/order-manager' },
                {
                  title:
                    order && order.orderNumber
                      ? `#${order.orderNumber}`
                      : 'Order Detail'
                }
              ]}
            />
            <Page>
              {order && (
                <div className="main-container">
                  <div style={{ marginBottom: '10px' }}>
                    <b>#{order.orderNumber}</b>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    User:
                    {order.userInfo &&
                      `${order.userInfo.firstName} ${order.userInfo.lastName}`}{' '}
                    - @{order.userInfo.username}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    Quantity:
                    {order.quantity}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    Total Price: ${order.totalPrice}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    Delivery Address:
                    {order.deliveryAddress || 'N/A'}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    Delivery Postal Code:
                    {order.postalCode || 'N/A'}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    Shipping Code:
                    <Input
                      placeholder="Enter shipping code here"
                      defaultValue={order.shippingCode}
                      onChange={(e) =>
                        this.setState({ shippingCode: e.target.value })
                      }
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    Delivery Status:
                    <Select
                      onChange={(e) => this.setState({ deliveryStatus: e })}
                      defaultValue={order.deliveryStatus}
                    >
                      <Select.Option key="processing" value="processing">
                        Processing
                      </Select.Option>
                      <Select.Option key="shipping" value="shipping">
                        Shipping
                      </Select.Option>
                      <Select.Option key="delivered" value="delivered">
                        Delivered
                      </Select.Option>
                      <Select.Option key="refunded" value="refunded">
                        Refunded
                      </Select.Option>
                    </Select>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <Button danger onClick={this.onUpdate.bind(this)}>
                      Update
                    </Button>
                  </div>
                </div>
              )}
            </Page>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: state.ui
});

export default connect(mapStates)(OrderDetailPage);
