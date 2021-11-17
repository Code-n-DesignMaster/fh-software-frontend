import { PureComponent, Fragment } from 'react';
import Head from 'next/head';
import { Layout, message } from 'antd';
import { postService } from '@services/post.service';
import { connect } from 'react-redux';

const { Content } = Layout;
interface IProps {
  ui: any;
  id: string;
}
class PostDetail extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    // fetching: true,
    post: null
  };

  static async getInitialProps({ ctx }: any) {
    const { query } = ctx;
    return query;
  }

  async componentDidMount() {
    this.getPost();
  }

  async componentDidUpdate(prevProps: IProps) {
    const { id } = this.props;
    if (prevProps.id !== id) {
      this.getPost();
    }
  }

  async getPost() {
    try {
      const { id } = this.props;
      const resp = await postService.findById(id as string);
      this.setState({ post: resp.data });
    } catch (e) {
      message.error('Page not found!');
    } finally {
      // this.setState({ fetching: false });
    }
  }

  render() {
    const { post } = this.state;
    const { ui } = this.props;
    return (
      <>
        <Head>
          <title>HoneyDrip |{post && post.title}</title>
          <meta
            property="og:title"
            content={`honeydrip.com - ${post && post.title}`}
            key="title"
          />
          <meta
            property="og:description"
            content={`honeydrip.com - ${post && post.title}`}
          />
          <meta
            property="og:image"
            content={`https://honeydrip.com/logo.png`}
          />
        </Head>
        <Layout>
          <Content>
            <div className="main-container">
              <div className="page-container">
                <div className="page-heading">{post && post.title}</div>
                <div
                  className="page-content"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: post && post.content }}
                />
              </div>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}
const mapProps = (state: any) => ({
  ui: state.ui
});

export default connect(mapProps)(PostDetail);
