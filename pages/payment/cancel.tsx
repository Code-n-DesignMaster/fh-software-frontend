import { Layout, Alert } from 'antd';
import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { IUser, IUIConfig } from '../../src/interfaces';
import _ from 'lodash';
import {
  getCountSystemNotRead,
  getCountTotalNotRead
} from '@redux/message/actions';
interface IProps {
  user: IUser;
  ui: IUIConfig;
  getCountSystemNotRead: Function;
  getCountTotalNotRead: Function;
}

const { Content } = Layout;

class PaymentCancel extends PureComponent<IProps> {
  static authenticate: boolean = true;
  static noredirect: boolean = true;

  componentDidMount() {
    const {
      getCountSystemNotRead: countSystemNotRead,
      getCountTotalNotRead: countTotalNotRead
    } = this.props;
    countTotalNotRead();
    countSystemNotRead();
    window.location.href =
      localStorage.getItem('history-page').indexOf('?') != -1
        ? localStorage.getItem('history-page') + '&payment=cancel'
        : localStorage.getItem('history-page') + '?payment=cancel';
  }

  render() {
    const { user, ui } = this.props;
    return (
      <Fragment>
        <Head>
          <title>HoneyDrip | Payment canceled</title>
          <meta
            property="og:title"
            content={`honeydrip.com - Payment canceled`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - Payment canceled`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Layout>
          <Content>
            <div className="main-container">
              <div className="page-heading">Payment Canceled</div>
              <Alert
                message="Payment canceled"
                description={
                  'Hi ' +
                  user.name +
                  ', your payment has been canceled! Please contact us for more information.'
                }
                type="error"
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

const mapDispatch = { getCountSystemNotRead, getCountTotalNotRead };
export default connect(mapStates, mapDispatch)(PaymentCancel);
