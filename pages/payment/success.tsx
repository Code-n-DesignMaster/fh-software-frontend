import { Layout, Alert } from 'antd';
import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { IUser, IUIConfig, IProduct } from '../../src/interfaces';
import { clearCart } from '@redux/cart/actions';
import _ from 'lodash';
import {
  getCountSystemNotRead,
  getCountTotalNotRead
} from '@redux/message/actions';
interface IProps {
  user: IUser;
  cart: any;
  clearCart: Function;
  ui: IUIConfig;
  getCountSystemNotRead: Function;
  getCountTotalNotRead: Function;
}

const { Content } = Layout;

class PaymentSuccess extends PureComponent<IProps> {
  static authenticate: boolean = true;
  static noredirect: boolean = true;

  componentDidMount() {
    let oldCart = localStorage.getItem(`cart_${this.props.user._id}`) as any;
    oldCart = oldCart && oldCart.length ? JSON.parse(oldCart) : [];
    let curPerformerId = localStorage.getItem(`product_of`) as any;
    const newCart = oldCart.filter(
      (item: IProduct) => item.performerId !== curPerformerId
    );
    localStorage.setItem(
      `cart_${this.props.user._id}`,
      JSON.stringify(_.uniqBy(newCart, '_id'))
    );
    this.props.clearCart();
    const {
      getCountSystemNotRead: countSystemNotRead,
      getCountTotalNotRead: countTotalNotRead
    } = this.props;
    countTotalNotRead();
    countSystemNotRead();
    window.location.href =
      localStorage.getItem('history-page').indexOf('?') != -1
        ? localStorage.getItem('history-page') + '&payment=success'
        : localStorage.getItem('history-page') + '?payment=success';
  }

  render() {
    const { ui, user } = this.props;
    return (
      <Fragment>
        <Head>
          <title>HoneyDrip | Payment success</title>
          <meta
            property="og:title"
            content={`honeydrip.com - Payment success`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - Payment success`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Layout>
          <Content>
            <div className="main-container">
              <div className="page-heading">Payment Success</div>
              <Alert
                message="Payment success"
                description={
                  'Hi ' +
                  user.name +
                  ', your payment has been successfully! Again, thank you for choosing us.'
                }
                type="success"
                showIcon
              />
            </div>
          </Content>
        </Layout>
      </Fragment>
    );
  }
}

const mapStates = (state: any) => ({
  user: state.user.current,
  ui: state.ui
});

const mapDispatch = { clearCart, getCountSystemNotRead, getCountTotalNotRead };
export default connect(mapStates, mapDispatch)(PaymentSuccess);
