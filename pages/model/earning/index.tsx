import { PureComponent } from 'react';
import { Layout, message, Row, Col, Statistic } from 'antd';
import Head from 'next/head';
import Loader from '@components/loader';
import Page from '@components/common/layout/page';
import { connect } from 'react-redux';
import { IPerformer, IEarning, IPerformerStats } from 'src/interfaces';
import { earningService } from 'src/services';
import { getResponseError } from '@lib/utils';
import { TableListEarning } from '@components/performer/table-earning';
import { SearchFilter } from 'src/components/common/search-filter';

const { Content } = Layout;

interface IProps {
  performer: IPerformer;
}
interface IStates {
  loading: boolean;
  earning: IEarning[];
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  };
  stats: IPerformerStats;
  sortBy: string;
  sort: string;
  sourceType: string;
  dateRange: any;
}

class EarningPage extends PureComponent<IProps, IStates> {
  static onlyPerformer = true;

  static authenticate = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      earning: [],
      pagination: { total: 0, current: 1, pageSize: 10 },
      stats: {},
      sortBy: 'createdAt',
      sort: 'desc',
      sourceType: '',
      dateRange: null
    };
  }

  componentDidMount() {
    this.getData();
    this.getPerformerStats();
  }

  async getData() {
    try {
      const { pagination, sort, sortBy, sourceType, dateRange } = this.state;
      const { current, pageSize } = pagination;
      const earning = await earningService.performerSearch({
        limit: pageSize,
        offset: (current - 1) * pageSize,
        sort,
        sortBy,
        sourceType,
        ...dateRange
      });
      await this.setState({
        earning: earning.data.data,
        pagination: { ...pagination, total: earning.data.total }
      });
    } catch (error) {
      message.error(getResponseError(error));
    } finally {
      this.setState({ loading: false });
    }
  }

  async getPerformerStats() {
    const { sourceType, dateRange } = this.state;
    const resp = await earningService.performerStarts({
      sourceType,
      ...dateRange
    });
    await this.setState({ stats: resp.data });
  }

  async handleFilter(data) {
    const { dateRange } = this.state;
    await this.setState({
      sourceType: data.type,
      dateRange: {
        ...dateRange,
        fromDate: data.fromDate,
        toDate: data.toDate
      }
    });
    this.getData();
    this.getPerformerStats();
  }

  async handleTabsChange(data) {
    const { pagination } = this.state;
    await this.setState({
      pagination: { ...pagination, current: data.current }
    });
    this.getData();
  }

  render() {
    const { loading, earning, pagination, stats } = this.state;
    return (
      <Layout>
        <Head>
          <title>HoneyDrip | Earning Report</title>
          <meta
            property="og:title"
            content="honeydrip.com - Earning Report"
            key="title"
          />
          <meta
            property="og:description"
            content="honeydrip.com - Earning Report"
          />
          <meta property="og:image" content="https://honeydrip.com/logo.png" />
        </Head>
        <Content>
          <div className="main-container">
            <div className="page-heading">Earning Report</div>
            <Page>
              <SearchFilter
                type={[
                  { key: '', text: 'All' },
                  { key: 'video', text: 'VOD' },
                  { key: 'product', text: 'Store' },
                  { key: 'performer', text: 'Subscription' },
                  { key: 'tip', text: 'Tip' }
                ]}
                onSubmit={this.handleFilter.bind(this)}
                dateRange
              />
              {loading ? (
                <Loader />
              ) : (
                <div>
                  {earning && earning.length > 0 ? (
                    <div>
                      <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8}>
                          <Statistic
                            title="Total Gross Price"
                            prefix="$"
                            value={stats.totalGrossPrice}
                            precision={2}
                          />
                        </Col>
                        <Col span={8}>
                          <Statistic
                            title="Admin earned"
                            prefix="$"
                            value={stats.totalCommission}
                            precision={2}
                          />
                        </Col>
                        <Col span={8}>
                          <Statistic
                            title="Performer earned"
                            prefix="$"
                            value={stats.totalNetPrice}
                            precision={2}
                          />
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <TableListEarning
                          dataSource={earning}
                          rowKey="_id"
                          pagination={pagination}
                          onChange={this.handleTabsChange.bind(this)}
                        />
                      </div>
                    </div>
                  ) : (
                    <span>No data found.</span>
                  )}
                </div>
              )}
            </Page>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStates = (state) => ({
  performer: { ...state.user.current }
});
export default connect(mapStates)(EarningPage);
