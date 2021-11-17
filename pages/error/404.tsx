import { PureComponent } from 'react';
import { Layout, Alert } from 'antd';

import { connect } from 'react-redux';
import Head from 'next/head';

interface IProps {
  system: any;
}

const { Content } = Layout;

class Error404Page extends PureComponent<IProps> {
  static noredirect: boolean = true;

  render() {
    const { system } = this.props;
    const error = system.error || {
      statusCode: 404,
      message: 'Your requested link does not exist!'
    };
    return (
      <>
        <Head>
          <title>HoneyDrip | Error</title>
        </Head>
        <Layout>
          <Content>
            <div className="main-container">
              <Alert
                style={{ marginTop: '20px' }}
                message={`${error.statusCode} Error`}
                description={error.message}
                type="error"
                showIcon
              />
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  system: state.system
});

export default connect(mapStates)(Error404Page);
