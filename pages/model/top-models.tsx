import { PureComponent } from 'react';
import { Layout, message, Row, Col } from 'antd';

import Head from 'next/head';
import { performerService } from '@services/performer.service';
import { getResponseError } from '@lib/utils';
import { IPerformer, IUIConfig } from 'src/interfaces';
import Loader from '@components/loader';
import PerformerCard from '@components/performer/card';
import { connect } from 'react-redux';
import '@components/performer/performer.less';

const { Content } = Layout;
interface TopPerformerPageIProps {
  ui: IUIConfig;
  user: any;
}
interface TopPerformerPageStates {
  limit: number;
  loading: boolean;
  topPerformers: IPerformer[];
}
class TopPerformerPage extends PureComponent<
  TopPerformerPageIProps,
  TopPerformerPageStates
> {
  static authenticate = false;

  constructor(props: TopPerformerPageIProps) {
    super(props);
    this.state = {
      loading: true,
      limit: 10,
      topPerformers: []
    };
  }

  componentDidMount() {
    this.getTopPerformer();
  }

  async getTopPerformer() {
    try {
      const { user } = this.props;
      const { limit } = this.state;
      const resp = await performerService.getTopPerformer({
        limit,
        userId: user._id ? user._id : ''
      });
      await this.setState({ topPerformers: resp.data.data });
    } catch (error) {
      message.error(getResponseError(error));
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, topPerformers } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | Top Creators </title>
          <meta
            property="og:title"
            content="honeydrip.com - Top Models"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Top Models"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Content>
          {loading ? (
            <Loader />
          ) : (
            <div className="main-container">
              <div className="page-heading">
                <span>Top 10 Creators</span>
              </div>
              <Row>
                {topPerformers &&
                  topPerformers.length > 0 &&
                  topPerformers.map((p) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={p._id}>
                      <PerformerCard performer={p} />
                    </Col>
                  ))}
                {!topPerformers && <p>No creators found!</p>}
              </Row>
            </div>
          )}
        </Content>
      </Layout>
    );
  }
}
const mapStates = (state: any) => ({
  ui: state.ui,
  user: state.user.current
});
export default connect(mapStates)(TopPerformerPage);
